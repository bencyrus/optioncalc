import OptionsWrapper from "./components/options-wrapper";

export default async function HomePage() {
  return (
    <div>
      <OptionsWrapper
        underlyingTicker="AFRM"
        contractType="call"
        // expirationDate="2027-01-15"
      />
    </div>
  );
}
