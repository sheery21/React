import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../store/features/complaint/userComp.thunk";
import axios from "axios";
import Swal from "sweetalert2";

const CreateComplaint = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const { loading, success, error, message } = useSelector(
    (state) => state.complaint,
  );
  const { token } = useSelector((state) => state.authReducer);

  const [formData, setFormData] = useState({
    complaintType: "Complaint",
    category: "ATM",
    description: "",
    priority: "low",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login again.",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we submit your complaint.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // 1️⃣ Create Complaint
      const complaintRes = await dispatch(userThunk(formData)).unwrap();

      const complaintId =
        complaintRes?.complaintId || complaintRes?.data?.complaintId;

      if (!complaintId) {
        throw new Error("Complaint ID not received from API");
      }

      // 2️⃣ Upload Files (if any)
      const URL = import.meta.env.VITE_LOCAL_HOST_USER_FILE_SEND_API;

      if (file && file.length > 0) {
        const formDataFile = new FormData();
        for (let i = 0; i < file.length; i++) {
          formDataFile.append("files", file[i]);
        }

        await axios.post(`${URL}/${complaintId}`, formDataFile, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      Swal.fire({
        icon: "success",
        title: "Success 🎉",
        text: "Complaint & Evidence Uploaded Successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset Form
      setFormData({
        complaintType: "Complaint",
        category: "ATM",
        description: "",
        priority: "low",
      });

      setFile(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (success) {
      alert(message);
      setFormData({
        complaintType: "Complaint",
        category: "ATM",
        description: "",
        priority: "low",
      });
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Create Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Complaint Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Complaint Type
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Complaint">Complaint</option>
              <option value="Fraud">Fraud</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ATM">ATM</option>
              <option value="Card">Card</option>
              <option value="Online Banking">Online Banking</option>
              <option value="Branch Banking">Branch Banking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your complaint..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Upload Evidence
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFile(e.target.files)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;
