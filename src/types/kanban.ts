export type ColumnId = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  columnId: ColumnId;
  content: string;
}

export const initialTasks: Task[] = [
  { id: "1", columnId: "todo", content: "Create initial project plan" },
  { id: "2", columnId: "in-progress", content: "Implement authentication" },
  { id: "3", columnId: "done", content: "Organize project repository" },
];