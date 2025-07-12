import mongoose from "mongoose";
import User from "./UserModel";

const budgetSchema =new mongoose.Schema({
 
 userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
 },

      
    budgetName:{
        type:String,
        unique:true,
        required:true
    },
    budgetAmount:{
        type:Number,
        required:true,
    },
    expiryDate:{
        type:Date,
        required:true,
    }
})

const budget =mongoose.models.budget || mongoose.model('budget',budgetSchema);
export default budget;