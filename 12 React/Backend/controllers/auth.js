import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpContollre = async (req, res) => {
  try {
    const { name, mobileNUmber, email, password } = req.body;
    if (!name || !mobileNUmber || !email || !password) {
      return res.json({
        message: "Required fields are missing ",
        status: false,
        data: null,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email Address already exists",
        status: false,
        data: null,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const body = {
      ...req.body,
      password: hashPassword,
    };

    await UserModel.create(body);
    return res.json({
      message: "signUp successfully",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};
export const logInContollre = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Required fields are missing ",
        status: false,
        data: null,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Invalid email or password!",
        status: false,
        data: null,
      });
    }

    if (!user.isVerified) {
      return response.json({
        message:
          "your email is not verified. Please Verified your email address!!",
        status: false,
      });
    } 

    const comparePass = await bcrypt.compare(password, user.password);
    console.log("comparePass", comparePass);

    if (!comparePass) {
      return res.json({
        message: "Invalid email or password!",
        status: false,
        data: null,
      });
    }

    const secredkey = process.env.SECRET_KEY;

    const token = jwt.sign({ id: user._id }, secredkey, {
      expiresIn: "24h",
    });

    const userData = {
      name: user.name,
      email: user.email,
      mobileNUmber: user.mobileNUmber,
      _id: user._id,
    };

    return res.json({
      message: "Login successfully",
      status: true,
      data: userData,
      token,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};
