import GenderProvider from "src/components/gender/GenderProvider";
import Instruction from "./Intrucstion";
import Counter from "./Counter";
import LanguageSelector from "./LanguageSelector";
import { getLocale, getTranslations } from "next-intl/server";
import GenderSelector from "src/components/gender/GenderSelector";
import { Loader2, ArrowUpRight } from "lucide-react";
import UpdatedTime from "src/components/UpdatedTime";
import Image from "next/image";
import Link from "next/link";
import ScannedEmployeeCountSelector from "src/components/employees/ScannedEmployeeCountSelector";
import AllEmployeesCountSelector from "src/components/employees/AllEmployeesCountSelector";
import EmployeeCountProvider from "src/components/employees/EmployeeCountProvider";
import EmployeeCountDisplay from "src/components/employees/EmployeeCountDisplay";

export default async function Home() {
  const locale = await getLocale();

  const t = await getTranslations("home");

  const newYear2024 = new Date("2024-01-01");

  return (
    <div className="flex flex-col gap-2 w-fit">
      <LanguageSelector name="language" currentLocale={locale} key={locale} />

      <hr className="border-slate-200" />

      <Counter />

      <hr className="border-slate-200" />

      <GenderProvider>
        <GenderSelector />

        <Instruction />
      </GenderProvider>

      <hr className="border-slate-200" />

      <div className="flex flex-col gap-2">
        <h1>{t("pp_example.title")}</h1>

        <div>
          {t.rich("pp_example.loading", {
            loading_text: (chunks) => (
              <div className="flex animate-pulse flex-row gap-2 p-2 items-center">
                <div className="whitespace-nowrap font-semibold">
                  <div className="text-slate-600">{chunks}</div>
                </div>

                <Loader2 className="size-4 animate-spin text-slate-600" />
              </div>
            ),
          })}
        </div>

        <hr className="border-slate-200" />

        <UpdatedTime updatedAt={newYear2024} />

        <hr className="border-slate-200" />

        <Image
          src="/pp_example.png"
          alt="Partners Portal Example"
          width={800}
          height={600}
          className="rounded-lg border border-slate-200"
          priority
        />

        <hr className="border-slate-200" />

        <p className="text-slate-600">
          {t.rich("pp_example.guide_to_checkout", {
            link: (chunks) => (
              <Link
                href={"/"}
                className="inline-flex flex-row items-center gap-1 italic text-blue-500 underline"
                target="_blank"
              >
                {chunks}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ),
          })}
        </p>

        <hr className="border-slate-200" />

        <EmployeeCountProvider>
          <ScannedEmployeeCountSelector />

          <AllEmployeesCountSelector />

          <EmployeeCountDisplay />
        </EmployeeCountProvider>

        {/* This div is used to let user scroll to the bottom of the page, like in vscode*/}
        <div className="h-screen" />
      </div>
    </div>
  );
}
