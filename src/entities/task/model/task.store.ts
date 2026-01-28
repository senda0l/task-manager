import { defineStore } from "pinia";
import type { TaskPriority, Task } from "./types";
import { createId } from "~/shared/lib/id";
import { loadFromStorage, saveToStorage } from "~/shared/lib/storage";

type Filter = "all" | "completed" | "active";

const STORAGE_KEY = "tasks:v1";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    filter: "all" as Filter,
  }),
  getters: {
    filteredTasks(state) {
      if ((state.filter = "active"))
        return state.tasks.filter((t) => !t.completed);
      if ((state.filter = "completed"))
        return state.tasks.filter((t) => t.completed);
    },

    stats(state) {
      const total = state.tasks.length;
      const completed = state.tasks.filter((t) => t.completed).length;
      const active = total - completed;
      return { total, completed, active };
    },
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
      deadline?: string;
    }) {
      const title = payload.title.trim();
      if (!title) return;

      const task: Task = {
        id: createId(),
        title,
        describtion: payload.describtion?.trim() || undefined,
        createdAt: new Date().toISOString(),
        completed: false,
        priority: payload.priority ?? "medium",
        deadline: payload.deadline || undefined,
      };
      this.tasks.unshift(task);
      this.persist();
    },

    toggleTask(id: string) {
      const t = this.tasks.find((x) => x.id === id);
      if (!t) return;
      t.completed = !t.completed;
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

    setFilter(filter: Filter) {
      this.filter = filter;
    },
  },
});
