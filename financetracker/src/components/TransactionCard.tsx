import { ArrowLeftRight, Ellipsis } from "lucide-react";

export default function TransactionCard() {
    return (
        <section className="border border-gray-300 rounded-2xl p-5 mt-5 bg-white flex flex-col gap-4 md:mx-2 w-[350px] shadow-lg">
            {/* card header  */}
            <div className="flex justify-between">

                {/* transaction text */}
                <div className="flex items-center gap-2">
                    <h2 className="bg-[#2572FE] text-white w-10 h-10 rounded-full flex items-center justify-center">
                        <ArrowLeftRight />
                    </h2>
                    <h3 className="text-gray-800 font-medium text-xl">Total Transaction</h3>
                </div>
                {/* button  */}

                <button className="text-gray-500 cursor-pointer"><Ellipsis /></button>

            </div>
            {/* total Transaction Amount */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 pl-4">₹ 1,200.00</h2>
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-600">Since Last Month</h3>
            </div>





        </section>
    )
}