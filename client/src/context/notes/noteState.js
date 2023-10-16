import react, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const [notes, setnotes] = useState([])

    const getNotes = async () => {
        const res = await fetch(host + "/notes/getnotes", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem('token')
            }
        })
        const user_notes = await res.json();
        setnotes(user_notes);
    }

    const addNote = async (note) => {
        const res = await fetch(host + "/notes/addnote", {
            method: 'POST',
            headers: {
                "token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        const new_note = await res.json();
        setnotes(notes.concat(new_note));
    }

    const deleteNote = async (id) => {
        const res = await fetch(host + "/notes/deletenote/" + id, {
            method: 'DELETE',
            headers: {
                "token": localStorage.getItem('token'),
            }
        })
        const deleted_note = await res.json();
        let notesAfterDeletion = notes.filter((note) => note._id !== id);
        setnotes(notesAfterDeletion);
    }

    const updateNote = async (id, title, content) => {
        const res = await fetch(host + "/notes/updatenote/" + id , {
            method: 'PUT',
            headers: {
                "token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, content})
        })
        const updated_note = await res.json();
        setnotes(notes.map((note) => note._id === id ? updated_note : note));
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;