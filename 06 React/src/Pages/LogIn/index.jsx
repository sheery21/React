import React, {    useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import NavBar from "../../Componentes/NavBar";
import Input from "../../Componentes/InputFeld";
import Button from "../../Componentes/Button/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBase";
import Swal from "sweetalert2";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const logInUser = async () => {
    
    try{

      
      const userCredential = await signInWithEmailAndPassword(auth , email, password)
      let user =userCredential.user;
      
      if (user) {
        localStorage.setItem("userUid", user.uid);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: " Welcome back 🎉",
        }).then(() => navigate("/home"));
        console.log(navigator.userAgent);
      }
    }catch(error){
       Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.message, 
      });
    }
  };

  // const
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-indigo-700 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button className="w-full px-4 py-2" text="Login" onClick={logInUser} />
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signUp"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login   ;