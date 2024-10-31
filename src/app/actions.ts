"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLocaleAction(newLocale: string) {
  const cookiesStore = await cookies();

  cookiesStore.set("NEXT_LOCALE", newLocale);
  revalidatePath("/");
}
