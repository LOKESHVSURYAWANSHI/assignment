import React, { useState } from "react";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task._id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Task description"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-lg">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
