export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "active" | "in progress" | "done";
export interface Task {
  id: string;
  title: string;
  createdAt: string;
  priority: TaskPriority;
  status: TaskStatus;
  describtion?: string;
  deadline?: string;
}
