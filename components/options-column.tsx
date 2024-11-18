import { fetchLastClose } from "@/data/stock";
import OptionFilters from "./option-filters";
import OptionsWrapper from "./options-wrapper";
import Predictions from "./predictions";
import FilterSummary from "./filter-summary";

interface OptionsColumnProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate: string;
  predictedPrice1: number;
  predictedPrice2: number;
  predictedPrice3: number;
}

export default async function OptionsColumn({
  underlyingTicker,
  contractType,
  expirationDate,
  predictedPrice1,
  predictedPrice2,
  predictedPrice3,
}: OptionsColumnProps) {
  const { lastClose } = await fetchLastClose({ ticker: underlyingTicker });
  return (
    <div className="flex flex-col gap-[16px] max-w-[600px]">
      <OptionFilters />
      <Predictions stockPrice={lastClose || 0} />
      <FilterSummary
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
        lastClose={lastClose || 0}
        predictedPrice1={predictedPrice1}
        predictedPrice2={predictedPrice2}
        predictedPrice3={predictedPrice3}
      />
      <OptionColumnHeader />
      <OptionsWrapper
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
        predictedPrice1={predictedPrice1}
        predictedPrice2={predictedPrice2}
        predictedPrice3={predictedPrice3}
      />
    </div>
  );
}

function OptionColumnHeader() {
  return (
    <div className="flex flex-row border-b border-gray-200 pb-[5px] justify-between">
      <div className="font-bold w-[80px]">Strike</div>
      <div className="font-bold w-[85px]">Last Close</div>
      <div className="flex flex-row gap-[10px]">
        <div className="font-bold w-[80px]">% #1</div>
        <div className="font-bold w-[80px]">% #2</div>
        <div className="font-bold w-[80px]">% #3</div>
      </div>
    </div>
  );
}
