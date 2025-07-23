import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Transactions from "@/models/transactionModel";
import { checkuser } from "@/helpers/middleware/middleware";

export async function POST(request: NextRequest) {
    try {
        dbConnect()
        const body = await request.json();
        const {email}=body;

        if(!email)
        {
            return NextResponse.json({message:"Email is required"},{status:400})
        }
        // check user 
      const user = await checkuser(email)
      if(!user)
      {
        return NextResponse.json({message:"User Not Found"},{status:301})
      }

                                            
      const data = await Transactions.find({
        userId: user._id
      });
      console.log("Fetched transactions:", data);
      
      if(!data)
      {
        return NextResponse.json({message:"Transaction Not Found"},{status:301})
      }
        return NextResponse.json({message:"Transaction fetched successfully",data}, {status:200});

    } catch (error) {
        console.log("Error fetching transactions:", error);
        return NextResponse.json({message:"Error fetching transactions",error}, {status:500});
    }
}