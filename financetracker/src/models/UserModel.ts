import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    image:{
        type: String,
        required: true,
    }

   
})
const UserModel =mongoose.models.User || mongoose.model("User",userSchema)
export default UserModel; 