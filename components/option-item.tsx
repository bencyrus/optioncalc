import { parseOptionTicker } from "../utils/option";
import { OptionType } from "@/types/option";
import { fetchLastClose } from "@/data/stock";
import { returnPercentage } from "@/utils/calculator";

interface OptionItemProps {
  option: OptionType;
  predictedPrice1: number;
  predictedPrice2: number;
  predictedPrice3: number;
}

export default async function OptionItem({
  option,
  predictedPrice1,
  predictedPrice2,
  predictedPrice3,
}: OptionItemProps) {
  const { strikePriceInCents } = parseOptionTicker(option.ticker);
  const { lastClose } = await fetchLastClose({ ticker: option.ticker });

  const profitPercentage = (predictedPrice: number) => {
    return returnPercentage({
      strikePrice: option.strike_price,
      optionPrice: lastClose || 0 / 100,
      predictedStockPrice: predictedPrice,
    });
  };

  return (
    <div className="flex flex-row border border-gray-200 py-[5px] px-[10px] rounded-[4px] justify-between">
      <StrikePrice priceInCents={strikePriceInCents} />
      <LastClose price={lastClose} />
      <div className="flex flex-row gap-[10px]">
        <ReturnPercentage
          returnPercentage={profitPercentage(predictedPrice1)}
        />
        <ReturnPercentage
          returnPercentage={profitPercentage(predictedPrice2)}
        />
        <ReturnPercentage
          returnPercentage={profitPercentage(predictedPrice3)}
        />
      </div>
    </div>
  );
}

interface StrikePriceProps {
  priceInCents: number;
}

function StrikePrice({ priceInCents }: StrikePriceProps) {
  // Format priceInCents to 2 decimal places
  const formattedPrice = (priceInCents / 100).toFixed(2);
  return <div className="w-[80px]">{formattedPrice}</div>;
}

interface LastCloseProps {
  price: number | undefined;
}

function LastClose({ price }: LastCloseProps) {
  return <div className="w-[85px]">{price}</div>;
}

interface ReturnPercentageProps {
  returnPercentage: number;
}

function ReturnPercentage({ returnPercentage }: ReturnPercentageProps) {
  return <div className="w-[80px]">{returnPercentage.toFixed(2)}%</div>;
}
