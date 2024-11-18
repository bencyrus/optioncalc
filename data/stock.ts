interface FetchLastCloseProps {
  ticker: string;
}

interface FetchLastCloseResponse {
  lastClose?: number;
  error?: string;
}

export async function fetchLastClose({
  ticker,
}: FetchLastCloseProps): Promise<FetchLastCloseResponse> {
  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
    );
    const data = await response.json();
    console.log("fetchLastClose data", data);
    return { lastClose: data.results?.[0]?.c };
  } catch (error) {
    console.error("Error fetching last close:", error);
    return { error: "Error fetching last close" };
  }
}
