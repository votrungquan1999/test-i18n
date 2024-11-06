import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/dist/server/request/cookies";
import path from "node:path";
import fs from "node:fs/promises";
import { syncLocalizations } from "src/server/syncLocalizations";
import TTLCache from "@isaacs/ttlcache";
import ms from "ms";

// revalidate time is the time after which the translation files should be downloaded and rewritten to file system and update the cache
// expired time is the time after which the cache should be invalidated and the next request will read from file system

// 1 hour
const REVALIDATE_TIME = ms("1 hour");
// 1 week
const EXPIRED_TIME = ms("1 week");

const ttlCache = new TTLCache<
  string,
  {
    messages: Record<string, string>;
    lastUpdated: number;
  }
>({
  ttl: EXPIRED_TIME,
});

export default getRequestConfig(async () => {
  const timeZone = "Asia/Ho_Chi_Minh";
  const cookiesStore = await cookies();
  const locale = cookiesStore.get("NEXT_LOCALE")?.value || "en";

  return {
    locale,
    messages: await getMessages(locale),
    timeZone,
    now: new Date(),
  };
});

async function getMessages(locale: string) {
  // Try to get messages from cache first
  const cached = ttlCache.get(locale);
  const now = Date.now();

  if (cached) {
    const timeSinceLastUpdate = now - cached.lastUpdated;

    // If past revalidate time, trigger background sync, and return the stale messages
    if (timeSinceLastUpdate > REVALIDATE_TIME) {
      console.log(
        `[i18n] Cache is past revalidate time (${Math.round(REVALIDATE_TIME / 1000)}s), triggering background sync for locale: ${locale}`,
      );
      syncFilesAndPrimeCache(locale);

      return cached.messages;
    }

    // If within stale time, return cached messages
    console.log(`[i18n] Using cached messages for locale: ${locale} (${Math.round(timeSinceLastUpdate / 1000)}s old)`);
    return cached.messages;
  }

  // If no cache, read from filesystem and cache the result
  console.log(`[i18n] No cache found, reading from filesystem for locale: ${locale}`);
  return readMessagesAndPrimeCache(locale);
}

async function readMessagesAndPrimeCache(locale: string) {
  const messages = await getMessagesFromFileSystem(locale);
  ttlCache.set(locale, {
    messages,
    lastUpdated: Date.now(),
  });

  return messages;
}

async function syncFilesAndPrimeCache(locale: string) {
  try {
    // this could have error, but it's ok, the staled translation files are still there
    // this process will be triggered again in the next request
    await syncLocalizations();
  } catch (error) {
    // should sync to sentry or something
    console.error(error);
  }

  return readMessagesAndPrimeCache(locale);
}

async function getMessagesFromFileSystem(locale: string) {
  const filePath = path.join(process.cwd(), `messages/${locale}.json`);
  const jsonData = await fs.readFile(filePath, "utf8");
  return JSON.parse(jsonData);
}
