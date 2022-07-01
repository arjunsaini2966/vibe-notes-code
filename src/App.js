import React from "react";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import { nanoid } from "nanoid";
import Split from "react-split";
import Main from "./component/Main";

function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );
  function createNewNote() {
    const newNote = {
      id: nanoid(7),
      body: "#Vibe Note, Let's write your note here",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);

    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const newNotesArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const letestNote = oldNotes[i];
        if (letestNote.id === currentNoteId) {
          newNotesArray.unshift({ letestNote, body: text });
        } else {
          newNotesArray.push(oldNotes);
        }
        return newNotesArray;
      }
    });
  }
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  function fDeleteNote(text) {
    const newarray = notes.filter((note) => {
      return note.id !== currentNoteId;
    });
    return newarray;
  }

  return (
    <div>
      <Header />

      {notes.length > 0 ? (
        <Split size={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={fDeleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Main currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
