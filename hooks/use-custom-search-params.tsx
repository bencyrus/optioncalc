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

  function setSearchParam(name: string, value: string) {
    replace(pathname + "?" + createQueryString(name, value));
  }

  function setSearchParams(p: { [key: string]: string }) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(p).forEach(([key, value]) => {
      params.set(key, value);
    });
    replace(pathname + "?" + params.toString());
  }

  function getSearchParam(name: string) {
    return searchParams.get(name);
  }

  return { setSearchParam, setSearchParams, getSearchParam };
}
