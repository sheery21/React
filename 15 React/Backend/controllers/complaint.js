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
      !priority
    ) {
      return res.status(400).json({
        message: "requied field missing",
        status: false,
        data: null,
      });
    }

    await ComplaintModel.create({
      ...req.body,
      createdBy: user._id,
      bankId: user.bankId,
      role: user.role,
    });
    res.status(200).json({
      message: "Complaint Generated!",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const allComplaints = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }

    console.log("user", user);

    const data = await ComplaintModel.find({ createdBy: user._id });

    res.status(200).json({
      message: "Complaint fetched!",
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "someting went wrong",
      status: false,
      data: null,
    });
  }
};
