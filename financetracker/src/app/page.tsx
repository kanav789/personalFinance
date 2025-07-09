"use client";
import TransactionsSection from "@/components/TableTransactions";
import TransactionCard from "@/components/TransactionCard";
import { useEffect, useState } from "react";
type Transaction = {
  _id: string;
  transactionDate: string;
  transactionDescription: string;
  traAmount: number;
  __v?: number;
};
import axios from "axios"
import { ClipLoader } from "react-spinners";
import { AddTransaction } from "@/components/addTransaction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setData } from "@/redux/feature/dateSlice";
import { useSelector } from "react-redux";
import BudgetCard from "@/components/BudgetCard";
export default function Home() {
  const dispatch = useAppDispatch()

  const [loader, setLoader] = useState(false)
  const data = useSelector((state: any) => state?.data?.items || []);

  useEffect(() => {
    fetchTransactions()
  }, [])
  async function fetchTransactions() {

    try {
      setLoader(true)

      const data = await axios.get('/api/all')

      if (data?.data?.data?.length > 0) {
      dispatch(setData(data?.data?.data))
      }

      setLoader(false)

    } catch (error) {
      console.log("Error fetching transactions:", error);
      setLoader(false)
    }
  }


  return (
    <section className="bg-white w-full">

      {/* header */}
      <div className="px-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl px-8 pt-9 font-medium">Dashboard</h2>
          <div className="mt-9 mx-6"> <AddTransaction /></div>
        </div>


        <div className="mt-4 h-[1px] border border-gray-300 rounded-lg ">
          {/* Your bordered content goes here */}
        </div>
      </div>



      {
        loader ? (
          <div className="flex justify-center items-center py-10"><ClipLoader /></div>
        ) : (
          <div>
            {/* card Transactions  */}

              <div className="flex md:flex-row flex-col pl-5">
              <TransactionCard />
                <BudgetCard />

            </div>


            {/* All Transactions */}
              <TransactionsSection transactions={data} />
          </div>
        )
      }

    </section>
  )
}