"use client";

import { useTranslations } from "next-intl";
import { useScannedCount, useTotalCount } from "./EmployeeCountProvider";

function getNumberDisplayClass(color: "blue" | "emerald") {
  const baseClass = "rounded-md px-1 py-px text-white";

  switch (color) {
    case "blue":
      return `${baseClass} bg-blue-500`;
    case "emerald":
      return `${baseClass} bg-emerald-500`;
  }
}

export default function EmployeeCountDisplay() {
  const scannedEmployees = useScannedCount();
  const allEmployees = useTotalCount();

  const t = useTranslations("home.pp_example");

  return (
    <p className="text-lg text-slate-800">
      {t.rich("employee_count_display", {
        scanned_count_tag: () => <span className={getNumberDisplayClass("emerald")}>{scannedEmployees}</span>,
        all_count_tag: () => <span className={getNumberDisplayClass("blue")}>{allEmployees}</span>,
        scanned_count: scannedEmployees,
      })}
    </p>
  );
}
