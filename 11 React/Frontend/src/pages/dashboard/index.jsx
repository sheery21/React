import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Navbar from "../../components/NavBar";
import axios from "axios";
import AddNotePopup from "../../components/AddNotePopup/AddNotePopup";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashBasrd = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const CreatePost_API = "http://localhost:5000/createpost";
  const AddToDo_API = "http://localhost:5000/addTodo";
  const getToDo_API = "http://localhost:5000/getTodo";
  const updateToDo_API = "http://localhost:5000/updateTodo/";
  const oneToDoDelete_API = "http://localhost:5000/deleteTodo/";
  const deleteAllToDo_API = "http://localhost:5000/deleteAllTodo";

  // ✅ Check user token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  }, [navigate]);

  // ✅ Load user info
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch notes from server on mount
  useEffect(() => {
    const fetchNotes = async () => {
      await getTodo();
    };
    fetchNotes();
  }, []);

  // ✅ Save notes to localStorage whenever they change (optional)
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Get current date/time
  const getCurrentDateTime = () => new Date().toLocaleString();

  // Create a post (dummy API call)
  const createPost = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        CreatePost_API,
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message || "Post created successfully!");
      return response.data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  // Add a new note
  const addTodo = async () => {
    try {
      const createToken = await createPost();
      if (!createToken) return;

      const task = await AddNotePopup(); // get input from popup
      if (!task) return;

      const newTask = { ...task, createdAt: getCurrentDateTime() };
      const response = await axios.post(AddToDo_API, newTask);
      console.log("Added Task:", response.data);

      return response.data;
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong!");
    }
  };

  // Fetch all notes from server
  const getTodo = async () => {
    try {
      const response = await axios.get(getToDo_API);
      const tasks = response.data.data;

      if (!tasks || !Array.isArray(tasks)) return;

      const validTasks = tasks.filter((t) => t.task1 && t.task2);
      setNotes(validTasks);

      // Optional: save to localStorage
      localStorage.setItem("notes", JSON.stringify(validTasks));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add note handler
  const handleAddNote = async () => {
    try {
      await addTodo(); // add note via API
      await getTodo(); // refresh notes
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Something went wrong!");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "All notes will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete all!",
      });

      if (!confirm.isConfirmed) return;

      const response = await axios.delete(deleteAllToDo_API);

      if (response.data.status) {
        Swal.fire("Deleted!", "All notes have been deleted.", "success");
        setNotes([]); // clear UI
      } else {
        Swal.fire(
          "Oops!",
          response.data.message || "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
      console.log("❌ Delete all error:", error.message);
      Swal.fire("Error!", "Failed to delete all notes.", "error");
    }
  };

  // Edit / Delete placeholders
  const handleEdit = async (id, oldTask1, oldTask2) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit your note ✏️",
      html: `
      <input id="task1" class="swal2-input" placeholder="Enter Title" value="${oldTask1}">
      <input id="task2" class="swal2-input" placeholder="Enter Description" value="${oldTask2}">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const task1 = document.getElementById("task1").value.trim();
        const task2 = document.getElementById("task2").value.trim();

        if (!task1 || !task2) {
          Swal.showValidationMessage("Both fields are required!");
          return false;
        }

        return { task1, task2 };
      },
    });

    if (!formValues) return;

    try {
      await axios.put(`${updateToDo_API}${id}`, formValues);
      Swal.fire(
        "✅ Updated!",
        "Your note has been updated successfully.",
        "success"
      );
      getTodo();
    } catch (error) {
      console.log("❌ Edit error:", error.message);
      Swal.fire(
        "Error!",
        "Something went wrong while updating the note.",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This note will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirm.isConfirmed) return;

      const response = await axios.delete(`${oneToDoDelete_API}${id}`);

      if (response.data.status) {
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
        getTodo(); // refresh the list
      } else {
        Swal.fire(
          "Oops!",
          response.data.message || "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
      console.log("❌ Delete error:", error.message);
      Swal.fire("Error!", "Failed to delete note.", "error");
    }
  };

  // Format date for UI
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

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
                  <span className="note-date">
                    🕒 {formatDate(note.createdAt)}
                  </span>
                  <div className="note-actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(note._id, note.task1, note.task2)
                      }
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
              </div>
            ))
          ) : (
            <p className="empty">No notes yet — add one!</p>
          )}
        </div>
        <Button
          className="floating-delete-btn"
          text="🗑️ Delete All"
          onClick={handleDeleteAll}
        />

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
