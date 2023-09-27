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

    const [notes, setnotes] = useState(notesStart)
    return (
        <noteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;