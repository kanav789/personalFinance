"use client"
import { PostData } from "@/lib/customfetchdata";
import { useAppSelector } from "@/lib/hooks";
// import { useAppSelector } from "@/lib/hooks";
import { Banknote, } from "lucide-react";
import { set } from "mongoose";
import { useEffect, useState } from "react";
export default function BudgetCard() {
    const userdata = useAppSelector((state): any => state?.auth?.user)
    const [Loader, setLoader] = useState(false)
    const [budgetList, setBudgetList] = useState([])
    useEffect(() => {
        fetchBudget()
    }, [])
    const fetchBudget = async () => {

        try {
            if (!userdata?.user?.email) return



            setLoader(true)
            const body = {
                email: userdata?.user?.email
            }
            const response = await PostData('/api/budget/list', body);

            setBudgetList(response?.data)

            setLoader(false)
        } catch (error) {
            console.error("Error fetching budget:", error);
            setLoader(false)
        }

    }




    const totalBudget = budgetList?.reduce((acc, budget: any) => {
        return acc + budget?.budgetAmount
    }, 0)


    return (
        <section className="border border-gray-300 rounded-2xl p-5 mt-5 bg-white flex flex-col gap-4 md:mx-2 w-[320px] shadow-lg">
            {/* card header  */}
            <div className="flex justify-between">

                {/* transaction text */}
                <div className="flex items-center gap-2">
                    <h2 className="bg-[#2572FE] text-white w-10 h-10 rounded-full flex items-center justify-center">
                        <Banknote />
                    </h2>
                    <h3 className="text-gray-800 font-medium text-lg md:text-xl">Total Budget</h3>
                </div>
                {/* button  */}




            </div>
            {/* total Transaction Amount */}
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 pl-4">₹ {totalBudget}</h3>
            </div>

        </section>
    )
}