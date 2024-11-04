"use client";

import { useTranslations } from "next-intl";
import { useGender } from "src/components/gender/GenderProvider";

export default function Instruction() {
  const t = useTranslations("home.instruction");

  const gender = useGender();

  return <div>{t("message", { gender })}</div>;
}
