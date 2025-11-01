import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddNotePopup = async () => {
  const { value: formValues } = await MySwal.fire({
    title: "📝 Create a New Note",
    html: `
      <input id="note-title" class="swal2-input" placeholder="Enter title" />
      <textarea id="note-content" class="swal2-textarea" placeholder="Start writing..."></textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Save Note",
    focusConfirm: false,
    preConfirm: () => {
      const title = document.getElementById("note-title").value.trim();
      const content = document.getElementById("note-content").value.trim();

      if (!title || !content) {
        Swal.showValidationMessage("Please enter both title and content!");
        return false;
      }

      return { task1: title, task2: content };
    },
  });

  return formValues; // returns {title, content} ya undefined if cancelled
};

export default AddNotePopup;
