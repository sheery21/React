import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import OTPModel from "../models/otp.js";

export const signUpContoller = async (req, res) => {
  try {
    const { name, mobileNUmber, email, password } = req.body;
    if (!name || !mobileNUmber || !email || !password) {
      return res.status(400).json({
        message: "Required fields are missing ",
        status: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "Email Address already exists",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const body = {
      ...req.body,
      password: hashPassword,
    };
    await UserModel.create(body);
    2;
    const OTP = uuidv4().slice(0, 4);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      status: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Email verification",
      html: `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Verify your email</title>
    <style>
      /* Gmail and most clients will ignore head styles for some rules; keep most styles inline */
      @media only screen and (max-width:600px) {
        .container { width: 100% !important; }
        .stack { display:block !important; width:100% !important; }
        .pad { padding: 18px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f3f6fb; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust:none;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f6fb; padding:30px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(20,30,60,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:22px 24px; text-align:center; background:linear-gradient(90deg,#60a5fa,#7dd3fc);">
                <h1 style="margin:0; font-size:22px; color:#fff; font-weight:600;">Confirm your email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="pad" style="padding:28px 32px; color:#243b53;">
                // <p style="margin:0 0 14px 0; font-size:16px;">Hi ${name} ,</p>
                <p style="margin:0 0 18px 0; font-size:15px; line-height:1.5;">
                  Thanks for signing up. Please verify your email address to activate your account and get started.
                </p>

                <!-- OTP / Code box -->
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0;">
                  <tr>
                    <td align="center">
                      <div style="display:inline-block; padding:18px 24px; border-radius:8px; background:#f1f7ff; border:1px dashed #cfe8ff;">
                        <strong style="font-size:20px; letter-spacing:6px; color:#0f1724;">${OTP}</strong>
                        <div style="font-size:12px; color:#5b6b80; margin-top:8px;">This code expires in 10 minutes</div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <p style="text-align:center; margin:16px 0;">
                  <a href="https://example.com/verify?token=REPLACE_TOKEN" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; padding:12px 22px; border-radius:8px; background:#2563eb; color:#ffffff; font-weight:600;">
                    Verify Email
                  </a>
                </p>

                <p style="font-size:13px; color:#6b7b8f;">
                  If the button doesn't work, copy and paste the following link into your browser:
                  <br>
                  <a href="https://example.com/verify?token=REPLACE_TOKEN" target="_blank" style="color:#2563eb; word-break:break-all;">https://example.com/verify?token=REPLACE_TOKEN</a>
                </p>

                <hr style="border:none; border-top:1px solid #eef3f8; margin:20px 0;">

                <p style="font-size:13px; color:#8b98a8; margin:0;">
                  If you didn't sign up for this account, you can safely ignore this email. This message was sent by Example App.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px; background:#fbfdff; text-align:center; font-size:12px; color:#9aa7b6;">
                © ${new Date().getFullYear()} Example App — All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
    });

    const otpObj = {
      otp: OTP,
      email,
    };
    await OTPModel.create(otpObj);
    return res.status(201).json({
      message: "signUp successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};
export const logInContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Required fields are missing ",
        status: false,
        data: null,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password!",
        status: false,
      });
    }
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "your email is not verified. Please Verified your email address!!",
        status: false,
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid email or password!",
        status: false,
      });
    }

    const secredkey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secredkey,
      {
        expiresIn: "24h",
      }
    );

    const userData = {
      name: user.name,
      email,
      mobileNUmber: user.mobileNUmber,
      _id: user._id,
    };

    return res.status(200).json({
      message: "Login successfully",
      status: true,
      data: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};
export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Required field are missing",
        status: false,
      });
    }
    const isExist = await OTPModel.findOne({ email, otp, isUsed: false });
    if (!isExist) {
      return res.status(400).json({
        message: "Invalid OTP",
        status: false,
      });
    }
    if (isExist.isUsed === true) {
      return res.status(400).json({
        message: "This OTP has expired. Please request a new OTP.",
        status: false,
      });
    }
    await OTPModel.findByIdAndUpdate(isExist._id, { isUsed: true });
    await UserModel.findOneAndUpdate({ email }, { isVerified: true });
    return res.status(201).json({
      message: "otp verify",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "somthing went wrong",
      status: false,
    });
  }
};
export const resendOTPController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        message: "Required field are missing",
        status: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email address",
        status: false,
      });
    }
    await OTPModel.updateMany({ email, isUsed: false }, { isUsed: true });
    if (isUsed == true) {
      a;
    }
    const OTP = uuidv4().slice(0, 4);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Email verification",
      // text: "HELLO JANI KAI HAL HAI??",
      html: `<!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Verify your email</title>
        <style>
          /* Gmail and most clients will ignore head styles for some rules; keep most styles inline */
          @media only screen and (max-width:600px) {
            .container { width: 100% !important; }
            .stack { display:block !important; width:100% !important; }
            .pad { padding: 18px !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background:#f3f6fb; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust:none;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f6fb; padding:30px 0;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(20,30,60,0.08);">
                <!-- Header -->
                <tr>
                  <td style="padding:22px 24px; text-align:center; background:linear-gradient(90deg,#60a5fa,#7dd3fc);">
                    <h1 style="margin:0; font-size:22px; color:#fff; font-weight:600;">Confirm your email</h1>
                  </td>
                </tr>
    
                <!-- Body -->
                <tr>
                  <td class="pad" style="padding:28px 32px; color:#243b53;">
                    // <p style="margin:0 0 14px 0; font-size:16px;">Hi ${
                      user.name
                    } ,</p>
                    <p style="margin:0 0 18px 0; font-size:15px; line-height:1.5;">
                      Thanks for signing up. Please verify your email address to activate your account and get started.
                    </p>
    
                    <!-- OTP / Code box -->
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0;">
                      <tr>
                        <td align="center">
                          <div style="display:inline-block; padding:18px 24px; border-radius:8px; background:#f1f7ff; border:1px dashed #cfe8ff;">
                            <strong style="font-size:20px; letter-spacing:6px; color:#0f1724;">${OTP}</strong>
                            <div style="font-size:12px; color:#5b6b80; margin-top:8px;">This code expires in 10 minutes</div>
                          </div>
                        </td>
                      </tr>
                    </table>
    
                    <!-- CTA -->
                    <p style="text-align:center; margin:16px 0;">
                      <a href="https://example.com/verify?token=REPLACE_TOKEN" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; padding:12px 22px; border-radius:8px; background:#2563eb; color:#ffffff; font-weight:600;">
                        Verify Email
                      </a>
                    </p>
    
                    <p style="font-size:13px; color:#6b7b8f;">
                      If the button doesn't work, copy and paste the following link into your browser:
                      <br>
                      <a href="https://example.com/verify?token=REPLACE_TOKEN" target="_blank" style="color:#2563eb; word-break:break-all;">https://example.com/verify?token=REPLACE_TOKEN</a>
                    </p>
    
                    <hr style="border:none; border-top:1px solid #eef3f8; margin:20px 0;">
    
                    <p style="font-size:13px; color:#8b98a8; margin:0;">
                      If you didn't sign up for this account, you can safely ignore this email. This message was sent by Example App.
                    </p>
                  </td>
                </tr>
    
                <!-- Footer -->
                <tr>
                  <td style="padding:16px 24px; background:#fbfdff; text-align:center; font-size:12px; color:#9aa7b6;">
                    © ${new Date().getFullYear()} Example App — All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    });
    const otpObj = {
      otp: OTP,
      email,
    };
    await OTPModel.create(otpObj);
    return res.status(200).json({
      message: "Reset Successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "somthing went wrong",
      status: false,
    });
  }
};
export const forgetPassOTPController = async (req, res) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  try {
    console.log("time", time);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Required field are missing",
        status: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Invalid Email address",
        status: false,
      });
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    console.log("token", token);

    const FE_URL = `${process.env.FRONTEND_URL}change-pass?q=${token}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    //send verify link
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Forgot password verify",
      html: ` <div style="font-family: Arial; padding: 20px; background: #f5f5f5;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          
          <h2 style="text-align: center; color: #333;">Reset Your Password</h2>
          <p style="color: #555;">
            You requested to reset your password. Click the button below to set a new password:
          </p>
  
          <a href=${FE_URL}
            style="display: block; width: 200px; margin: 20px auto; padding: 12px 0;
            background: #4CAF50; color: white; text-align: center;
            text-decoration: none; border-radius: 6px; font-size: 16px;">
            Reset Password
          </a>
  
          <p style="color: #777; font-size: 14px;">
            If you didn’t request this, please ignore this email.
          </p>
  
          <p style="color: #999; font-size: 12px; text-align:center;">
            &copy; 2025 Your App Name. All rights reserved.
          </p>
  
        </div>
      </div>`,
    });

    res.status(201).json({
      message: "please check your email for password reset link",
      status: true,
      time,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
export const changePassOTPController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const now = new Date();
    const time = now.toLocaleTimeString();

    if (!token || !newPassword) {
      return res.json({
        message: "Required field are missing",
        status: false,
      });
    }

    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenVerify.email || !tokenVerify._id) {
      return res.json({
        message: "Invalid Token",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(tokenVerify._id, {
      password: hashPassword,
    });
    res.json({
      message: "password changed",
      status: true,
      time,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
