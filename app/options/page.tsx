import { Suspense } from "react";

import OptionsColumn from "@/components/options-column";

interface OptionsPageSearchParams {
  ticker?: string;
  expiration?: string;
  contractType?: "call" | "put";
  predictedPrice?: number;
}

interface OptionsPageProps {
  searchParams: Promise<OptionsPageSearchParams>;
}

export default async function OptionsPage({ searchParams }: OptionsPageProps) {
  const sp = await searchParams;
  const ticker = sp.ticker ?? "AFRM";
  const expiration = sp.expiration ?? "";
  const contractType = (sp.contractType as "call" | "put") ?? "call";
  const predictedPrice = sp.predictedPrice ?? 0;
  return (
    <div className="p-[16px]">
      <Suspense fallback={<div>Loading...</div>}>
        <OptionsColumn
          underlyingTicker={ticker}
          contractType={contractType}
          expirationDate={expiration}
          predictedPrice={predictedPrice}
        />
      </Suspense>
    </div>
  );
}
