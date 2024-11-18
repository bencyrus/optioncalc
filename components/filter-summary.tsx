interface FilterSummaryProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate: string;
  lastClose: number;
  predictedPrice1: number;
  predictedPrice2: number;
  predictedPrice3: number;
}

export default async function FilterSummary({
  underlyingTicker,
  contractType,
  expirationDate,
  lastClose,
  predictedPrice1,
  predictedPrice2,
  predictedPrice3,
}: FilterSummaryProps) {
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
      <PredictionScenario
        scenario={1}
        predictedPrice={predictedPrice1}
        lastClose={lastClose}
      />
      <PredictionScenario
        scenario={2}
        predictedPrice={predictedPrice2}
        lastClose={lastClose}
      />
      <PredictionScenario
        scenario={3}
        predictedPrice={predictedPrice3}
        lastClose={lastClose}
      />
    </div>
  );
}

interface PredictionScenarioProps {
  scenario: number;
  predictedPrice: number;
  lastClose: number;
}

function PredictionScenario({
  scenario,
  predictedPrice,
  lastClose,
}: PredictionScenarioProps) {
  const predictedGainsPercentage = (predictedPrice: number) => {
    return ((predictedPrice - lastClose) / lastClose) * 100;
  };

  return (
    <div className="flex flex-row justify-between">
      <span className="font-bold">Prediction Scenario {scenario}:</span>
      <div className="flex flex-row justify-between w-[160px]">
        <span>$ {predictedPrice}</span>
        <span>-</span>
        <span>{predictedGainsPercentage(predictedPrice).toFixed(2)}%</span>
      </div>
    </div>
  );
}
