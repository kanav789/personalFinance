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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipLoader } from 'react-spinners';

// Type Definitions for your actual backend response
type Transaction = {
    _id: string;
    transactionDate: string;
    transactionDescription: string;
    traAmount: number;
    __v?: number;
};

type Props = {
    transactions: Transaction[];
};

// Helper to format the date
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

export default function TransactionsSection({ transactions }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy] = useState<"date" | "amount">("date");
    const [sortOrder] = useState<"asc" | "desc">("desc");
    const [loader, setLoader] = useState(false);

    const filteredTransactions = transactions
        ?.filter(txn => {
            // Search only in description
            const matchesSearch = txn.transactionDescription
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => {
            let aValue: number | string, bValue: number | string;
            if (sortBy === "date") {
              aValue = new Date(a.transactionDate).getTime();
              bValue = new Date(b.transactionDate).getTime();
          } else {
              aValue = Math.abs(a.traAmount);
              bValue = Math.abs(b.traAmount);
          }
            return sortOrder === "asc" ? aValue - (bValue as number) : (bValue as number) - (aValue as number);
        });

    if (loader) {
        return <div className="flex justify-center items-center py-10"><ClipLoader /></div>;
    }

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
                                                        {formatDate(txn.transactionDate)}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(txn.transactionDate).toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-3 sm:px-6">
                                            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-xs">
                                                {txn.transactionDescription}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-3 sm:px-6 text-right">
                                            <span className='text-lg font-bold text-red-600'>
                                                ₹{txn.traAmount}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {transactions.length === 0 && (
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
    );
}
