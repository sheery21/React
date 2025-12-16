// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/Home";
// import { addTodo, removeTodo } from "./redux/slices/counterSlice";

function App() {
  // const [counter , setCounter] = useState(0)
  // const dispatch = useDispatch();

  // const {counterVelue} = useSelector((store) => store.counterReducer)

  //   console.log("selector", counterVelue);

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>} />  
      <Route path="/singnUp" element={<SignupPage/>} />  
      <Route path="/HomePage" element={<HomePage/>} />  
    </Routes>

      {/* <h1>hello {counterVelue}</h1>
      <button onClick={() => dispatch(addTodo({ name: "jaffar" }))}>
        Add Me
      </button>
      <button onClick={() => dispatch( removeTodo({ name: "jaffar" }))}>
        Minus Me
      </button> */}
    </>
  );
}

export default App;