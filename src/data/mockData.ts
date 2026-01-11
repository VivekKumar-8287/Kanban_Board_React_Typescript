import type { Task } from "../types/kanban";

export const initialTasks: Task[] = [
  { id: "1", columnId: "todo", content: "Create initial project plan" },
  { id: "2", columnId: "todo", content: "Design landing page" },
  { id: "3", columnId: "todo", content: "Review codebase structure" },
  { id: "4", columnId: "in-progress", content: "Implement authentication" },
  { id: "5", columnId: "in-progress", content: "Set up database schema" },
  { id: "6", columnId: "done", content: "Organize project repository" },
];