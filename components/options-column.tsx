import OptionFilters from "./option-filters";
import OptionsWrapper from "./options-wrapper";

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
      <OptionFilters />
      <OptionsWrapper
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
      />
    </div>
  );
}
