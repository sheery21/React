import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../store/features/complaint/userComp.thunk";

const CreateComplaint = () => {
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
     if (!token) {
    alert("Unauthorized. Please login again.");
    return;
  }
    e.preventDefault();
    dispatch(userThunk({formData , token}));
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
        {/* Heading */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreateComplaint;
