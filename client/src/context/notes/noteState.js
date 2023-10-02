import react, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesStart = [
        {
            "_id": "650b4432cde96121ba2b1914",
            "user": "65097c0002a55400bf0e3ae6",
            "title": "test title",
            "content": "testing the description",
            "createdAt": "2023-09-20T19:09:19.150Z",
            "__v": 0
        },
        {
            "_id": "651470ab0599195c56bafe61",
            "user": "65097c0002a55400bf0e3ae6",
            "title": "test title 13",
            "content": "testing the description 13",
            "createdAt": "2023-09-27T18:12:24.766Z",
            "__v": 0
        },
        {
            "_id": "650b4432cde96121ba2b1914",
            "user": "65097c0002a55400bf0e3ae6",
            "title": "test title",
            "content": "testing the description",
            "createdAt": "2023-09-20T19:09:19.150Z",
            "__v": 0
        },
        {
            "_id": "651470ab0599195c56bafe61",
            "user": "65097c0002a55400bf0e3ae6",
            "title": "test title 13",
            "content": "testing the description 13",
            "createdAt": "2023-09-27T18:12:24.766Z",
            "__v": 0
        }
    ]

    const host = "http://localhost:5000";

    const [notes, setnotes] = useState(notesStart)

    const getNotes = async () => {
        const res = await fetch(host + "/notes/getnotes", {
            method: 'GET',
            headers: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyVXNlciI6eyJpZCI6IjY1MDk3YzAwMDJhNTU0MDBiZjBlM2FlNiJ9LCJpYXQiOjE2OTUyMjIxMDZ9.UB13b_GizafpQx8BN9gdCMM7b862EbG3oRBbFATSBh4"
            }
        })
        const user_notes = await res.json();
        setnotes(user_notes);
    }

    const addNote = (title, content) => {
        let note = {
            "_id": "651470ab0599195c56bafe61",
            "user": "65097c0002a55400bf0e3ae6",
            "title": "test title 13 added",
            "content": "testing the description 13",
            "createdAt": "2023-09-27T18:12:24.766Z",
            "__v": 0
        }
        setnotes(notes.concat(note));
    }

    const deleteNote = (id) => {
        console.log("deleting note wth id " + id);
        let notesAfterDeletion = notes.filter((note) => note._id !== id);
        setnotes(notesAfterDeletion);
    }

    const updateNote = (id, title, content) => {
        console.log("Updating note wth id " + id);
        setnotes(notes.map((note) => note._id === id ? {...note, title: title, content: content} : note));
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;