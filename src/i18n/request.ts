import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/dist/server/request/cookies";
import path from "node:path";
import fs from "node:fs/promises";

export default getRequestConfig(async () => {
  const timeZone = "Asia/Ho_Chi_Minh";

  // get the locale from the cookie
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
  const filePath = path.join(process.cwd(), `messages/${locale}.json`);

  const jsonData = await fs.readFile(filePath, "utf8");

  return JSON.parse(jsonData);
}
