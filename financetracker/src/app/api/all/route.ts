import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";

export async function GET() {
    try {
        dbConnect()
      const data = await Transactions.find();
      if(!data)
      {
        return NextResponse.json({message:"Transaction Not Found"},{status:301})
      }
 return NextResponse.json({message:"Transaction fetched successfully",data}, {status:200});

    } catch (error) {
        
    }
}