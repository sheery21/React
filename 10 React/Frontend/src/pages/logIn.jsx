import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succcess, setSucccess] = useState("");
  const logIn_API = "http://localhost:5000/logIn";
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError("please fill in all fields");
        setSucccess("");
        return;
      }

      const obj = {
        email,
        password,
      };

      const response = await axios.post(logIn_API , obj);
      const data = await response.data

      if(data.status == true ){
        localStorage.setItem("token" , data.token)
        console.log( data.token);
        setSucccess("Login successful!");
        navigate('/dashboard')
      }else{
        setError(data.message || "Invalid credentils")
      }


    } catch (error) {
      console.log(error.message);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        {succcess && <p className="succcess">{succcess}</p>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to={"/SignUp"}>SignUp?</Link>

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LogIn;
