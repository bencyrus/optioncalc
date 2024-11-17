import { Suspense } from "react";
import OptionsColumn from "./components/options-columns";

interface HomePageSearchParams {
  ticker?: string;
  expiration?: string;
  contractType?: "call" | "put";
}

interface HomePageProps {
  searchParams: Promise<HomePageSearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const ticker = resolvedSearchParams.ticker ?? "AFRM";
  const expiration = resolvedSearchParams.expiration ?? "";
  const contractType =
    (resolvedSearchParams.contractType as "call" | "put") ?? "call";

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OptionsColumn
          underlyingTicker={ticker}
          contractType={contractType}
          expirationDate={expiration}
        />
      </Suspense>
    </div>
  );
}
