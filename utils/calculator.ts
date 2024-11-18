interface ReturnPercentageProps {
  strikePrice: number;
  optionPrice: number;
  predictedStockPrice: number;
}

export function returnPercentage({
  strikePrice,
  optionPrice,
  predictedStockPrice,
}: ReturnPercentageProps): number {
  const optionValue = predictedStockPrice - strikePrice;
  const returnPercentage = (optionValue / optionPrice) * 100;
  if (returnPercentage < 0) {
    return 0;
  }
  return returnPercentage;
}
