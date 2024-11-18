"use client";

import useCustomSearchParams from "@/hooks/use-custom-search-params";
import { useEffect } from "react";

interface PredictionsProps {
  stockPrice: number;
}

export default function Predictions({ stockPrice }: PredictionsProps) {
  const { getSearchParam, setSearchParams } = useCustomSearchParams();
  const predictedPrice1 = getSearchParam("predictedPrice1");
  const predictedPrice2 = getSearchParam("predictedPrice2");
  const predictedPrice3 = getSearchParam("predictedPrice3");

  useEffect(() => {
    if (!predictedPrice1 || !predictedPrice2 || !predictedPrice3) {
      setSearchParams({
        predictedPrice1: predictedPrice1 || stockPrice.toString(),
        predictedPrice2: predictedPrice2 || stockPrice.toString(),
        predictedPrice3: predictedPrice3 || stockPrice.toString(),
      });
    }
  }, [
    predictedPrice1,
    predictedPrice2,
    predictedPrice3,
    stockPrice,
    setSearchParams,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const predictedPrice1 = formData.get("predictedPrice1")?.toString() || "";
    const predictedPrice2 = formData.get("predictedPrice2")?.toString() || "";
    const predictedPrice3 = formData.get("predictedPrice3")?.toString() || "";
    setSearchParams({
      predictedPrice1,
      predictedPrice2,
      predictedPrice3,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[8px]">
        <div>Stock Price on Due Date</div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="predictedPrice1" className="">
              Scenario 1
            </label>
            <input
              type="number"
              step="0.01"
              name="predictedPrice1"
              id="predictedPrice1"
              defaultValue={predictedPrice1 || ""}
              className="bg-neutral-800 px-[10px] py-[5px] rounded-sm"
              placeholder="predicted price 1"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="predictedPrice2" className="">
              Scenario 2
            </label>
            <input
              type="number"
              step="0.01"
              name="predictedPrice2"
              id="predictedPrice2"
              defaultValue={predictedPrice2 || ""}
              className="bg-neutral-800 px-[10px] py-[5px] rounded-sm"
              placeholder="predicted price 2"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="predictedPrice3" className="">
              Scenario 3
            </label>
            <input
              type="number"
              step="0.01"
              name="predictedPrice3"
              id="predictedPrice3"
              defaultValue={predictedPrice3 || ""}
              className="bg-neutral-800 px-[10px] py-[5px] rounded-sm"
              placeholder="predicted price 3"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-800 px-[10px] py-[5px] rounded-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
