"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useCustomSearchParams from "@/hooks/use-custom-search-params";

interface SelectFilterSearchParamProps {
  paramName: string;
  options: string[];
  selectedOption?: string;
}

export default function SelectFilterSearchParam({
  paramName,
  options,
  selectedOption,
}: SelectFilterSearchParamProps) {
  const { updateSearchParam } = useCustomSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateSearchParam(paramName, e.target.value);
  }
  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className="bg-neutral-800 px-[10px] py-[5px]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
