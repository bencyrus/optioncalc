import { Suspense } from "react";

import OptionsColumn from "@/components/options-column";

interface OptionsPageSearchParams {
  ticker?: string;
  expiration?: string;
  contractType?: "call" | "put";
}

interface OptionsPageProps {
  searchParams: Promise<OptionsPageSearchParams>;
}

export default async function OptionsPage({ searchParams }: OptionsPageProps) {
  const sp = await searchParams;
  const ticker = sp.ticker ?? "AFRM";
  const expiration = sp.expiration ?? "";
  const contractType = (sp.contractType as "call" | "put") ?? "call";

  return (
    <div className="p-[16px]">
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
