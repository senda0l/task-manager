<script setup lang="ts">
import { Search, Bell, User, Sun, Moon } from "lucide-vue-next";
import Button from "~/shared/ui/Button.vue";
import Input from "~/shared/ui/Input.vue";
import Separator from "~/shared/ui/Separator.vue";
import { ref, computed } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
const store = useTaskStore();
const route = useRoute();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const pageTitles: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Overview of your tasks and productivity",
  },
  "/tasks": {
    title: "All Tasks",
    description: "View and manage all your tasks",
  },
  "/completed": { title: "Completed", description: "Tasks you have finished" },
  "/in-progress": {
    title: "In Progress",
    description: "Tasks you are working on",
  },
  "/analytics": {
    title: "Analytics",
    description: "Task performance and insights",
  },
  "/settings": { title: "Settings", description: "Manage your preferences" },
};

const currentPage = computed(() => {
  return (
    pageTitles[route.path] ?? {
      title: "Task Manager",
      description: "Manage and organize your tasks",
    }
  );
});
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6"
  >
    <!-- Page Title -->
    <div class="flex-1">
      <h2 class="text-lg font-semibold tracking-tight">
        {{ currentPage.title }}
      </h2>
      <p class="text-xs text-muted-foreground">{{ currentPage.description }}</p>
    </div>

    <!-- Search -->
    <div class="relative hidden md:flex items-center">
      <Search class="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        :model-value="store.searchQuery"
        @input="store.setSearch($event.target.value)"
        placeholder="Search tasks..."
        class="w-64 pl-8 h-9"
      />
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <Button variant="ghost" size="icon" class="h-9 w-9" @click="toggleTheme">
        <Sun v-if="!isDark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" class="h-9 w-9 relative">
        <Bell class="h-4 w-4" />
        <span
          class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"
        ></span>
      </Button>
      <Separator orientation="vertical" class="h-6 mx-1" />
      <Button variant="ghost" size="sm" class="gap-2">
        <div
          class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium"
        >
          U
        </div>
        <span class="hidden md:inline-block text-sm">User</span>
      </Button>
    </div>
  </header>
</template>
