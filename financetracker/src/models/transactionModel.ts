import mongoose from "mongoose";

const transactionSchema =new mongoose.Schema({

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