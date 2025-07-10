import mongoose from "mongoose";
const budgetSchema =new mongoose.Schema({

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