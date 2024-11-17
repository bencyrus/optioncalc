"use client";

import { useEffect, useState } from "react";
import useCustomSearchParams from "@/hooks/use-custom-search-params";
import { fetchOptionExpirations } from "../data/option";
import SelectFilterSearchParam from "./select-filter-search-param";

export default function ExpirationFilter() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expirations, setExpirations] = useState<string[]>([]);
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();

  const selectedTicker = getSearchParam("ticker") || "";
  const selectedContractType = getSearchParam("contractType") as "call" | "put";

  useEffect(() => {
    if (!selectedTicker || !selectedContractType) return;

    async function fetchExpirations() {
      setIsLoading(true);
      const { expirations } = await fetchOptionExpirations({
        ticker: selectedTicker,
        contractType: selectedContractType,
      });

      setExpirations(expirations ?? []);
      setIsLoading(false);
    }

    fetchExpirations();
  }, [selectedTicker, selectedContractType]);

  const selectedExpiration = getSearchParam("expiration") || "";

  // Ensure search param is updated in an effect
  useEffect(() => {
    if (!selectedExpiration && expirations.length > 0) {
      updateSearchParam("expiration", expirations[0]);
    }
  }, [selectedExpiration, expirations, updateSearchParam]);

  if (!selectedTicker || !selectedContractType) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SelectFilterSearchParam
          options={expirations ?? []}
          paramName="expiration"
          selectedOption={selectedExpiration}
        />
      )}
    </div>
  );
}
