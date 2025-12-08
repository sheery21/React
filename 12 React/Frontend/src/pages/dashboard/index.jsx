import { useState, useRef } from "react";
import axios from "axios";

const Dashboard = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const url = "http://localhost:3000/api/image/upload";

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded:", response.data);
      alert("Upload Successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  // input ko click karwana
  const fileHandler = () => {
    inputRef.current.click();
  };

  // image select handler
  const imageHandler = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;
        setFilePreview(base64String);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <>
      {/* Hidden INPUT */}
      <input
        type="file"
        ref={inputRef}
        onChange={imageHandler}
        style={{ display: "none" }}
      />

      {/* Button to open file picker */}
      <button onClick={fileHandler}>Choose Image</button>

      {filePreview && (
        <>
          <img src={filePreview} width={250} height={250} alt="Preview" />
          <br />
          <button onClick={uploadImage}>Save</button>
        </>
      )}
    </>
  );
};

export default Dashboard;
