import { cloudinaryUploder } from "../config/cloudinary.js";
import ComplaintModel from "../models/ComplaintModel.js";

export const docControlers = async (req, res) => {
  try {
    const user = req.user;
    const { complaintId } = req.params;
    console.log("user", user);
    console.log("complaintId", complaintId);

    const docCollection = req.files;

    console.log("req files", docCollection);
    if (!user) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }
    if (!complaintId || complaintId === ":complaintId") {
      return res.status(400).json({
        message: "Valid Complaint ID required",
        status: false,
      });
    }

    let uploadedEvidence = [];
    for (const file of docCollection) {
      const result = await cloudinaryUploder.upload(file.path);
      uploadedEvidence.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
    console.log("uploadedEvidence", uploadedEvidence);

    const complaint = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      { $push: { uploadedEvidence: { $each: uploadedEvidence } } },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Files uploaded successfully",
      status: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "somthing went wrong",
      status: false,
      data: null,
    });
  }
};
