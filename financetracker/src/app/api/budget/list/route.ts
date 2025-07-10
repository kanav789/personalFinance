import dbConnect from "@/lib/db";
import budget from "@/models/BudgetModel";
import { NextResponse } from "next/server";

export async function GET(){
try {
    dbConnect();
  const allbudget =await budget.find();
    if (!allbudget) {
        return NextResponse.json({ error: "No budgets found" }, { status: 404 });
    }
    return NextResponse.json(allbudget, { status: 200 });
} catch (error) {
    console.log("Error in GET /api/budget/all:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500})
}
}