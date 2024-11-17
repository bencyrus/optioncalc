import { fetchTickerOptions } from "../data/option";
import OptionItem from "./option-item";

interface OptionsWrapperProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate?: string;
}

export default async function OptionsWrapper({
  underlyingTicker,
  contractType,
  expirationDate,
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
    <div>
      {options?.map((option) => (
        <OptionItem key={option.ticker} option={option} />
      ))}
    </div>
  );
}
