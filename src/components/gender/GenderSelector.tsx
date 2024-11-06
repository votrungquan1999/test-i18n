"use client";

import { useTransition } from "react";
import { useSetGender } from "./GenderProvider";
import { useGender } from "./GenderProvider";
import { SelectTrigger, SelectContent, SelectItem, SelectValue, Select } from "src/shadcn/components/ui/select";

export default function GenderSelector({ label }: { label: string }) {
  const gender = useGender();
  const setGender = useSetGender();

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <label htmlFor="gender-selector" className="cursor-pointer">
        {label}
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
