import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        dbConnect();

        let { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "Please provide a transaction ID" }, { status: 400 });
        }
        // Check if transaction exists

        const existingTransaction = await Transactions.findById(id);
        if (!existingTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Transaction retrieved successfully",
            transaction: existingTransaction
        }, { status: 200 });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}