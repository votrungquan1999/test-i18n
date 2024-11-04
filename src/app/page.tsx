import Counter from "./Counter";
import LanguageSelector from "./LanguageSelector";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();

  return (
    <div>
      <h1>Hello World</h1>

      <LanguageSelector name="language" currentLocale={locale} key={locale} />

      <Counter />

      <hr className="border-slate-200" />

      <GenderProvider>
        <GenderSelector />

        <Instruction />
      </GenderProvider>
    </div>
  );
}
