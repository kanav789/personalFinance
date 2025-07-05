"use client"
import { AddTransaction } from "@/components/addTransaction";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", Expense: 400 },
  { name: "Feb", Expense: 300 },
  { name: "Mar", Expense: 500 },
  { name: "Apr", Expense: 200 },
  { name: "May", Expense: 350 },
  { name: "Jun", Expense: 250 },
];

const handleApi = async () => {
  const a = await fetch('/api/add', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: "test", amount: 100, date: "2023-10-01" })
  })
  let res = await a.json()
  console.log(res);


}
export default function Home() {
  return (
    <section className="bg-[#F5F7F9] min-h-screen flex flex-col items-center py-8 md:w-full ">
      <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
      <button onClick={() => handleApi()}>click</button>
      <div className="w-full flex justify-center mb-8">
        {/* <Button className="px-6 py-3 text-lg font-semibold cursor-pointer">
          Add Expense
        </Button> */}
        <AddTransaction />
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Expenses Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Expense" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
