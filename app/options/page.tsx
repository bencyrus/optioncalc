import { Suspense } from "react";

import OptionsColumn from "@/components/options-column";

interface OptionsPageSearchParams {
  ticker?: string;
  expiration?: string;
  contractType?: "call" | "put";
  predictedPrice1?: number;
  predictedPrice2?: number;
  predictedPrice3?: number;
}

interface OptionsPageProps {
  searchParams: Promise<OptionsPageSearchParams>;
}

export default async function OptionsPage({ searchParams }: OptionsPageProps) {
  const sp = await searchParams;
  const ticker = sp.ticker ?? "AFRM";
  const expiration = sp.expiration ?? "";
  const contractType = (sp.contractType as "call" | "put") ?? "call";
  const predictedPrice1 = sp.predictedPrice1 ?? 0;
  const predictedPrice2 = sp.predictedPrice2 ?? 0;
  const predictedPrice3 = sp.predictedPrice3 ?? 0;

  return (
    <div className="p-[16px]">
      <Suspense fallback={<div>Loading...</div>}>
        <OptionsColumn
          underlyingTicker={ticker}
          contractType={contractType}
          expirationDate={expiration}
          predictedPrice1={predictedPrice1}
          predictedPrice2={predictedPrice2}
          predictedPrice3={predictedPrice3}
        />
      </Suspense>
    </div>
  );
}
