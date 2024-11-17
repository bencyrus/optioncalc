import { parseOptionTicker } from "../utils/option";
import { OptionType } from "../types/option";
import { fetchLastClose } from "@/data/stock";

interface OptionItemProps {
  option: OptionType;
}

export default async function OptionItem({ option }: OptionItemProps) {
  const { priceInCents } = parseOptionTicker(option.ticker);

  const { lastClose } = await fetchLastClose({ ticker: option.ticker });

  return (
    <div className="flex flex-row justify-between border border-gray-200 py-[5px] px-[10px] rounded-[4px]">
      <StrikePrice priceInCents={priceInCents} />
      <LastClose price={lastClose} />
    </div>
  );
}

interface StrikePriceProps {
  priceInCents: number;
}

function StrikePrice({ priceInCents }: StrikePriceProps) {
  // Format priceInCents to 2 decimal places
  const formattedPrice = (priceInCents / 100).toFixed(2);
  return <div>{formattedPrice}</div>;
}

interface LastCloseProps {
  price: number | undefined;
}

function LastClose({ price }: LastCloseProps) {
  return <div>{price}</div>;
}
