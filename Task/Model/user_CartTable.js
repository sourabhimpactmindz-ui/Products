import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
               
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
