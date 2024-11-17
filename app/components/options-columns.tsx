import { fetchOptionExpirations } from "../data/option";
import OptionsWrapper from "./options-wrapper";
import SelectFilterSearchParam from "./select-filter-search-param";

interface OptionsColumnProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate: string;
}

export default function OptionsColumn({
  underlyingTicker,
  contractType,
  expirationDate,
}: OptionsColumnProps) {
  return (
    <div>
      <OptionFilters selectedTicker="AFRM" selectedContractType="call" />
      <OptionsWrapper
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
      />
    </div>
  );
}

interface OptionFiltersProps {
  selectedTicker: string;
  selectedContractType: "call" | "put";
}

async function OptionFilters({
  selectedTicker,
  selectedContractType,
}: OptionFiltersProps) {
  const tickers = ["AFRM", "AAPL", "PLUG"];
  const { expirations } = await fetchOptionExpirations({
    ticker: selectedTicker,
    contractType: selectedContractType,
  });

  return (
    <div className="flex gap-2">
      <SelectFilterSearchParam options={tickers} paramName="ticker" />
      <SelectFilterSearchParam
        options={expirations ?? []}
        paramName="expiration"
      />
      <SelectFilterSearchParam
        options={["call", "put"]}
        paramName="contractType"
      />
    </div>
  );
}
