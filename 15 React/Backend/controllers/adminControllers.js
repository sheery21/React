import BankOfficerModel from "../models/bank_OfficerModel.js";
import BankModel from "../models/bankModel.js";
import ComplaintModel from "../models/ComplaintModel.js";
import UserModel from "../models/userModel.js";

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

export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ComplaintModel.findOneAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({
      message: "Complaint deleted",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "someting went wrong",
      status: false,
      data: null,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("bankId", "name");

    res.status(200).json({
      status: true,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || " somethig went wrong",
      status: false,
      data: null,
    });
  }
};

export const getAllBanks_Officer = async (req, res) => {
  try {
    const officer = await BankOfficerModel.find().populate("bankId", "name");

    res.status(200).json({
      status: true,
      data: {
        officer,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || " somethig went wrong",
      status: false,
      data: null,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id, type } = req.params;

    let deleted;
    if (type === "customer") {
      deleted = await UserModel.findByIdAndDelete(id);
    } else if (type === "bank_officer") {
      deleted = await BankOfficerModel.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User deleted",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || " somethig went wrong",
      status: false,
      data: null,
    });
  }
};

export const getAllBanks = async (req, res) => {
  try {
    const banks = await BankModel.find();

    res.status(200).json({
      status: true,
      banks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || " somethig went wrong",
      status: false,
      data: null,
    });
  }
};
