import dbConnect from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
import budget from "@/models/BudgetModel";

export async function POST(request:NextRequest){
try {
    dbConnect();
    const body =await request.json();
    const {id,budgetName,budgetAmount}=body;
    if( !budgetName || !budgetAmount) {
        return NextResponse.json({message:"Missing required fields"}, { status: 400 });
    }
    const existBudget =await budget.findOneAndUpdate(id,{
       budgetName,
       budgetAmount

    },{
        new:true
    })
    return NextResponse.json({message:"Budget updated successfully",  existBudget}, { status: 200 });

} catch (error) {
    console.log("Error in POST request:", error);
    return new Response("Error processing request", { status: 500 });
}


}