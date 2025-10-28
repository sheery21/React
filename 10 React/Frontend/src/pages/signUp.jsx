import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
const SignUp = () => {
  const [fistName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succcess, setSucccess] = useState("");

  const signUp_API = 'http://localhost:5000/signUp'
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      if (!fistName || !lastName || !age || !email || !password) {
        setError("please fill in all fields");
        setSucccess("");
        return;
      }
      setError("");
      const obj = {
        fistName,
        lastName,
        age,
        email,
        password,
      }; 
      

     const response =  await axios.post(signUp_API , obj)
     const data = await response.data

     if(!data.status){
      setError(data.message)
      setSucccess('')
      return
     }
     setSucccess(data.message)

     navigate('/')
      
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong");
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        {succcess && <p className="succcess">{succcess}</p>}

        <label>Fist Name</label>
        <input
          type="text"
          placeholder="Enter your fist name"
          value={fistName}
          onChange={(e) => setFistName(e.target.value)}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Gender</label>
        <input
          type="text"
          placeholder="Enter your gender"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

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

        <Link to={"/"}>Login?</Link>

        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
