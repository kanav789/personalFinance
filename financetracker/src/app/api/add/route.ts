import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";
import {NextRequest,NextResponse} from "next/server"

export async function POST(request:NextRequest){

  try {
    // Connect to database
    await dbConnect();
    
    const reqBody =await request.json()
    const {amount,date,description} =reqBody;
    // validation
    if(!amount || !date || !description){
      return NextResponse.json({error:"Please provide all the required fields"}, {status:400});
    }
    if(isNaN(amount)){
      return NextResponse.json({error:"Amount must be a number"}, {status:400});
    }
    if(isNaN(Date.parse(date))){
      return NextResponse.json({error:"Invalid date format"}, {status:400});
    }
    // create transaction
    const newTransaction = new Transactions({
      traAmount:amount,
      transactionDescription:description,
      transactionDate:new Date(date)
    });

    // save transaction to database
    await newTransaction.save();

    console.log("Transaction added successfully:", newTransaction);
    

     if(newTransaction){
      return NextResponse.json({message:"Transaction added successfully"}, {status:201});
     }

  } catch (error:any) {
    return NextResponse.json({error:error.message}, {status:500});
  }


}