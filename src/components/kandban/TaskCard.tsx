import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Task } from "../../types/kanban";

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

export const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    disabled: isEditing, // Disable drag while typing
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="opacity-30 bg-white p-4 h-[100px] rounded-lg border-2 border-blue-500 mb-3" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400 group mb-3 cursor-grab active:cursor-grabbing touch-none"
    >
      <div className="flex justify-between items-start">
        {isEditing ? (
          <textarea
            autoFocus
            className="w-full text-sm outline-none resize-none"
            value={task.content}
            onChange={(e) => updateTask(task.id, e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
          />
        ) : (
          <div onClick={() => setIsEditing(true)} className="text-sm text-gray-700 w-full">
            {task.content}
          </div>
        )}
        <button 
          onClick={() => deleteTask(task.id)} 
          className="text-red-400 hover:text-red-600 ml-2"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 h-2 w-8 bg-gray-200 rounded-full" />
    </div>
  );
};