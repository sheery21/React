import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
// import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/NavBar";

const DashBasrd = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    setNotes([
      { id: 1, title: "Buy groceries", content: "Milk, Bread, Eggs" },
      { id: 2, title: "Project idea", content: "Sticky Notes app design" },
      { id: 3, title: "Call Ahmed", content: "Discuss React UI" },
    ]);
  }, []);
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
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}

          <div className="note-card add-note">
            <Button
              text="+ Add Note"
              onClick={() => alert("Add Note Clicked")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBasrd;
