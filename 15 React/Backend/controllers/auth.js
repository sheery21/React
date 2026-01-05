import OtpModel from "../models/otpModel.js";
import UserModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res) => {
  try {
    const { email, password, name, phoneNumber, role, bankId } = req.body;

    if (!email || !password || !name || !phoneNumber || !bankId) {
      return res.status(400).json({
        message: "required field missing",
        status: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const body = {
      ...req.body,
      password: hashPassword,
    };

    await UserModel.create(body);

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

    await OtpModel.create(otpObj);
    return res.status(200).json({
      message: "pleass check your email address!",
      status: true,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const logInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "required fields are missing",
        status: false,
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

    const token = jwt.sign({ id: user._id }, secredkey, {
      expiresIn: "24h",
    });

    const data = {
      name: user.name,
      email,
      mobileNUmber: user.mobileNUmber,
      token,
    };

    return res.status(200).json({
      message: "Login successfully",
      status: true,
      data: data,
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

    const isExist = await OtpModel.findOne({ email, otp, isUsed: false });
    console.log("isExist", isExist);

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
    await OtpModel.findByIdAndUpdate(isExist._id, { isUsed: true });
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
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Invalid email address",
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

    await OtpModel.updateMany({ email, isUsed: false }, { isUsed: true });

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
    await OtpModel.create(otpObj);
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
