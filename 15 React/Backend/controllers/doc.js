import { cloudinaryUploder } from "../config/cloudinary.js";
import { GenerateComplaint, MyComplaints } from "../controller/complaint.js";

export const docControlers = async (req, res) => {
  try {
    const docCollection = req.files;

    console.log("req files", docCollection);

    const fileArr = [];
    for (const file of docCollection) {
      const result = await cloudinaryUploder.upload(file.path);
      fileArr.push(result);
    }

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
