import {NextResponse, NextRequest } from "next/server";
import budget from "@/models/BudgetModel";
import dbConnect from "@/lib/db";

export async function POST(request:NextRequest){

try {
    dbConnect();
    let reqBody = await request.json();
    const { id } = reqBody;
    if(!id){
        return NextResponse.json({error:"Please provide a budget ID"}, {status:400});
    }

   const delbudget = await budget.deleteOne({_id: id});
   
    if(delbudget.deletedCount === 0){
        return NextResponse.json({error:"budget not found"}, {status:404});
    }

    return NextResponse.json({message:" Budget deleted successfully"}, {status:200});

} catch (error) {
     console.log("Error deleting transaction:", error);
     return NextResponse.json({error:"Internal Server Error"}, {status:500});

}

}