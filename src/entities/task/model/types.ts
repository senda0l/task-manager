export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
  priority: TaskPriority;
  describtion?: string;
  deadline?: string;
}
