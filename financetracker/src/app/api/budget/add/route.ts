import { NextRequest,NextResponse } from "next/server";
import budget from "@/models/BudgetModel";
import dbConnect from "@/lib/db";

import { checkuser } from "@/helpers/middleware/middleware";
export async function POST(request:NextRequest){
    try {
        dbConnect();

        const body =await request.json();
        const {budgetName,budgetAmount,email}=body;
        if (!budgetName || !budgetAmount || !email) {
            return  NextResponse.json({message:"Missing required fields"}, { status: 400 });
        }
        // Check if the user present or not
        const user = await checkuser(email);
        if(!user){
            return NextResponse.json({message:"User not found"}, { status: 404 });
        }
        const date = new Date();
        const expiryDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const newBudget= new budget({
            userId: user._id,
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