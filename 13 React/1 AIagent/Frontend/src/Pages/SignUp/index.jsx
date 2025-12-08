import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Componentes/InputFeld";
import Button from "../../Componentes/Button/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../fireBase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Passwords do not match",
          text: "Please make sure both passwords are the same.",
        });
        return;
      }

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uId = user.uid;

      // Save uid in localStorage
      localStorage.setItem("userUid", uId);

      // Save only safe data in Firestore
      await addDoc(collection(db, "users"), {
        userName,
        email,
        uId,
        createdAt: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "User registered successfully 🎉",
      }).then(() => navigate("/home"));

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.message,
      });
      console.log("Firebase Error:", error.code);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-indigo-700 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                required
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Re-enter your password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <Button 
              className="w-full px-4 py-2" 
              text="Sign Up" 
              onClick={registerUser} 
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
