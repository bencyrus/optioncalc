import { parseOptionTicker } from "../utils/option";
import { OptionType } from "@/types/option";
import { fetchLastClose } from "@/data/stock";
import { returnPercentage } from "@/utils/calculator";

interface OptionItemProps {
  option: OptionType;
  predictedPrice: number;
}

export default async function OptionItem({
  option,
  predictedPrice,
}: OptionItemProps) {
  const { strikePriceInCents } = parseOptionTicker(option.ticker);
  const { lastClose } = await fetchLastClose({ ticker: option.ticker });

  const profitPercentage = returnPercentage({
    strikePrice: option.strike_price,
    optionPrice: lastClose || 0 / 100,
    predictedStockPrice: predictedPrice,
  });

  return (
    <div className="flex flex-row justify-between border border-gray-200 py-[5px] px-[10px] rounded-[4px]">
      <StrikePrice priceInCents={strikePriceInCents} />
      <LastClose price={lastClose} />
      <ReturnPercentage returnPercentage={profitPercentage} />
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

interface ReturnPercentageProps {
  returnPercentage: number;
}

function ReturnPercentage({ returnPercentage }: ReturnPercentageProps) {
  return <div>{returnPercentage.toFixed(2)}%</div>;
}
