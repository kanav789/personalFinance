"use client";
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Transaction data
const transactions = [
    // ...your transaction objects (same as before)
    {
        id: 1,
        amount: 2500,
        description: "Salary Payment - Monthly",
        date: "2025-01-15",
        category: "Income",
        type: "credit",
        status: "completed"
    }, {
        id: 2,
        amount: -120,
        description: "Grocery Shopping - Walmart",
        date: "2025-01-14",
        category: "Food & Dining",
        type: "debit",
        status: "completed"
    },
    {
        id: 3,
        amount: -60,
        description: "Internet Bill - Fiber Connection",
        date: "2025-01-13",
        category: "Bills & Utilities",
        type: "debit",
        status: "completed"
    },
    {
        id: 4,
        amount: 1200,
        description: "Freelance Project Payment",
        date: "2025-01-12",
        category: "Income",
        type: "credit",
        status: "completed"
    },
    {
        id: 5,
        amount: -350,
        description: "Monthly Gym Membership",
        date: "2025-01-11",
        category: "Health & Fitness",
        type: "debit",
        status: "completed"
    },
    {
        id: 6,
        amount: -89,
        description: "Coffee & Lunch - Downtown",
        date: "2025-01-10",
        category: "Food & Dining",
        type: "debit",
        status: "completed"
    },

];

// Helper functions
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });



export default function TransactionsSection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory] = useState("All");
    const [sortBy] = useState("date");
    const [sortOrder] = useState("desc");

    // Filter and sort transactions (simplified for demo)
    const filteredTransactions = transactions
        .filter(txn => {
            const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                txn.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || txn.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            let aValue, bValue;
            if (sortBy === "date") {
                aValue = new Date(a.date).getTime();
                bValue = new Date(b.date).getTime();
            } else if (sortBy === "amount") {
                aValue = Math.abs(a.amount);
                bValue = Math.abs(b.amount);
            } else {
                aValue = a.description.toLowerCase();
                bValue = b.description.toLowerCase();
            }
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        });

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 space-y-6">
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-900">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Transaction History
                            </CardTitle>

                        </div>
                        <Badge variant="outline" className="px-3 py-1">
                            {filteredTransactions.length} transactions
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table className="min-w-[600px]">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6">
                                        Description
                                    </TableHead>
                                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-3 sm:px-6 text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTransactions.map((txn) => (
                                    <TableRow
                                        key={txn.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 border-b border-gray-100 dark:border-gray-800 group"
                                    >
                                        <TableCell className="py-4 px-3 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                    <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {formatDate(txn.date)}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(txn.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-3 sm:px-6">
                                            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-xs">
                                                {txn.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-3 sm:px-6 text-right">

                                            <span className='text-lg font-bold text-red-600'>
                                                ₹{txn.amount}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 dark:text-gray-400 text-lg">
                                No transactions found
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                Try adjusting your search or filter criteria
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
