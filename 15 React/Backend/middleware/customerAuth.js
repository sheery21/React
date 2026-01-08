import UserModel from "../models/userModel.js";

export const customerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isVerified = jwt.verify(token, process.env.SECRET_KEY);
    console.log("isVerified", isVerified);
    if (!isVerified) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }

    const user = await UserModel.findById(isVerified.id).select("role bankId");

    console.log("user", user);

    if (!user) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }
    if (user.role === "customer") {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "permission de",
        status: false,
      });
    }
    console.log("isVerify", user);
  } catch (error) {
    return res.status(401).json({
      message: "UnAuth user",
      status: false,
    });
  }
};

export default customerAuth;
