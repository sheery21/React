// src/pages/UserLogin.jsx
import LoginForm from "../../../components/auth/LoginForm";

export const UserLogin = () => <LoginForm role="User" />;

export const BankOfficerLogin = () => <LoginForm role="Bank Officer" />;

export const AdminLogin = () => <LoginForm role="Admin" />;
