import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function useCustomSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function updateSearchParam(name: string, value: string) {
    replace(pathname + "?" + createQueryString(name, value));
  }

  function getSearchParam(name: string) {
    return searchParams.get(name);
  }

  return { updateSearchParam, getSearchParam };
}
