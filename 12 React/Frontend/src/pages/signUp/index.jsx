import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "../../App.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobileNUmber, setMobileNUmber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succcess, setSucccess] = useState("");
  const signUp_API = "http://localhost:3000/api/auth/signUp";
  const navigate = useNavigate();
  const handleChange = async () => {
    if (!name || !mobileNUmber || !email || !password) {
      return Swal.fire({
        title: "Missing Information!",
        text: "Please fill out all fields before signing up.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
    try {
      const userObj = {
        name,
        mobileNUmber,
        email,
        password,
      };
      const response = await axios.post(signUp_API, userObj);
      const data = await response.data;
      console.log(data);

      if (data.status == true) {
        setSucccess(data.message || "Account created successfully!");
        setError("");
        Swal.fire({
          title: "Success!",
          text: data.message || "Your account has been created successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        navigate("/otp-verify", {
          state: {
            email,
          },
        });
      } else {
        setError(data.message || "Something went wrong!");
        setSucccess("");

        Swal.fire({
          title: "Error!",
          text: data.message || "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.log("SignUp Error :", error.message);
      setError(error.data?.message || "Server error, please try again.");
      setSucccess("");
      Swal.fire({
        title: "Server Error!",
        text: error.data?.message || "Unable to connect to server.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }

    setName("");
    setMobileNUmber("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-box">
          <h2>Create Account</h2>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Mobile Number"
            name="mobileNUmber"
            value={mobileNUmber}
            onChange={(e) => setMobileNUmber(e.target.value)}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to={"/"}>Login?</Link>
          <Button type="submit" onClick={handleChange} text={"Sign Up"} />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {succcess && (
            <p style={{ color: "green", marginTop: "10px" }}>{succcess}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
