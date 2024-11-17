export type OptionType = {
  cfi: string;
  contract_type: "call" | "put";
  exercise_style: "american";
  expiration_date: string;
  primary_exchange: string;
  shares_per_contract: number;
  strike_price: number;
  ticker: string;
  underlying_ticker: string;
};
