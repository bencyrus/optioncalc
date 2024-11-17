import { parseOptionTicker } from "../utils/option";
import { OptionType } from "../types/option";

interface OptionItemProps {
  option: OptionType;
}

export default function OptionItem({ option }: OptionItemProps) {
  const { underlyingTicker, priceInCents, date } = parseOptionTicker(
    option.ticker
  );

  return (
    <div>
      {underlyingTicker}, {priceInCents}, {date}
    </div>
  );
}
