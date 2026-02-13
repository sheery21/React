import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { resetComplaintState } from "../../store/slices/complaintSlice";
import { userThunk } from "../../store/features/complaint/userComp.thunk";

const CreateComplaint = () => {
  const dispatch = useDispatch();

  const { loading, success, error, message } = useSelector(
    (state) => state.complaint
  );

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
    e.preventDefault();
    dispatch(userThunk(formData));
  };

  useEffect(() => {
    if (success) {
      alert(message);
      // dispatch(resetComplaintState());
      setFormData({
        complaintType: "Complaint",
        category: "ATM",
        description: "",
        priority: "low",
      });
    }
  }, [success]);

  return (
    <div>
      <h2>Create Complaint</h2>

      <form onSubmit={handleSubmit}>
        <select name="complaintType" onChange={handleChange}>
          <option value="Complaint">Complaint</option>
          <option value="Fraud">Fraud</option>
        </select>

        <select name="category" onChange={handleChange}>
          <option value="ATM">ATM</option>
          <option value="Card">Card</option>
          <option value="Online Banking">Online Banking</option>
          <option value="Branch Banking">Branch Banking</option>
          <option value="Other">Other</option>
        </select>

        <select name="priority" onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe your complaint"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateComplaint;
