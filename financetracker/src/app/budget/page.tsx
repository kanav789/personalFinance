"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar, Ellipsis, Trash } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddBudget from "@/components/addBudget";
import { useEffect, useState } from "react";
import axios from "axios";
import { setData } from "@/redux/feature/dateSlice";
import { ClipLoader } from "react-spinners";
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

export default function BudgetPage() {
    const data = useAppSelector((state: any) => state?.data?.items)
    const budget = [
        {
            _id: "1",
            transactionDate: "2023-10-01",
            transactionDescription: "Grocery Shopping",
            traAmount: 1500,
        },
        {
            _id: "2",
            transactionDate: "2023-10-05",
            transactionDescription: "Electricity Bill",
            traAmount: 800,
        },
        {
            _id: "3",
            transactionDate: "2023-10-10",
            transactionDescription: "Internet Bill",
            traAmount: 600,
        }
    ]
    const dispatch = useAppDispatch()
    const [Loader, setLoader] = useState<boolean>(false)
    useEffect(() => {
        fetchBudget();
    }, [])

    const fetchBudget = async () => {

        try {
            setLoader(true)
            const response = await axios.get('/api/budget/list');
            if (response.status === 200) {
                dispatch(setData(response?.data))

            }
            setLoader(false)
        } catch (error) {
            console.error("Error fetching budget:", error);
            setLoader(false)
        }

    }
    const onDelete = async (id: string) => {
        try {
            const res = await axios.post('api/budget/deletebudget', {
                id: id
            })

            if (res.status === 200) {
                console.log("Budget deleted successfully");
                fetchBudget(); // Refresh the budget list after deletion
            } else {
                console.error("Failed to delete budget:", res.data);
            }
        } catch (error) {
            console.log("Error deleting budget:", error);

        }
    }


    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ClipLoader />
            </div>
        )
    }
    return (
        <section className="bg-white w-full">

            {/* header */}
            <div className="px-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl px-8 pt-9 font-medium">Dashboard</h2>
                    <div className="mt-9 mx-6"> <AddBudget /> </div>


                </div>
                <div className="mt-4 h-[1px] border border-gray-300 rounded-lg "></div>
            </div>

            {/* budgets  */}


            {
                Loader ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <ClipLoader />
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 space-y-6">
                        <Card className="border-0 shadow-xl bg-white dark:bg-gray-900">
                            <CardHeader className="border-b border-gray-200 dark:border-gray-800 pb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            Budget List
                                        </CardTitle>
                                        <CardDescription className="text-gray-500 text-[10px] dark:text-gray-400">
                                            This budgets get expire on the last date of current month</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="px-3 py-1">
                                        {data?.length} budgets
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table className="min-w-[600px]">
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                                                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6">
                                                    Expired Date
                                                </TableHead>
                                                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6">
                                                    Name
                                                </TableHead>
                                                <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6 text-right">
                                                    Amount
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data?.map((txn: any) => (
                                                <TableRow
                                                    key={txn._id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 border-b border-gray-100 dark:border-gray-800 group"
                                                >
                                                    <TableCell className="py-4 px-3 sm:px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                                    {formatDate(txn.expiryDate)}
                                                                </div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {new Date(txn.expiryDate).toLocaleDateString('en-US', { weekday: 'short' })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-4 px-3 sm:px-6">
                                                        <div
                                                            className={`font-medium text-gray-900 w-[100px] flex flex-wrap md:w-[300px] dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 ease-in-out cursor-pointer "
                                                        }`}

                                                        >
                                                            {txn.budgetName}
                                                        </div>

                                                    </TableCell>
                                                    <TableCell className="py-4 px-3 sm:px-6 text-right">
                                                        <span className='text-sm font-medium text-gray-900'>
                                                            ₹{txn.budgetAmount}
                                                        </span>
                                                    </TableCell>

                                                    <TableCell className="relative">
                                                        <button className="cursor-pointer" onClick={() => onDelete(txn._id)}><Trash size={15} /></button>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {budget?.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-500 dark:text-gray-400 text-lg">
                                            No transactions found
                                        </div>
                                        <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                            Try adjusting your search
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )
            }


        </section>
    )

}