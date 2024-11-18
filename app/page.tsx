import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Options Price Calculator
        </h1>

        <p className="text-xl text-neutral-300 mb-8">
          Make informed trading decisions with a powerful options calculator.
          Predict potential returns based on different stock price scenarios and
          expiration dates.
        </p>

        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Price Scenarios
              </h3>
              <p className="text-neutral-400">
                Test multiple stock price predictions
              </p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Time Analysis
              </h3>
              <p className="text-neutral-400">
                Compare different expiration dates
              </p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Profit Calculator
              </h3>
              <p className="text-neutral-400">
                Calculate potential returns instantly
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/options"
          className="inline-block bg-neutral-100 text-neutral-900 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-300 transition-colors text-lg"
        >
          Try Calculator Now
        </Link>
      </div>
    </main>
  );
}
