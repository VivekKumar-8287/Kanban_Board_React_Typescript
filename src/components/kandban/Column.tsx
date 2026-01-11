import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { ColumnId, Task } from "../../types/kanban";

interface Props {
  id: ColumnId;
  title: string;
  tasks: Task[];
  addTask: (id: ColumnId) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
  headerColor: string;
}

export const Column = ({ id, title, tasks, addTask, deleteTask, updateTask, headerColor }: Props) => {
  // Define the droppable area and pass the metadata
  const { setNodeRef } = useDroppable({ 
    id: id,
    data: {
      type: "Column",
      columnId: id,
    },
  });

  return (
    // We apply the ref here so the entire column area is sensitive to dragging
    <div 
      ref={setNodeRef} 
      className="flex flex-col w-full min-h-[500px] bg-[#ebedf0] rounded-lg shadow-sm"
    >
      {/* Header - Styled to match image */}
      <div className={`${headerColor} p-4 rounded-t-lg flex justify-between items-center text-white font-bold`}>
        <div className="flex items-center gap-2">
          <span className="text-lg uppercase tracking-wide">{title}</span>
          <span className="bg-white/30 px-2 py-0.5 rounded text-xs font-normal">
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={() => addTask(id)} 
          className="hover:bg-white/20 p-1 rounded transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Add Card Button */}
      <div className="p-3">
        <button 
          onClick={() => addTask(id)}
          className="w-full p-2 bg-white border border-gray-200 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-start gap-2 shadow-sm"
        >
          <PlusIcon className="h-4 w-4" /> Add Card
        </button>
      </div>

      {/* Droppable Area / Task List */}
      <div className="flex-grow px-3 pb-3">
        <SortableContext 
          items={tasks.map(t => t.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask} 
                updateTask={updateTask} 
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};