"use client";

import { useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface SelectFilterSearchParamProps {
  paramName: string;
  options: string[];
}

export default function SelectFilterSearchParam({
  paramName,
  options,
}: SelectFilterSearchParamProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedOption = searchParams.get(paramName) || options[0];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <select
      value={selectedOption}
      onChange={(e) =>
        router.push(
          pathname + "?" + createQueryString(paramName, e.target.value)
        )
      }
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
