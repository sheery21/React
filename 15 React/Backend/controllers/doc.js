import { cloudinaryUploder } from "../config/cloudinary.js";
import ComplaintModel from "../models/ComplaintModel.js";
// import { GenerateComplaint, MyComplaints } from "../controller/complaint.js";

export const docControlers = async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);

    const docCollection = req.files;

    console.log("req files", docCollection);
    if (!user) {
      return res.status(400).json({
        message: "un auth user",
        status: false,
        data: null,
      });
    }

    const fileArr = [];
    for (const file of docCollection) {
      const result = await cloudinaryUploder.upload(file.path);
      fileArr.push(result);
    }

    const urls = fileArr.map((file) => file.secure_url);

    await ComplaintModel.findByIdAndUpdate(user._id, {
      uploadedEvidence: urls,
    });

    return res.status(200).json({
      message: "Files uploaded successfully",
      status: true,
      data: fileArr,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "somthing went wrong",
      status: false,
      data: null,
    });
  }
};
