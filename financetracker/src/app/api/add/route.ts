import { checkuser } from "@/helpers/middleware/middleware";
import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";

interface TransactionRequestBody {
  amount: number;
  date: string;
  description: string;
  email:string
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const reqBody: TransactionRequestBody = await request.json();
    const { amount, date, description,email } = reqBody;

    // Validate required fields
    if (amount === undefined || !date || !description || !email) {
      return NextResponse.json({ error: "Please provide all the required fields" }, { status: 400 });
    }

    // Check if user exists
 const user = await checkuser(email);
  if(!user){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

    

    // Validate date format
    if (isNaN(Date.parse(date))) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Create and save transaction
    const newTransaction = new Transactions({
      userId: user._id, 
      traAmount: amount,
      transactionDescription: description,
      transactionDate: new Date(date),
    });

    const savedTransaction = await newTransaction.save();

    if (!savedTransaction) {
      return NextResponse.json({ error: "Failed to save transaction" }, { status: 500 });
    }

    console.log("Transaction added successfully:", savedTransaction);

    return NextResponse.json(
      { message: "Transaction added successfully", transaction: savedTransaction },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
