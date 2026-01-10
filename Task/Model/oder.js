import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      price: Number,
      name : String
    },
],
  totalamount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String            
  },
  status: {
    type : String,
    enum : ["pending" , "completed" , "failed"],
    default : "pending"
  }

},{timestamps:true})

export const Oder = mongoose.model("Oder",oderSchema)