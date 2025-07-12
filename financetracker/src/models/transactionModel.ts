import mongoose from "mongoose";
import User from "./UserModel";

const transactionSchema =new mongoose.Schema({
     
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
   },

     traAmount:{
      type:Number,
      required:true,
     },
     transactionDescription:{
      type:String,
      required:true,
   },
   transactionDate:{
      type:Date,
      required:true,
   }
})

const Transactions = mongoose.models.transactions||mongoose.model('transactions',transactionSchema);
export default Transactions