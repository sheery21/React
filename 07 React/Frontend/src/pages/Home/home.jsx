import React, { useEffect, useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Home = () => {
  let [task, setTask] = useState("");
  let [theme, setTheme] = useState("black");
  let [todo, setTodo] = useState([]);
  let [loading , setLoading]  = useState(true)
  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async () => {
    console.log(task, "todo");
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
      const result = await axios.post(`${API_URL}/addTodo`, { task });
      console.log(result.data, "✅ Task Added:");

      setTask("");
      getTodo();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get(`${API_URL}/getTodo`);
      console.log(response.data, "📦 All Todos from backend");
      setTodo(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false)
    }
  };

  const updateTodo = async() =>{
    
  }

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center bg-black text-white p-6 ${
          theme === "black" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">ToDoApp</h1>
            <div className="flex items-center gap-2">
              <Button
                className="px-3 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
                onClick={() => setTheme("black")}
                text="Black"
              />
              <Button
                className="px-3 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
                onClick={() => setTheme("White")}
                text="White"
              />
            </div>
          </header>

          <div className="flex gap-3 mb-4">
            <Input
              type="text"
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 rounded-lg outline-none ${
                theme === "black"
                  ? "bg-gray-800 border border-gray-700 placeholder-gray-400 text-white"
                  : "bg-white border border-gray-300 text-black"
              }`}
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              className="px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
              onClick={addTodo}
              text="Add"
            />
          </div>

          <div className="flex justify-between items-center mb-4 text-sm">
            <div className="flex gap-3">
              <button className="underline">All</button>
              <button className="opacity-80 hover:underline">Active</button>
              <button className="opacity-80 hover:underline">Completed</button>
            </div>
            <div className="text-gray-400">2 active • 3 done</div>
          </div>

          {/* Todo List */}

          <div className="rounded-lg border border-gray-700 divide-y divide-gray-700 overflow-hidden">
            { loading ?(
               <p className="text-gray-400">⏳ Loading tasks...</p>
            ): todo.length === 0 ? (
              <p className="text-center py-4 text-gray-400">No tasks yet 😴</p>
            ) : (
              todo.map((value, index) => {
                return(
                <div
                  key={value._id || index}
                  className="flex justify-between items-center px-4 py-3 bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={value.completed}
                      readOnly
                    />
                    <span
                      className={
                        value.completed ? "line-through opacity-60" : ""
                      }
                    >
                      {value.task}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm px-2 py-1 rounded hover:bg-gray-700">
                      Edit
                    </button>
                    <button className="text-sm px-2 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
            )
              })
            )}
            {/* <div className="flex justify-between items-center px-4 py-3 bg-gray-800">
              <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <span>Learn React</span>
              </div>
              <div className="flex gap-2">
              <button className="text-sm px-2 py-1 rounded hover:bg-gray-700">
              Edit
              </button>
              <button className="text-sm px-2 py-1 rounded hover:bg-red-700">
              Delete
              </button>
              </div>
              </div> */}

            {/* <div className="flex justify-between items-center px-4 py-3 bg-gray-800">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="line-through opacity-60">Build ToDo App</span>
            </div>
            <div className="flex gap-2">
              <button className="text-sm px-2 py-1 rounded hover:bg-gray-700">Edit</button>
              <button className="text-sm px-2 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          </div> */}

            {/* <div className="flex justify-between items-center px-4 py-3 bg-gray-800">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <span>Study TailwindCSS</span>
            </div>
            <div className="flex gap-2">
              <button className="text-sm px-2 py-1 rounded hover:bg-gray-700">Edit</button>
              <button className="text-sm px-2 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          </div> */}
          </div>

          {/* Footer */}
          <footer className="flex justify-between mt-5 text-sm">
            <div className="flex gap-3">
              <button className="px-3 py-1 rounded border border-gray-700 hover:bg-gray-800">
                Clear All
              </button>
              <button className="px-3 py-1 rounded border border-gray-700 hover:bg-gray-800">
                Clear Completed
              </button>
            </div>
            <span className="text-gray-400">Total: 5</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
