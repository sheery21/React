import ComplaintModel from "../models/ComplaintModel.js";

export const bank_OfficerControllers = async (req, res) => {
  try {
    const user = req.user;
    console.log("user ", user);

    if (!user) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }

    const data = await ComplaintModel.find({ bankId: user.bankId });
    res.json({
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

