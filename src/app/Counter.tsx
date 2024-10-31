"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Counter() {
  const t = useTranslations("home.count");
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-2 items-start">
      <p>{t("message", { count })}</p>

      <button
        type="button"
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 border border-slate-200 hover:bg-blue-600 focus:bg-blue-600 text-white p-2 rounded-md"
      >
        Increment
      </button>
    </div>
  );
}
