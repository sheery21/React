// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";
// import { addTodo, removeTodo } from "./redux/slices/counterSlice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/singnUp" element={<SignupPage />} />
        <Route path="/OtpVer" element={<OtpVerification />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
