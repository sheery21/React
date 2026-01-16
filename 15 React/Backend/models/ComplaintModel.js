import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintType: {
      type: String,
      required: true,
      enum: ["Complaint", "Fraud"],
    },
    category: {
      type: String,
      required: true,
      enum: ["ATM", "Card", "Online Banking", "Branch Banking", "Other"],
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "inProgress", "resolved", "closed", "rejected"],
      default: "pending",
    },
    uploadedEvidence: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
  },
  { timestamps: true }
);

const ComplaintModel = mongoose.model("complaint", complaintSchema);

export default ComplaintModel;
