
import mongoose from "mongoose"
const mongodburl = process.env.MONGODB_URL;
if(!mongodburl) {
    throw new Error("MONGODB_URL is not defined in .env file");
}

// type connectionObject = {
//     isConnected?: number;
// }
// const connection :connectionObject ={}
async function dbConnect(){

    // if(connection.isConnected){
    //     console.log('Already Connected to database')
    //     return;
    // } 
  

    try {
     await mongoose.connect(mongodburl||"")
      const connection = mongoose.connection;
      connection.on('connected',()=>{
        console.log('MongoDB connected successfully')
      })
      connection.on('error',(err)=>{
        console.error('MongoDB connection error,please check your connection string'+err)
        process.exit(1)
      })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");    
        
    }

}
export default dbConnect;