import { defineStore } from "pinia";
import type { TaskPriority, Task, TaskStatus } from "./types";
import { createId } from "~/shared/lib/id";
import { loadFromStorage, saveToStorage } from "~/shared/lib/storage";

type Filter = "all" | "completed" | "active" | "in_progress";

const STORAGE_KEY = "tasks:v1";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    filter: "all" as Filter,
    selectedIds: [] as string[],
  }),
  getters: {
    filteredTasks(state) {
      if (state.filter === "active")
        return state.tasks.filter((t) => t.status === "active");
      if (state.filter === "completed")
        return state.tasks.filter((t) => t.status === "done");
      if (state.filter === "in_progress")
        return state.tasks.filter((t) => t.status === "in progress");
      return state.tasks;
    },

    stats(state) {
      const total = state.tasks.length;
      const completed = state.tasks.filter((t) => t.status === "done").length;
      const active = state.tasks.filter((t) => t.status === "active").length;
      const inProgress = state.tasks.filter((t) => t.status === "in progress").length;
      return { total, completed, active, inProgress };
    },
    hasSelected: (state) => state.selectedIds.length > 0,
    selectedCount: (state) => state.selectedIds.length,
    isSelected: (state) => (id: string) => state.selectedIds.includes(id),
  },

  actions: {
    init() {
      this.tasks = loadFromStorage<Task[]>(STORAGE_KEY, []);
    },
    persist() {
      saveToStorage(STORAGE_KEY, this.tasks);
    },

    addTask(payload: {
      title: string;
      describtion?: string;
      priority?: TaskPriority;
      status?: import("./types").TaskStatus;
      deadline?: string;
    }) {
      const title = payload.title.trim();
      if (!title) return;

      const task: Task = {
        id: createId(),
        title,
        describtion: payload.describtion?.trim() || undefined,
        createdAt: new Date().toISOString(),
        priority: payload.priority ?? "medium",
        status: payload.status ?? "active",
        deadline: payload.deadline || undefined,
      };
      this.tasks.unshift(task);
      this.persist();
    },

    toggleTask(id: string) {
      const t = this.tasks.find((x) => x.id === id);
      if (!t) return;
      t.status = "active";
      this.persist();
    },

    removeTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.persist();
    },

    updateTask(id: string, patch: Partial<Omit<Task, "id" | "createdAt">>) {
      const t = this.tasks.find((x) => x.id === id);
      if (!t) return;
      Object.assign(t, patch);
      this.persist();
    },
    updateTaskStatus(id: string, status: TaskStatus) {
      const task = this.tasks.find((x) => x.id === id);
      if (task) {
        task.status = status;
        this.persist();
      }
    },

    toggleSelect(id: string) {
      const index = this.selectedIds.indexOf(id);
      if (index === -1) {
        this.selectedIds.push(id);
      } else {
        this.selectedIds.splice(index, 1);
      }
    },
    selectAll() {
      this.selectedIds = this.tasks.map((t) => t.id);
    },
    deselectAll() {
      this.selectedIds = [];
    },
    bulkDelete() {
      this.tasks = this.tasks.filter((t) => !this.selectedIds.includes(t.id));
      this.selectedIds = [];
      this.persist();
    },

    setFilter(filter: Filter) {
      this.filter = filter;
    },
  },
});
