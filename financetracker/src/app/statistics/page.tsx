"use client"
import AmountDateChart from "@/components/chart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Statistics() {


    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {

            const response = await axios.get('api/all')

            if (response.status === 200) {
                const responseData = response?.data?.data;
                setData(responseData);
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
            </div>

        </section>
    )
}