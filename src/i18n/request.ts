import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/dist/server/request/cookies";

export default getRequestConfig(async () => {
  const timeZone = "Asia/Ho_Chi_Minh";

  // get the locale from the cookie
  const cookiesStore = await cookies();
  const locale = cookiesStore.get("NEXT_LOCALE")?.value || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone,
    now: new Date(),
  };
});
