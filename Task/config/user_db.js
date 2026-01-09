import mongoose from 'mongoose';

const connectdb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log({message:"Database connected successfully",status:true})
    }catch(err){
        console.log({message:"Database error",status:false})
    }
}

export default connectdb;