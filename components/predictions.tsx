"use client";

import useCustomSearchParams from "@/hooks/use-custom-search-params";
import { useEffect } from "react";

interface PredictionsProps {
  stockPrice: number;
}
export default function Predictions({ stockPrice }: PredictionsProps) {
  const { getSearchParam, setSearchParam } = useCustomSearchParams();
  const predictedPrice = getSearchParam("predictedPrice");

  useEffect(() => {
    if (!predictedPrice) {
      setSearchParam("predictedPrice", stockPrice.toString());
    }
  }, [predictedPrice, stockPrice]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const predictedPrice = formData.get("predictedPrice")?.toString() || "";
    setSearchParam("predictedPrice", predictedPrice);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <label htmlFor="predictedPrice" className="">
          Stock Price on Due Date
        </label>
        <div className="flex flex-row gap-2">
          <input
            type="number"
            step="0.01"
            name="predictedPrice"
            id="predictedPrice"
            defaultValue={predictedPrice || ""}
            className="bg-neutral-800 px-[10px] py-[5px] rounded-sm"
            placeholder="predicted price"
          />

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
