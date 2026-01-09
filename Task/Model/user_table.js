import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        trim : true

    },
    city : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        trim:true,
        minlenght:8,
        require:true
    }
},{timestamps:true})


export  const User = mongoose.model("User",userSchema)