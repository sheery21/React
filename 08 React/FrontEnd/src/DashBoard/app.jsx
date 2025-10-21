import Input from "../components/Input/app.jsx";
import Button from "../components/Button/app.jsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = "http://localhost:5000";

const DashBoard = () => {
  let [theme, setTheme] = useState("black");
  let [task, setTask] = useState("");
  let [filter, setFilter] = useState("all")
  let [todo , setTodo] = useState('')
  const isDark = theme === "black";

  useEffect(() => {
    getTodo();
  }, []);

  const filteredTods = ((t) =>{
   if(filter === "active") return !t.ccompleted
   if(filter === "completed") return t.ccompleted
  })

  let activeCount = todo.filter((t) => !t.ccompleted )
  let completedCount = todo.filter((t) => t.ccompleted )


  const addtodo = async () => {
    if (task.trim().length < 5) {
      Swal.fire({
        title: "Too Short!",
        text: "Task must be at least 5 characters long.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      await axios.post(`${API_URL}/addTodo`, { task });
      setTask("");
      getTodo();
    } catch (error) {
      console.log(error.massage);
    }
  };

  const getTodo = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/geTodo`);
  //     console.log('response', response.data); 
  //     setTodo(response.data)
  //   } catch (error) {
  //     console.log(error.massage);
  //   }
  };
  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`w-full max-w-2xl rounded-2xl shadow-xl p-5 sm:p-6 border transition-all duration-500 ${
            isDark
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          {/* Header */}
          <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
            <h1
              className={`text-3xl font-extrabold text-center sm:text-left tracking-tight transition ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              ToDoApp
            </h1>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                className={`px-3 py-1 rounded-full border font-medium transition-all duration-300 ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-200 border-white"
                    : "bg-black text-white hover:bg-gray-800 border-black"
                }`}
                onClick={() => setTheme(isDark ? "white" : "black")}
                text={isDark ? "White" : "Black"}
              />
            </div>
          </header>

          {/* Input Field */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Input
              type="text"
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 rounded-lg outline-none text-sm sm:text-base ${
                isDark
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-white"
                  : "bg-white border border-gray-300 text-black"
              }`}
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              className={`px-5 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              onClick={addtodo}
              text="Add"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-xs sm:text-sm gap-2 sm:gap-0">
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            {['all' , 'active' , 'completed'].map((type) =>{
              <Button
              key={type}
              className={`transition${ filter === type ? "underline" :"opacity-70 hover:underline"}`}
              onClick={() =>}
              />
            })}
          </div>
          <div className="text-gray-400 text-center sm:text-right">
            {'activeCount'} active • {'completedCount'} done
          </div>
        </div>

          {/* Todo List */}
          {/* <div className="space-y-2 max-h-[320px] sm:max-h-[400px] overflow-y-auto pr-1">
          {filteredTods.map((value, index) => (
            <div
              key={value._id || index}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-4 py-3 rounded-lg ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                  checked={value.completed}
                  onChange={() => toggleTodo(value._id)}
                />
                <span
                  className={`break-words ${
                    value.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {value.task}
                </span>
              </div>

              <div className="flex gap-2 self-end sm:self-auto">
                <Button
                  className={`text-xs sm:text-sm px-2 py-1 rounded transition ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
                  }`}
                  text="Edit"
                  onClick={() => editTodo(value._id, value.task)}
                />
                <Button
                  className={`text-xs sm:text-sm px-2 py-1 rounded transition ${
                    isDark ? "hover:bg-red-700" : "hover:bg-red-500 text-white"
                  }`}
                  text="Delete"
                  onClick={() => deleteTodo(value._id)}
                />
              </div>
            </div>
          ))}
        </div> */}

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row justify-between items-center mt-5 text-xs sm:text-sm gap-2 sm:gap-0">
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              <Button
                className={`px-3 py-1 rounded border ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-400 hover:bg-gray-200"
                }`}
                text="Clear All"
              />
              <Button
                className={`px-3 py-1 rounded border ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-400 hover:bg-gray-200"
                }`}
                text="Clear Completed"
              />
            </div>
            <span className="text-gray-400 text-center sm:text-right">
              Total: totalCount
            </span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
