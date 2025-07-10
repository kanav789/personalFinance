import { NextRequest,NextResponse } from "next/server";
import budget from "@/models/BudgetModel";
import dbConnect from "@/lib/db";
export async function POST(request:NextRequest){
    try {
        dbConnect();

        const body =await request.json();
        const {budgetName,budgetAmount}=body;
        if (!budgetName || !budgetAmount) {
            return  NextResponse.json({message:"Missing required fields"}, { status: 400 });
        }
        const date = new Date();
        const expiryDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const newBudget= new budget({
            budgetName,
            budgetAmount,
            expiryDate: expiryDate 
        })
        await newBudget.save();
       return NextResponse.json({message:"Transaction fetched successfully",newBudget}, {status:200});
    } catch (error) {
        console.log("Error in POST request:", error);
        return new Response("Error processing request", { status: 500 });
    }
}