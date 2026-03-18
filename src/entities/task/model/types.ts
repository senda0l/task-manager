export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "ACTIVE" | "IN_PROGRESS" | "DONE";
export interface Task {
  id: string;
  title: string;
  createdAt: string;
  priority: TaskPriority;
  status: TaskStatus;
  describtion?: string;
  deadline?: string;
}
