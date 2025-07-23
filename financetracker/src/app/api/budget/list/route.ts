import { checkuser } from "@/helpers/middleware/middleware";
import dbConnect from "@/lib/db";
import budget from "@/models/BudgetModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
try {
    dbConnect();
    const body = await request.json();
    const {email} = body;
    if(!email){
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const user = await checkuser(email);
    
    if(!user){
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User found:", user);

    const allbudget = await budget.find({userId: user._id});
    console.log("All budgets for user:", allbudget);
    const currentDate =new Date();
    const filteredBudgets = allbudget.filter(b => new Date(b.expiryDate) > currentDate);
    if (filteredBudgets.length === 0) {
         await budget.deleteMany({ _id: { $in: filteredBudgets.map(item => item._id) } });
    }

   

    const updatedBudget = await budget.find({userId: user._id});
    console.log("Updated budgets:", updatedBudget);
     

    if (!updatedBudget) {
        return NextResponse.json({ error: "No budgets found" }, { status: 404 });
    }
    return NextResponse.json({message: "Budgets retrieved successfully", data: updatedBudget}, { status: 200 });
} catch (error) {
    console.log("Error in GET /api/budget/all:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500})
}
}