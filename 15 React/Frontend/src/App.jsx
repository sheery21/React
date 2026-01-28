import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  UserLogin,
  BankOfficerLogin,
  AdminLogin,
} from "./pages/authPages/LoginPages/LoginPage";

import ForgotPassword from "./pages/authPages/ForgotPassPage/ForgotPassPage";
import LandingPage from "./pages/LandingPage/landingPage";
import {
  AdminSignup,
  BankOfficerSignup,
  UserSignup,
} from "./pages/authPages/signUpPage/SignupPage";
import {
  Admin_Otp,
  BankOfficer_Otp,
  User_Otp,
} from "./pages/authPages/otpVerifation/otpVariPage";

function App() {
  return (
    <>
      <Routes>
        {/* LogIn Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/bank-officer-login" element={<BankOfficerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* SignUp Pages */}
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/bank-officer-signup" element={<BankOfficerSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* OtpVerification Pages */}
        <Route path="/user-otp" element={<User_Otp />} />
        <Route path="/bankOfficer-otp" element={<BankOfficer_Otp />} />
        <Route path="/admin-otp" element={<Admin_Otp />} />

        {/* ForgetPassword Pages */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
