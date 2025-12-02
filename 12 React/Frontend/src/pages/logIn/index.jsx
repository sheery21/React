import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import Swal from "sweetalert2";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succcess, setSucccess] = useState("");
  const LOGNIN_API = "http://localhost:3000/api/auth/logIn";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      return Swal.fire({
        title: "Missing Information!",
        text: "Please fill out all fields before logIn.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
    const userObj = {
      email,
      password,
    };

    try {
      const response = await axios.post(LOGNIN_API, userObj);
      const data = await response.data;

      console.log("data" ,data) ;
      

      if (data.status === true && data.data) {
        const user = data.data;
        const token = data.token;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        localStorage.setItem("token", token);
        setSucccess(data.message || "Account created successfully!");
        setError("");
        Swal.fire({
          title: "Success!",
          text: data.message || "Your account has been created successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        navigate("/dashboard");
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

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to={"/signUp"}>signUp?</Link>
          <Link to={"/forgot-pass"}>forgotPassword?</Link>
          <Button type="submit" onClick={handleSubmit} text={"Sign In"} />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {succcess && (
            <p style={{ color: "green", marginTop: "10px" }}>{succcess}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LogIn;
