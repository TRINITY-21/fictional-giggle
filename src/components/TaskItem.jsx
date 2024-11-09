import { CheckCircle, Edit3, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, removeTask, toggleComp } from '../store/reducer';

const TaskBox = ({ task, isFirst }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const toggleComplete = (id) => {
    dispatch(toggleComp(id));
  };

  const handleDelete = (id) => {
    dispatch(removeTask(id));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    dispatch(editTask({ id: task.id, updatedTask: editedTaskName, updatedDescription: editedDescription }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTaskName(task.taskName);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-1 gap-4 p-4 sm:p-6 m-3 rounded-lg shadow-md transition-all duration-300 ease-in-out 
        ${task.completed ? 'bg-green-50 text-green-700' : 'bg-white text-gray-800'} 
        hover:shadow-lg hover:scale-105 hover:bg-indigo-100
        w-full max-w-[650px] mx-auto ${isFirst ? 'border-2 border-indigo-500' : ''}`} // Highlight first item
    >
      {/* Checkbox */}
      <label className="flex-shrink-0 justify-center sm:justify-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="hidden peer"
        />
        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer relative peer-checked:bg-green-600 peer-checked:text-white peer-checked:after:content-['✓'] after:hidden after:text-xs after:absolute after:inset-0 after:flex after:items-center after:justify-center transition-all"></span>
      </label>

      {/* Title Section */}
      <div className="col-span-2">
        {isEditing ? (
          <textarea
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
            rows={1}
            className="w-full text-lg sm:text-2xl font-semibold bg-transparent border-b-2 border-gray-300 focus:outline-none resize-none px-2"
          />
        ) : (
          <h1
            className={`text-lg sm:text-2xl font-semibold break-words ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.taskName}
          </h1>
        )}
      </div>

      {/* Description Section */}
      <div className="col-span-2 mt-4">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-3 bg-transparent border-2 border-gray-300 focus:outline-none resize-none rounded-md text-sm sm:text-base"
            rows={3}
          />
        ) : (
          <p className="text-sm sm:text-base font-light text-gray-600 break-words whitespace-pre-wrap">
            {task.description}
          </p>
        )}
      </div>

      {/* Timestamp Section */}
      {task.completed && task.completedAt && (
        <div className="col-span-2 mt-4 text-xs sm:text-sm text-gray-500 text-right">
          Completed on: {new Date(task.completedAt).toLocaleString()}
        </div>
      )}

      {/* Action Icons*/}
      <div className="col-span-2 flex justify-start sm:justify-end gap-2 flex-col sm:flex-row items-center mt-4 sm:mt-0">
        {isEditing ? (
          <>
            <CheckCircle onClick={handleSave} className="w-6 sm:w-7 h-6 sm:h-7 cursor-pointer text-green-500 hover:text-green-600 transition-transform duration-300 transform hover:scale-110" />
            <XCircle onClick={handleCancel} className="w-6 sm:w-7 h-6 sm:h-7 cursor-pointer text-red-500 hover:text-red-600 transition-transform duration-300 transform hover:scale-110" />
          </>
        ) : (
          <>
            <Edit3 onClick={handleEditToggle} className="w-6 sm:w-7 h-6 sm:h-7 cursor-pointer text-blue-500 hover:text-blue-600 transition-transform duration-300 transform hover:scale-110" />
            <Trash2 onClick={() => handleDelete(task.id)} className="w-6 sm:w-7 h-6 sm:h-7 cursor-pointer text-red-500 hover:text-red-600 transition-transform duration-300 transform hover:scale-110" />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskBox;
