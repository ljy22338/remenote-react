import React, { useState } from 'react';

interface NoteProps {
    note: string;
}

const Note: React.FC<NoteProps> = ({ note }) => {
    const [editing, setEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(note);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // Save the edited note
        // You can implement the save logic here, e.g., make an API call to update the note on the server

        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedNote(note);
    };

    return (
        <div>
            {editing ? (
                <div>
                    <textarea value={editedNote} onChange={(e) => setEditedNote(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{note}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default Note;