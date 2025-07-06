import TransactionCard from "@/components/TransactionCard";

export default function Home() {
  return (
    <section className="bg-white w-full">

      {/* header */}
      <div>
        <h2 className="text-2xl px-8 pt-9 font-medium">Dashboard</h2>


        <div className="mt-4 h-[1px] border border-gray-300 rounded-lg ">
          {/* Your bordered content goes here */}
        </div>
      </div>

      {/* transactions */}
      <div className="bg-gray-100 mt-5 p-5 rounded-2xl md:mx-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Transactions
        </h2>
        <h4 className="text-gray-600 text-sm">Track your purchase and payment information</h4>
      </div>

      {/* card Transactions  */}

      <div className="flex md:flex-row flex-col">
        <TransactionCard />

      </div>

    </section>
  )
}