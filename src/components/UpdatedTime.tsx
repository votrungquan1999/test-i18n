"use client";

import { useFormatter, useTranslations } from "next-intl";

interface UpdatedTimeProps {
  updatedAt: Date;
}

export default function UpdatedTime({ updatedAt }: UpdatedTimeProps) {
  const t = useTranslations("home.pp_example");
  const formatter = useFormatter();

  const formattedTime = formatter.relativeTime(updatedAt);

  return (
    <div className="text-sm text-muted-foreground">
      {t("updated_time", {
        relative_time: formattedTime,
      })}
    </div>
  );
}
