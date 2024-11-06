"use client";

import { useTransition } from "react";
import { useScannedCount, useSetScannedCount } from "./EmployeeCountProvider";
import { SelectTrigger, SelectContent, SelectItem, SelectValue, Select } from "src/shadcn/components/ui/select";

export default function ScannedEmployeeCountSelector({ label }: { label: string }) {
  const scannedCount = useScannedCount();
  const setScannedCount = useSetScannedCount();

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <label htmlFor="employee-selector" className="cursor-pointer">
        {label}
      </label>

      <Select
        name="scanned_count"
        value={scannedCount.toString()}
        onValueChange={(scannedCount) => {
          startTransition(async () => {
            setScannedCount(Number.parseInt(scannedCount));
          });
        }}
        disabled={isPending}
      >
        <SelectTrigger className="w-48 px-2 py-1" id="employee-selector">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => i).map((count) => (
            <SelectItem key={count} value={count.toString()} className="w-48">
              {count}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
