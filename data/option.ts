import { OptionType } from "../types/option";
import { fetchLastClose } from "./stock";

interface FetchTickerOptionsProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate?: string;
  strikePrice?: number;
  limit?: number;
}

interface FetchTickerOptionsResponse {
  options?: OptionType[];
  error?: string;
}

export async function fetchTickerOptions({
  underlyingTicker,
  contractType,
  expirationDate,
  strikePrice,
  limit = 1000,
}: FetchTickerOptionsProps): Promise<FetchTickerOptionsResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set(
      "apiKey",
      process.env.NEXT_PUBLIC_POLYGON_API_KEY as string
    );
    searchParams.set("underlying_ticker", underlyingTicker);
    searchParams.set("contract_type", contractType);
    if (expirationDate) {
      searchParams.set("expiration_date", expirationDate);
    }
    if (strikePrice) {
      searchParams.set("strike_price", strikePrice.toString());
    }
    searchParams.set("limit", limit.toString());

    const response = await fetch(
      `https://api.polygon.io/v3/reference/options/contracts?${searchParams.toString()}`
    );

    const data = await response.json();
    return { options: data.results };
  } catch (error) {
    console.error("Error fetching option data:", error);
    return { error: "Error fetching option data" };
  }
}

interface FetchOptionExpirationsProps {
  ticker: string;
  contractType: "call" | "put";
}

interface FetchOptionExpirationsResponse {
  expirations?: string[];
  error?: string;
}

export async function fetchOptionExpirations({
  ticker,
  contractType,
}: FetchOptionExpirationsProps): Promise<FetchOptionExpirationsResponse> {
  try {
    // Get last close
    const { lastClose, error: lastCloseError } = await fetchLastClose({
      ticker,
    });
    if (lastCloseError || !lastClose) {
      return { error: lastCloseError };
    }
    // Use different rounding based on stock price
    let roundedLastClose;
    if (lastClose < 5) {
      // For penny stocks, round to nearest 0.5
      roundedLastClose = Math.round(lastClose * 2) / 2;
    } else if (lastClose < 25) {
      // For low-price stocks, round to nearest 1
      roundedLastClose = Math.round(lastClose);
    } else {
      // For higher-price stocks, round to nearest 5
      roundedLastClose = Math.round(lastClose / 5) * 5;
    }
    // Get all options for that strike price
    const { options, error: optionsError } = await fetchTickerOptions({
      underlyingTicker: ticker,
      contractType,
      strikePrice: roundedLastClose,
    });
    return { expirations: options?.map((option) => option.expiration_date) };
  } catch (error) {
    console.error("Error fetching option expirations:", error);
    return { error: "Error fetching option expirations" };
  }
}
