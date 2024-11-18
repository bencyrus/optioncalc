"use client";

import { useEffect } from "react";

import useCustomSearchParams from "@/hooks/use-custom-search-params";
import SelectFilterSearchParam from "./select-filter-search-param";

const tickers = ["AFRM", "AAPL", "PLUG"];

export default function TickerFilter() {
  const { getSearchParam, setSearchParam: updateSearchParam } =
    useCustomSearchParams();
  const selectedOption = getSearchParam("ticker") || "";

  useEffect(() => {
    if (!selectedOption) {
      updateSearchParam("ticker", tickers[0]);
    }
  }, [selectedOption, updateSearchParam]);

  return (
    <SelectFilterSearchParam
      options={tickers}
      paramName="ticker"
      selectedOption={selectedOption}
    />
  );
}
