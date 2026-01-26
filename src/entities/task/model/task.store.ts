import { defineStore } from "pinia";
import type { TaskPriority, Task } from "./types";
import { createId } from "~/src/shared/lib/id";
import { loadFromStorage, saveToStorage } from "~/src/shared/lib/storage";
import { ref } from "vue";

type Filter = "all" | "completed" | "active";

const STORAGE_KEY = "tasks:v1";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    filter: "all" as Filter,
  }),
  
});
