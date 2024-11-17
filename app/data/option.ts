import { OptionType } from "../types/option";

interface FetchTickerOptionsProps {
  underlyingTicker: string;
  contractType: "call" | "put";
  expirationDate?: string;
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
