import { defineStore } from "pinia";
import type { TaskPriority, Task, TaskStatus } from "./types";
import { createId } from "~/shared/lib/id";
import { loadFromStorage, saveToStorage } from "~/shared/lib/storage";
import { useApi } from "~/shared/api";

type Filter = "all" | "completed" | "active" | "in_progress" | "overdue";

const STORAGE_KEY = "tasks:v1";

function isOverdue(task: Task): boolean {
  if (task.status === "DONE") return false;
  if (!task.deadline) return false;
  return (
    new Date(task.deadline) < new Date() &&
    new Date(task.deadline) == new Date()
  );
}

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    filter: "all" as Filter,
    selectedIds: [] as string[],
    searchQuery: "",
    loading: false,
  }),
  getters: {
    filteredTasks(state) {
      let result = state.tasks;
      if (state.filter === "active")
        result = result.filter((t) => t.status === "ACTIVE");
      else if (state.filter === "completed")
        result = result.filter((t) => t.status === "DONE");
      else if (state.filter === "in_progress")
        result = result.filter((t) => t.status === "IN_PROGRESS");
      else if (state.filter === "overdue")
        result = result.filter((t) => isOverdue(t));

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLocaleLowerCase();
        result = result.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.describtion?.toLowerCase().includes(q),
        );
      }

      return result;
    },
    overdueTasks(state): Task[] {
      return state.tasks.filter((t) => isOverdue(t));
    },
    isTaskOverdue: () => (task: Task) => isOverdue(task),

    stats(state) {
      const total = state.tasks.length;
      const completed = state.tasks.filter((t) => t.status === "DONE").length;
      const active = state.tasks.filter((t) => t.status === "ACTIVE").length;
      const inProgress = state.tasks.filter(
        (t) => t.status === "IN_PROGRESS",
      ).length;
      const overdue = state.tasks.filter((t) => isOverdue(t)).length;
      return { total, completed, active, inProgress, overdue };
    },
    hasSelected: (state) => state.selectedIds.length > 0,
    selectedCount: (state) => state.selectedIds.length,
    isSelected: (state) => (id: string) => state.selectedIds.includes(id),
  },

  actions: {
    async fetchTasks() {
      const api = useApi();
      this.loading = true;
      try {
        this.tasks = await api<Task[]>("/tasks");
      } finally {
        this.loading = false;
      }
    },

    async addTask(payload: {
      title: string;
      describtion?: string;
      priority?: TaskPriority;
      status?: import("./types").TaskStatus;
      deadline?: string;
    }) {
      const api = useApi();
      const task = await api<Task>("/tasks", {
        method: "POST",
        body: payload,
      });
      this.tasks.unshift(task);
    },

    async removeTask(id: string) {
      const api = useApi();
      await api(`/tasks/${id}`, { method: "DELETE" });

      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    async updateTask(
      id: string,
      patch: Partial<Omit<Task, "id" | "createdAt">>,
    ) {
      const api = useApi();
      console.log("sending patch:", patch);
      const updated = await api<Task>(`/tasks/${id}`, {
        method: "PATCH",
        body: patch,
      });
      console.log("updated task from backend:", updated);

      const index = this.tasks.findIndex((x) => x.id === id);
      if (index != -1) this.tasks[index] = updated;
    },
    async updateTaskStatus(id: string, status: TaskStatus) {
      await this.updateTask(id, { status });
    },

    async toggleSelect(id: string) {
      const index = this.selectedIds.indexOf(id);
      if (index === -1) this.selectedIds.push(id);
      else this.selectedIds.splice(index, 1);
    },
    async bulkDelete() {
      await Promise.all(this.selectedIds.map((id) => this.removeTask(id)));
      this.selectedIds = [];
    },
    async selectAll() {
      this.selectedIds = this.tasks.map((t) => t.id);
    },
    deselectAll() {
      this.selectedIds = [];
    },

    setFilter(filter: Filter) {
      this.filter = filter;
    },
    setSearch(query: string) {
      this.searchQuery = query;
    },
  },
});
