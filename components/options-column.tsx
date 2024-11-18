import { fetchLastClose } from "@/data/stock";
import OptionFilters from "./option-filters";
import OptionsWrapper from "./options-wrapper";
import Predictions from "./predictions";

interface OptionsColumnProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate: string;
  predictedPrice: number;
}

export default async function OptionsColumn({
  underlyingTicker,
  contractType,
  expirationDate,
  predictedPrice,
}: OptionsColumnProps) {
  const { lastClose } = await fetchLastClose({ ticker: underlyingTicker });
  return (
    <div className="flex flex-col gap-[16px] max-w-[300px]">
      <OptionFilters />
      <Predictions stockPrice={lastClose || 0} />
      <FilterSummary
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
        lastClose={lastClose || 0}
        predictedPrice={predictedPrice}
      />
      <OptionColumnHeader />
      <OptionsWrapper
        underlyingTicker={underlyingTicker}
        contractType={contractType}
        expirationDate={expirationDate}
        predictedPrice={predictedPrice}
      />
    </div>
  );
}

interface FilterSummaryProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate: string;
  lastClose: number;
  predictedPrice: number;
}

async function FilterSummary({
  underlyingTicker,
  contractType,
  expirationDate,
  lastClose,
  predictedPrice,
}: FilterSummaryProps) {
  const predictedGainsPercentage = lastClose
    ? ((predictedPrice - lastClose) / lastClose) * 100
    : 0;
  return (
    <div className="flex flex-col gap-[5px] border border-gray-200 rounded-[5px] p-[10px]">
      <div className="flex flex-row justify-between">
        <span className="font-bold">Ticker:</span>
        <span>{underlyingTicker}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold">Type:</span>
        <span>{contractType}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold">Expiration Date:</span>
        <span>{expirationDate}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold">Last Close:</span>
        <span>{lastClose}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold">Predicted Price:</span>
        <span>{predictedPrice}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold">Predicted % Gain:</span>
        <span>{predictedGainsPercentage.toFixed(2)}%</span>
      </div>
    </div>
  );
}

function OptionColumnHeader() {
  return (
    <div className="flex flex-row justify-between border-b border-gray-200 pb-[5px]">
      <div className="font-bold">Strike</div>
      <div className="font-bold">Last Close</div>
      <div className="font-bold">% Return</div>
    </div>
  );
}
