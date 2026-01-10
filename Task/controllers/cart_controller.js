import { User } from "../Model/user_table.js";
import { Cart } from "../Model/user_CartTable.js";
import mongoose from "mongoose";
import { Product } from "../Model/user_product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Oder } from "../Model/oder.js";

const stripe = new Stripe(process.env.STRIPE_SECREAT_KEY);

export const createcart = async (req, res) => {
  const { id, quantity } = req.body;
  const userid = req.userid;
  console.log(userid);

  try {
    const checkuser = await User.findOne({ _id: userid });

    if (!checkuser) {
      return res.status(400).json({ message: "User id not found" });
    }

    if (!quantity || quantity < 1) {
      return res.status(404).json({ message: "Quantity must be atleast 1" });
    }

    let checkcart = await Cart.findOne({ userid: userid });
    if (checkcart != null) {
      const checkexist = checkcart.products.find((item) => {
        return item.product.toString() === id;
      });
      if (checkexist) {
        checkexist.quantity += quantity;
        await checkcart.save();
        return res.status(200).json({
          message: "Quantity succesfully updated",
          status: true,
          data: checkexist.product,
        });
      } else {
        checkcart.products.push({ product: id, quantity: quantity });
        await checkcart.save();
        return res.status(200).json({
          message: "New Product succesfully Added",
          status: true,
          data: checkcart,
        });
      }
    }

    if (checkcart == null) {
      let newdata = new Cart({
        userid: userid,
        products: [
          {
            product: id,
            quantity: quantity,
          },
        ],
        buyername: checkuser?.name,
      });

      await newdata.save();

      return res.status(200).json({
        message: "User Buy successfully",
        status: true,
        data: newdata,
      });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message });
  }
};

// export const getcart = async (req, res) => {

//   try {
//  const cartData = await Cart.aggregate([
//   { $unwind: "$products" },
//   { $match: { "products.quantity": { $lte: 10 } } },
//   {
//     $lookup: {
//       from: "products",
//       localField: "products.product",
//       foreignField: "_id",
//       as: "product"
//     }
//   },
//   { $unwind: "$product" },
//   {
//     $project: {
//       _id: 0,
//       quantity: "$products.quantity",
//       Name: "$product.name"
//     }
//   },
//   {$sort : {Name:1}}
// ]);
//     return res.status(200).json({message: "ucScessfully fetched",status: true,Name: cartData});
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({message: "Server error",error: err.message});
//   }
// };

export const getcart = async (req, res) => {
  const userid = req.userid;
  try {
    const cart = await Cart.findOne({ userid }).populate("products.product");

    if (!cart) {
      return res.status(400).json({
        message: "Cart is empty",
        status: false,
      });
    }

    return res.status(200).json({
      message: "User cart fetched successfully",
      status: true,
      cart: cart,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message, status: false });
  }
};

export const removecart = async (req, res) => {
  try {
    const userid = req.userid;
    const { Id } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userid: userid },
      {
        $pull: {
          products: { product: Id },
        },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Product removed from cart",
      status: true,
      cart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
      status: false,
    });
  }
};

export const checkoutcart = async (req, res) => {
  const userid = req.userid;
  try {
    const cart = await Cart.findOne({ userid });
    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart not found or empty" });
    }

    const productIds = cart.products.map((item) => item.product);
    const products = await Product.find({
      _id: { $in: productIds },
    });

    const lineItems = cart.products.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.product.toString()
      );

      if (!product) {
        throw new Error("Product not found");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/remove",

      metadata: {
        userid: userid.toString(),
        cartid: cart._id.toString(),
      },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const webhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ received: true });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { userid, cartid } = session.metadata;
    const oder = await Oder.findOne({ paymentId: session.payment_intent });

    if (oder) {
      return res.status(200).json({ recevied: true });
    }

    const cart = await Cart.findById(cartid).populate("products.product");

    try {
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const products = cart.products.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const newoder = await Oder.create({
        user: userid,
        products,
        paymentId: session.payment_intent,
        totalamount: session.amount_total / 100,
        status: "completed",
      });

      return res.status(200).json({ recevied: true, newoder: newoder });
    } catch (err) {
      console.log(err);
    }
  }
};

export const Buyproducts = async (req, res) => {
  const userid = req.userid;

  try {
    const buy = await Oder.find({ user: userid }).populate("products.product");
    if (!buy || buy.length === 0) {
      return res.status(404).json({ message: "Empty", status: false });
    }
    return res
      .status(200)
      .json({ message: "yours Buy products", buy: buy, status: true });
  } catch (err) {
    console.log(err);
  }
};

export const updatecart = async (req, res) => {
  const userid = req.userid;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity < 1) {
      return res
        .status(401)
        .json({ message: "qunatity must be atleast 1", status: false });
    }

    const cart = await Cart.findOneAndUpdate(
      { userid, "products.product": productId },
      {
        $set: {
          "products.$.quantity": quantity,
        },
      },
      { new: true }
    ).populate("products.product");
    console.log(cart);
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart is not founded!!", status: false });
    }
    return res.status(200).json({
      message: "Cart is successfully updated",
      cart: cart,
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};
