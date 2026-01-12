import { useState } from "react";
import { 
  DndContext, 
  type DragOverEvent, 
  type DragStartEvent,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors 
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { Column } from "./Column";
import { TaskCard } from "./TaskCard"; // Import TaskCard for the Overlay
import type { ColumnId, Task } from "../../types/kanban";
import { initialTasks } from "../../data/mockData";

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Configuration for sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // --- Handlers ---

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a Task over a Column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId as ColumnId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  const addTask = (columnId: ColumnId) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      columnId,
      content: "New Task",
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, content: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <Column
            title="Todo"
            id="todo"
            tasks={tasks.filter((t) => t.columnId === "todo")}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            headerColor="bg-[#007bff]"
          />
          <Column
            title="In Progress"
            id="in-progress"
            tasks={tasks.filter((t) => t.columnId === "in-progress")}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            headerColor="bg-[#ff9800]"
          />
          <Column
            title="Done"
            id="done"
            tasks={tasks.filter((t) => t.columnId === "done")}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            headerColor="bg-[#00c853]"
          />
        </div>

        {/* The Overlay displays the card "stuck" to the mouse cursor */}
        <DragOverlay>
          {activeTask ? (
            <div className="scale-105 opacity-90 shadow-2xl">
              <TaskCard
                task={activeTask}
                deleteTask={() => {}}
                updateTask={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};