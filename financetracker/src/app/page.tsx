import TransactionsSection from "@/components/TableTransactions";
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/models/transactionModel";

export default function Home() {
  return (
    <section className="bg-white w-full">

      {/* header */}
      <div className="px-2">
        <h2 className="text-2xl px-8 pt-9 font-medium">Dashboard</h2>


        <div className="mt-4 h-[1px] border border-gray-300 rounded-lg ">
          {/* Your bordered content goes here */}
        </div>
      </div>



      {/* card Transactions  */}

      <div className="flex md:flex-row flex-col">
        <TransactionCard />

      </div>


      {/* All Transactions */}
      <TransactionsSection />

    </section>
  )
}