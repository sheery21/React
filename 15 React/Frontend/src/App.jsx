import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/authPages/LoginPages/userLogin";
import BankOfficerLogin from "./pages/authPages/LoginPages/bankOfficreLogin";
import AdminLogin from "./pages/authPages/LoginPages/adminLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/bank-officer-login" element={<BankOfficerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
