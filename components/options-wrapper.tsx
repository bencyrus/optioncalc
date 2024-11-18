import { fetchTickerOptions } from "../data/option";
import OptionItem from "./option-item";

interface OptionsWrapperProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate?: string;
  predictedPrice?: number;
}

export default async function OptionsWrapper({
  underlyingTicker,
  contractType,
  expirationDate,
  predictedPrice,
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
          predictedPrice={predictedPrice || 0}
        />
      ))}
    </div>
  );
}
