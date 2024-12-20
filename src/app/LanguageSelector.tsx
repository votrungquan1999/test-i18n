"use client";

import { useTransition } from "react";
import { setLocaleAction } from "./actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/components/ui/select";

interface LanguageSelectorProps {
  name: string;
  currentLocale: string;
}

const localesNamesMap = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
};

const locales = ["en", "fr", "nl"] as const;

export default function LanguageSelector({ name, currentLocale }: LanguageSelectorProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      name={name}
      disabled={isPending}
      value={currentLocale}
      onValueChange={(newLocale) => {
        startTransition(async () => {
          await setLocaleAction(newLocale);
        });
      }}
    >
      <SelectTrigger className="w-48 px-2 py-1" id={name}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale} className="w-48">
            {localesNamesMap[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
