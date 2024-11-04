"use client";

import { useTransition } from "react";
import { useSetGender } from "./GenderProvider";
import { useGender } from "./GenderProvider";
import { SelectTrigger, SelectContent, SelectItem, SelectValue, Select } from "src/shadcn/components/ui/select";
import { useTranslations } from "next-intl";

export default function GenderSelector() {
  const gender = useGender();
  const setGender = useSetGender();

  const [isPending, startTransition] = useTransition();

  const t = useTranslations("home.gender_selector");

  return (
    <div>
      <label htmlFor="gender-selector" className="cursor-pointer">
        {t("label")}
      </label>

      <Select
        name="gender"
        value={gender}
        onValueChange={(newGender) => {
          startTransition(async () => {
            setGender(newGender as "Male" | "Female" | "Other");
          });
        }}
        disabled={isPending}
      >
        <SelectTrigger className="w-48 px-2 py-1" id="gender-selector">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["Male", "Female", "Other"].map((gender) => (
            <SelectItem key={gender} value={gender} className="w-48">
              {gender}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
