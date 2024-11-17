import TickerFilter from "./ticker-filter";
import ContractTypeFilter from "./contract-type-filter";
import ExpirationFilter from "./expiration-filter";

export default async function OptionFilters() {
  return (
    <div className="flex gap-[10px]">
      <TickerFilter />
      <ExpirationFilter />
      <ContractTypeFilter />
    </div>
  );
}
