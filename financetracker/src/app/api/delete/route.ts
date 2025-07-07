// import {NextResponse, NextRequest } from "next/server";
// import dbConnect from "@/lib/db";
// import Transactions from "@/models/transactionModel";
// export async function POST(request:NextRequest){

// try {
//     dbConnect();
//     let reqBody = await request.json();
//     const { transactionId } = reqBody;
//     //  check if transactionId is provided
//     if(!transactionId){
//         return NextResponse.json({error:"Please provide a transaction ID"}, {status:400});
//     }

//    const deltransc = await Transactions.deleteOne({_id: transactionId});
   
//     if(deltransc.deletedCount === 0){
//         return NextResponse.json({error:"Transaction not found"}, {status:404});
//     }

//     return NextResponse.json({message:"Transaction deleted successfully"}, {status:200});

// } catch (error) {
//      console.log("Error deleting transaction:", error);
//      return NextResponse.json({error:"Internal Server Error"}, {status:500});

// }

// }