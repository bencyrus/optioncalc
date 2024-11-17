// function to take option in form AFRM270115C00035000 or anything like BA241122C00105000 and return the underlying ticker, price in cents and date in format yy-mm-dd
interface ParseOptionTickerResponse {
  underlyingTicker: string;
  priceInCents: number;
  date: string;
}

export function parseOptionTicker(ticker: string): ParseOptionTickerResponse {
  // Remove "O:" prefix if present
  const cleanTicker = ticker.replace(/^O:/, "");

  // underlying ticker is the first capital letters before the first number
  const underlyingTicker = cleanTicker.match(/^[A-Z]+/)?.[0] || "";
  // price in cents is the number after the "C" character / 10
  const priceInCents =
    parseInt(cleanTicker.slice(cleanTicker.indexOf("C") + 1)) / 10;
  // date is all the numbers after the first letters that are the underlying ticker before the "C" character
  const rawDate = cleanTicker.slice(
    underlyingTicker.length,
    cleanTicker.indexOf("C")
  );
  // Format date from YYMMDD to YYYY-MM-DD
  const year = `20${rawDate.slice(0, 2)}`;
  const month = rawDate.slice(2, 4);
  const day = rawDate.slice(4, 6);
  const date = `${year}-${month}-${day}`;

  return { underlyingTicker, priceInCents, date };
}
