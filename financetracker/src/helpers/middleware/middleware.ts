import dbConnect from "@/lib/db";
import UserModel from "@/models/UserModel";
export async function checkuser(email:string) {
    // Middleware logic to check user authentication
   await dbConnect();
   const user = await UserModel.findOne({ email });
   if (!user) {
       throw new Error("User not found");
   }
   return user;
}
