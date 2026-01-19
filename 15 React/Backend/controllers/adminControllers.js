import ComplaintModel from "../models/ComplaintModel.js";

export const adminControllers = async (req, res) => {
  try {
    const admin = req.admin;
    console.log("admin ", admin);

    if (!admin) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }

    const data = await ComplaintModel.find()
      .populate("bankId", "name")
      .populate("createdBy", "name email");

    res.status(200).json({
      message: "complaints fetch",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};
