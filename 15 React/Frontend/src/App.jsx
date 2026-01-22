import { Route,  Routes } from "react-router-dom";
import "./App.css";
import {
  UserLogin,
  BankOfficerLogin,
  AdminLogin,
} from "./pages/authPages/LoginPages/userLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/bank-officer-login" element={<BankOfficerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
