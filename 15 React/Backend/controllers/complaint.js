import ComplaintModel from "../models/ComplaintModel.js";

export const complaintController = async (req, res) => {
  try {
    const user = req.user;
    const { complaintType, category, description, priority, uploadedEvidence } =
      req.body;

    if (!user) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }

    if (
      !complaintType ||
      !category ||
      !description ||
      !priority ||
      !uploadedEvidence
    ) {
      return res.status(400).json({
        message: "requied field missing",
        status: false,
        data: null,
      });
    }

    await ComplaintModel.create({ ...req.body, createdBy: user._id });
    res.status(200).json({
      message: "Complaint Generated!",
      status: true,
    });
  } catch (error) {
    return req.status(400).json({
      message: error.messing || "samthing went wrong",
      status: false,
      data: null,
    });
  }
};

