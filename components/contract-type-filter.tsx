"use client";

import { useEffect } from "react";

import SelectFilterSearchParam from "./select-filter-search-param";
import useCustomSearchParams from "@/hooks/use-custom-search-params";

const contractTypes = ["call", "put"];

export default function ContractTypeFilter() {
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const selectedOption =
    getSearchParam("contractType") || ("" as "call" | "put");

  useEffect(() => {
    if (!selectedOption) {
      updateSearchParam("contractType", contractTypes[0]);
    }
  }, [selectedOption, updateSearchParam]);

  return (
    <SelectFilterSearchParam
      options={contractTypes}
      paramName="contractType"
      selectedOption={selectedOption}
    />
  );
}
