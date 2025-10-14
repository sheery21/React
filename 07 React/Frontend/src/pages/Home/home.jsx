import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import axios from "axios";

const Home = () => {
  let [task, setTodo] = useState("");
  let [theme, setTheme] = useState("black");

  const addTodo = async () => {
    console.log(task, "todo");

    try {
      
      const result = axios.post("http://localhost:5000/add", { task });
      console.log(result.data, "✅ Task Added:");
      
    } catch (error) {

      console.log(error.message);
    }
  };

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
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white outline-none"
              value={task}
              onChange={(e) => setTodo(e.target.value)}
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
          {/* {
            todo.length === 0 ? 
          } */}
          <div className="rounded-lg border border-gray-700 divide-y divide-gray-700 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-800">
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
            </div>

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
