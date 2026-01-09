import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require:true,
        trim:true,
    },

    price : {
        type : Number,
        require : true,
        trim:true
    },

    description : {
        type : String,
        require : true,
        trim : true
    }

},{timestamps:true})

export  const Product = mongoose.model("Product",userSchema)