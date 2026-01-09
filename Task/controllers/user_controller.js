import { Product } from "../Model/user_product.js";
import "dotenv/config";
import { User } from "../Model/user_table.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRETKEY = process.env.SECREATKEY;

export const createproduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = await Product.findOne({ name: name });
    if (product) {
      return res
        .status(401)
        .json({ message: "product already exits", status: false });
    } else {
      const newuser = await Product.create({
        name: name,
        price: price,
        description: description,
      });
      return res.status(200).json({
        messsage: "Product created succesfully",
        newuser: newuser,
        status: true,
      });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message, status: false });
  }
};

export const createuser = async (req, res) => {
  const { email, password, city } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(401)
        .json({ message: "User already exits", status: false });
    } else {
      const hasedpassword = await bcrypt.hash(password, 10);
      const newuser = await User.create({
        email: email,
        city: city,
        password: hasedpassword,
      });
      return res
        .status(200)
        .json({
          message: "User created successfully",
          status: true,
          newuser: newuser,
        });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message, status: false });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Invalid password",
        status: false,
      });
    }
    const accesstoken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECREATKEY,
      {
        expiresIn: "20m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "User successfully logged in",
      status: true,
      email: user.email,
      token: accesstoken,
    });
  } catch (err) {
    console.log("Login error:", err.message);
    return res.status(500).json({
      message: "Server error",
      status: false,
    });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not provided!", status: false });
  }
  try {
    const decode = jwt.verify(token, process.env.REFRESH_KEY);
    const newAccessToken = jwt.sign(
      { id: decode.id, email: decode.email },
      process.env.SECREATKEY,
      { expiresIn: "1m" }
    );

    return res
      .status(200)
      .json({
        message: " New Token created successfully",
        token: newAccessToken,
        status: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Getuser = async (req, res) => {
  const id = req.userid;
  try {
    const user = await User.findById(id).select("-password");

    if (!user || user.length == 0) {
      return res.status(401).json({ message: "User not found", status: false });
    }
    return res
      .status(200)
      .json({ message: "user fatched successfully", status: true, user: user });
  } catch (err) {
    return res.status(500).json({ message: "internal error", status: false });
  }
};

export const getproduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product || !product.length === 0) {
      return res
        .status(401)
        .json({ message: "Product is not found", status: false });
    } else {
      return res
        .status(200)
        .json({ message: "All products", product: product, status: true });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message, status: false });
  }
};

export const updateproduct = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Product is not found", status: false });
    } else {
      return res.status(200).json({
        message: "Product update successfully",
        status: true,
        user: user,
      });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message, status: false });
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Product.findByIdAndDelete({ _id: id });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Product is not found", status: false });
    } else {
      return res.status(200).json({
        message: "Product deleted successfully",
        status: true,
        user: user,
      });
    }
  } catch (err) {
    console.log({ message: "server error", error: err.message, status: false });
  }
};

export const Logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    if (token) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      return res
        .status(200)
        .json({ message: "user Logout suceesfully !", staus: true });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal error", error: err.message, status: false });
  }
};
