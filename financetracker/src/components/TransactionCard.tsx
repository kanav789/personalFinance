import { useAppSelector } from "@/lib/hooks";
import { ArrowLeftRight } from "lucide-react";

export default function TransactionCard() {
    const alltransaction = useAppSelector(state => state?.data?.items)
    const totalTransaction = alltransaction?.reduce((acc, item) => {
        return acc + (item?.traAmount || 0);
    }, 0);


    return (
        <section className="border border-gray-300 rounded-2xl p-5 mt-5 bg-white flex flex-col gap-4 md:mx-2 w-[320px] shadow-lg">
            {/* card header  */}
            <div className="flex justify-between">

                {/* transaction text */}
                <div className="flex items-center gap-2">
                    <h2 className="bg-[#2572FE] text-white w-10 h-10 rounded-full flex items-center justify-center">
                        <ArrowLeftRight />
                    </h2>
                    <h3 className="text-gray-800 font-medium text-lg md:text-xl">Total Transaction</h3>
                </div>
                {/* button  */}


            </div>
            {/* total Transaction Amount */}
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 pl-4">₹ {totalTransaction}</h3>
            </div>






        </section>
    )
}