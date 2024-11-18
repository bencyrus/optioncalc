// function to take option in form AFRM270115C00035000 or anything like BA241122C00105000 and return the underlying ticker, price in cents and date in format yy-mm-dd
interface ParseOptionTickerResponse {
  underlyingTicker: string;
  strikePriceInCents: number;
  date: string;
}

export function parseOptionTicker(ticker: string): ParseOptionTickerResponse {
  // Remove "O:" prefix if present
  const cleanTicker = ticker.replace(/^O:/, "");

  // underlying ticker is the first capital letters before the first number
  const underlyingTicker = cleanTicker.match(/^[A-Z]+/)?.[0] || "";

  // price is the number after the "C" or "P" character
  const priceMatch = cleanTicker.match(/[CP](\d+)/);
  const strikePriceInCents = priceMatch ? parseInt(priceMatch[1], 10) / 10 : 0;

  // date is all the numbers after the first letters that are the underlying ticker before the "C" character
  const dateMatch = cleanTicker.match(
    new RegExp(`${underlyingTicker}(\\d{6})[CP]`)
  );
  const rawDate = dateMatch?.[1] || "";

  if (!rawDate) {
    throw new Error(
      `Invalid ticker format. Could not extract date from ${ticker}`
    );
  }

  // Format date from YYMMDD to YYYY-MM-DD
  const year = `20${rawDate.slice(0, 2)}`;
  const month = rawDate.slice(2, 4);
  const day = rawDate.slice(4, 6);
  const date = `${year}-${month}-${day}`;

  return { underlyingTicker, strikePriceInCents, date };
}
