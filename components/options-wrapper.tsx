import { fetchTickerOptions } from "../data/option";
import OptionItem from "./option-item";

interface OptionsWrapperProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate?: string;
  predictedPrice1?: number;
  predictedPrice2?: number;
  predictedPrice3?: number;
}

export default async function OptionsWrapper({
  underlyingTicker,
  contractType,
  expirationDate,
  predictedPrice1,
  predictedPrice2,
  predictedPrice3,
}: OptionsWrapperProps) {
  const { options, error } = await fetchTickerOptions({
    underlyingTicker,
    contractType,
    expirationDate,
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      {options?.map((option) => (
        <OptionItem
          key={option.ticker}
          option={option}
          predictedPrice1={predictedPrice1 || 0}
          predictedPrice2={predictedPrice2 || 0}
          predictedPrice3={predictedPrice3 || 0}
        />
      ))}
    </div>
  );
}
