import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  UserLogin,
  BankOfficerLogin,
  AdminLogin,
} from "./pages/authPages/LoginPages/LoginPage";
import {
  AdminSignup,
  BankOfficerSignup,
  UserSignup,
} from "./pages/authPages/signUpPage/signupPage";
import ForgotPassword from "./pages/authPages/ForgotPassPage/ForgotPassPage";
import LandingPage from "./pages/LandingPage/landingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/bank-officer-login" element={<BankOfficerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/bank-officer-signup" element={<BankOfficerSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
