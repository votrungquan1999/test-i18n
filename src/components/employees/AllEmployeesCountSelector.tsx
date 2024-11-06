"use client";

import { useTransition } from "react";
import { useTotalCount, useSetTotalCount } from "./EmployeeCountProvider";
import { SelectTrigger, SelectContent, SelectItem, SelectValue, Select } from "src/shadcn/components/ui/select";

export default function AllEmployeesCountSelector({ label }: { label: string }) {
  const totalCount = useTotalCount();
  const setTotalCount = useSetTotalCount();

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <label htmlFor="all-employee-selector" className="cursor-pointer">
        {label}
      </label>

      <Select
        name="total_count"
        value={totalCount.toString()}
        onValueChange={(count) => {
          startTransition(async () => {
            setTotalCount(Number.parseInt(count));
          });
        }}
        disabled={isPending}
      >
        <SelectTrigger className="w-48 px-2 py-1" id="all-employee-selector">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 20 }, (_, i) => i).map((count) => (
            <SelectItem key={count} value={count.toString()} className="w-48">
              {count}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
