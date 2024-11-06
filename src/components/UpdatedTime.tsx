import { getFormatter, getTranslations } from "next-intl/server";

interface UpdatedTimeProps {
  updatedAt: Date;
}

export default async function UpdatedTime({ updatedAt }: UpdatedTimeProps) {
  const t = await getTranslations("home.pp_example");
  const formatter = await getFormatter();

  const formattedTime = formatter.relativeTime(updatedAt);

  return (
    <div className="text-sm text-muted-foreground">
      {t("updated_time", {
        relative_time: formattedTime,
      })}
    </div>
  );
}
