import jwt from "jsonwebtoken";

export const authMiddleware = (request, response, next) => {
  const PRIVATE_KEY = "SHERRY!";
  const token = request?.headers["authorization"]?.split(" ")[1];
  const isVerify = jwt.verify(token, PRIVATE_KEY);
  console.log('isVerify',isVerify);
  

  if (isVerify._id) {
    next()
  } else {
    response.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
