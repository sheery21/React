import { Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import DashBasrd from "./pages/dashboard";
import AuthRoute from "./pages/Routes/AuthRoute";
import PrivateRoute from "./pages/Routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <LogIn />
            </AuthRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        {/* </Route> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBasrd />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
