import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline"; // Optional: npm i @heroicons/react
import type { Task } from "../../types/kanban";

interface CardProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

export const Card = ({ task, deleteTask, updateTask }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-400 group flex justify-between items-start mb-3">
      {isEditing ? (
        <input
          autoFocus
          className="w-full outline-none border-b border-blue-500"
          value={task.content}
          onChange={(e) => updateTask(task.id, e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer w-full text-sm text-gray-700">
          {task.content}
        </div>
      )}
      <button 
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};