import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
// import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/NavBar";
import axios from "axios";
import AddNotePopup from "../../components/AddNotePopup/AddNotePopup";
import "./Dashboard.css";

const DashBasrd = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const CreatePost_API = "http://localhost:5000/createpost";
  const AddToDo_API = "http://localhost:5000/addTodo";
  const getToDo_API = "http://localhost:5000/getTodo";
  const DeleToDo_API = "http://localhost:5000/getTodo";

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // e.g. "10/31/2025, 11:30 AM"
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        CreatePost_API,
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message || "Post created successfully!");
      return response.data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const addTodo = async () => {
    try {
      const createTokon = await createPost();
      if (!createTokon) return;
      const task = await AddNotePopup();
      if (!task) return;
      const newTask = { ...task, createdAt: getCurrentDateTime() };
      const response = await axios.post(AddToDo_API, newTask);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong!");
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get(getToDo_API);
      const tasks = response.data.data;

      console.log("Raw Response:", response);
      console.log("All tasks:", tasks);

      if (!tasks || !Array.isArray(tasks)) return;

      const validTasks = tasks.filter((t) => t.task1 && t.task2);
      setNotes(validTasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async () => {};
  const handleDelete = async () => {
    // try {
    //   const response = await axios.delete()
    // } catch (error) {}
  };

  const handleAddNote = async () => {
    try {
      await addTodo();
      const data = await getTodo();
      console.log("New Note Added:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="notes-dashboard">
        <header className="dashboard-header">
          <h1>📒 Sticky Notes</h1>
          {user ? (
            <p className="welcome">
              Welcome, <b>{user.fullName}</b> 👋
            </p>
          ) : (
            <p className="welcome">Welcome, Guest 👋</p>
          )}
        </header>

        <div className="notes-container">
          {notes.length > 0 ? (
            notes.map((note, i) => (
              <div key={note._id || i} className="note-card">
                <div className="note-body">
                  <h3 className="note-title">{note.task1}</h3>
                  <p className="note-content">{note.task2}</p>
                </div>

                <div className="note-footer">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(note._id)}
                    title="Edit Note"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note._id)}
                    title="Delete Note"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">No notes yet — add one!</p>
          )}
        </div>

        <Button
          className="floating-add-btn"
          text="➕"
          onClick={handleAddNote}
        />
      </div>
    </>
  );
};

export default DashBasrd;
