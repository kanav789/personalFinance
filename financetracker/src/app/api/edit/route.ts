import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";

import { NextRequest, NextResponse } from "next/server";    

export async function POST(request:NextRequest){
try {
    await dbConnect();

    
    let {id, traAmount, transactionDescription, transactionDate} = await request.json();
     
    if(!id || !traAmount || !transactionDescription || !transactionDate){
        return NextResponse.json({message:"Please fill all the fields"}, {status:400});
    }

    // Check if transaction exists
    const existingTransaction = await Transactions.findById(id);
    
    if(!existingTransaction){
        return NextResponse.json({message:"Transaction not found"}, {status:404});
    }

    // Update the transaction by id and return the updated document
    const updatedTransaction = await Transactions.findByIdAndUpdate(
        id,
        {
            traAmount,
            transactionDescription,
            transactionDate: new Date(transactionDate)
        },
        { new: true }
    );

    return NextResponse.json({
        message: "Transaction updated successfully",
        transaction: updatedTransaction
    }, {status: 200});

} catch (error) {
     console.log(error)
     return NextResponse.json({message:"Internal Server Error"}, {status:500});
}
}