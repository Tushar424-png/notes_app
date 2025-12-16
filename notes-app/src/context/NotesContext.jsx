import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotesContext = createContext();

const initialState = {
  title: "",
  text: "",
  notes: [],
  pinned: [],
  archive: [],
  error: "",
  editId: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_INPUT":
      return { ...state, [payload.name]: payload.value, error: "" };

    case "ADD_OR_UPDATE_NOTE":
      if (!state.title.trim() || !state.text.trim()) {
        return { ...state, error: "Title and text are required" };
      }

      // EDIT
      if (state.editId) {
        // Check if note is in pinned
        const isPinned = state.pinned.find((n) => n.id === state.editId);
        if (isPinned) {
          const updatedPinned = state.pinned.map((n) =>
            n.id === state.editId
              ? { ...n, title: state.title, text: state.text }
              : n
          );
          localStorage.setItem("pinned", JSON.stringify(updatedPinned));
          return { ...state, pinned: updatedPinned, title: "", text: "", editId: null };
        } else {
          const updatedNotes = state.notes.map((n) =>
            n.id === state.editId
              ? { ...n, title: state.title, text: state.text }
              : n
          );
          localStorage.setItem("notes", JSON.stringify(updatedNotes));
          return { ...state, notes: updatedNotes, title: "", text: "", editId: null };
        }
      }

      // ADD
      const newNote = { id: uuidv4(), title: state.title, text: state.text };
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes, title: "", text: "" };

    case "DELETE_NOTE": {
      const newNotes = state.notes.filter((n) => n.id !== payload);
      const newPinned = state.pinned.filter((n) => n.id !== payload);
      const newArchive = state.archive.filter((n) => n.id !== payload);

      localStorage.setItem("notes", JSON.stringify(newNotes));
      localStorage.setItem("pinned", JSON.stringify(newPinned));
      localStorage.setItem("archive", JSON.stringify(newArchive));

      return { ...state, notes: newNotes, pinned: newPinned, archive: newArchive };
    }

    case "EDIT_NOTE":
      // Check which array the note is in
      const note =
        state.notes.find((n) => n.id === payload.id) ||
        state.pinned.find((n) => n.id === payload.id) ||
        state.archive.find((n) => n.id === payload.id);

      return { ...state, title: note.title, text: note.text, editId: note.id };

    case "PIN_NOTE": {
      const noteToPin = state.notes.find((n) => n.id === payload);
      const remaining = state.notes.filter((n) => n.id !== payload);
      const updatedPinned = [...state.pinned, noteToPin];

      localStorage.setItem("notes", JSON.stringify(remaining));
      localStorage.setItem("pinned", JSON.stringify(updatedPinned));

      return { ...state, notes: remaining, pinned: updatedPinned };
    }

    case "UNPIN_NOTE": {
      const noteToUnpin = state.pinned.find((n) => n.id === payload);
      const remaining = state.pinned.filter((n) => n.id !== payload);
      const updatedNotes = [...state.notes, noteToUnpin];

      localStorage.setItem("pinned", JSON.stringify(remaining));
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      return { ...state, pinned: remaining, notes: updatedNotes };
    }

    case "ARCHIVE_NOTE": {
      // Check in notes first
      let noteToArchive = state.notes.find((n) => n.id === payload);
      let newNotes = state.notes.filter((n) => n.id !== payload);

      // If not in notes, check pinned
      if (!noteToArchive) {
        noteToArchive = state.pinned.find((n) => n.id === payload);
        const newPinned = state.pinned.filter((n) => n.id !== payload);
        localStorage.setItem("pinned", JSON.stringify(newPinned));
        return { ...state, pinned: newPinned, archive: [...state.archive, noteToArchive] };
      }

      localStorage.setItem("notes", JSON.stringify(newNotes));
      localStorage.setItem("archive", JSON.stringify([...state.archive, noteToArchive]));
      return { ...state, notes: newNotes, archive: [...state.archive, noteToArchive] };
    }

    case "UNARCHIVE_NOTE": {
      const noteToRestore = state.archive.find((n) => n.id === payload);
      const remaining = state.archive.filter((n) => n.id !== payload);
      const updatedNotes = [...state.notes, noteToRestore];

      localStorage.setItem("archive", JSON.stringify(remaining));
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      return { ...state, archive: remaining, notes: updatedNotes };
    }

    case "LOAD_ALL":
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOAD_ALL",
      payload: {
        notes: JSON.parse(localStorage.getItem("notes")) || [],
        pinned: JSON.parse(localStorage.getItem("pinned")) || [],
        archive: JSON.parse(localStorage.getItem("archive")) || [],
      },
    });
  }, []);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
