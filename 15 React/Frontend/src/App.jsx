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
import UserDashboard from "./pages/dashboard/userdashboard";
import BankOfficerDashboard from "./pages/dashboard/BankOfficerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import PrivateRoute from "./routers/privateRoute";
import CerateComplaint from "./components/complaints/createComplaint";
import AllComplaint from "./components/complaints/allComplaint";
import UserDashbosrdHome from "./components/userdashboard/userDashbosrdHome";
import PublicRoute from "./routers/publicRoute";
function App() {
  return (
    <>
      <Routes>
          {/* LogIn Pages */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/bank-officer-login" element={<BankOfficerLogin />} />
          {/* SignUp Pages */}
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/bank-officer-signup" element={<BankOfficerSignup />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>

        {/* OtpVerification Pages */}
        <Route path="/user-otp" element={<User_Otp />} />
        <Route path="/bankOfficer-otp" element={<BankOfficer_Otp />} />
        <Route path="/admin-otp" element={<Admin_Otp />} />

        {/* ForgetPassword Pages */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<PrivateRoute allowedRoles={["customer"]} />}>
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route index element={<UserDashbosrdHome />} />
            <Route path="create-complaint" element={<CerateComplaint />} />
            <Route path="getAll-complaint" element={<AllComplaint />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["bank_officer"]} />}>
          <Route path="/bank-dashboard" element={<BankOfficerDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["sbp_admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
