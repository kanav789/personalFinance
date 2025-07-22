"use client"
import AmountDateChart from "@/components/chart";
import { PostData } from "@/lib/customfetchdata";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setData } from "@/redux/feature/dateSlice";
import { useEffect, useState } from "react";

export default function Statistics() {



    const userdata = useAppSelector((state): any => state?.auth?.user)
    const data = useAppSelector((state): any => state?.data?.items)
    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const body = {
                email: userdata?.user?.email
            }
            const response = await PostData('api/all', body);
            if (response) {
                dispatch(setData(response?.data))
            }


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <section className="bg-white w-full">
            {/* header */}
            <div className="px-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl px-8 pt-9 font-medium">Statistics</h2>

                </div>


                <div className="mt-4 h-[1px] border border-gray-300 rounded-lg ">
                    {/* Your bordered content goes here */}
                </div>
            </div>


            {/* charts */}

            <div className="mt-10 px-8">

                <AmountDateChart data={data} />

                <p className="text-[15px] text-gray-400 mt-5 text-center">Analyse the transactions of your finances</p>
            </div>

        </section>
    )
}