<script setup lang="ts">
import { ref, onMounted } from "vue";
import Card from "~/shared/ui/Card.vue";
import CardHeader from "~/shared/ui/CardHeader.vue";
import CardTitle from "~/shared/ui/CardTitle.vue";
import CardDescription from "~/shared/ui/CardDescription.vue";
import CardContent from "~/shared/ui/CardContent.vue";
import Label from "~/shared/ui/Label.vue";
import Input from "~/shared/ui/Input.vue";
import Button from "~/shared/ui/Button.vue";
import Switch from "~/shared/ui/Switch.vue";
import Separator from "~/shared/ui/Separator.vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import { Save, Trash2, Download, Upload, User, Bell, Palette } from "lucide-vue-next";

const store = useTaskStore();

onMounted(() => {
  store.init();
});

// Profile
const displayName = ref("User");
const email = ref("");

// Appearance
const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

const toggleDarkMode = (val: boolean) => {
  isDark.value = val;
  document.documentElement.classList.toggle("dark", val);
};

// Notifications (UI-only, not wired to backend)
const notifyOnDeadline = ref(true);
const notifyOnComplete = ref(false);

// Data Management
const exportTasks = () => {
  const data = JSON.stringify(store.tasks, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tasks-export-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const importInput = ref<HTMLInputElement | null>(null);

const importTasks = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target?.result as string);
      if (Array.isArray(imported)) {
        imported.forEach((t) => {
          store.addTask({
            title: t.title,
            describtion: t.describtion,
            priority: t.priority,
            status: t.status,
            deadline: t.deadline,
          });
        });
      }
    } catch {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
};

const clearAllTasks = () => {
  if (confirm("Are you sure you want to delete ALL tasks? This cannot be undone.")) {
    store.tasks = [];
    store.persist();
  }
};
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Settings</h1>
      <p class="text-muted-foreground">Manage your preferences and data.</p>
    </div>

    <!-- Profile -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <User class="h-5 w-5" />
          Profile
        </CardTitle>
        <CardDescription>Your display name and info.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="display-name">Display Name</Label>
          <Input id="display-name" v-model="displayName" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="you@example.com" />
        </div>
      </CardContent>
    </Card>

    <!-- Appearance -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Palette class="h-5 w-5" />
          Appearance
        </CardTitle>
        <CardDescription>Customize the look and feel.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">Dark Mode</p>
            <p class="text-xs text-muted-foreground">Toggle between light and dark theme.</p>
          </div>
          <Switch :checked="isDark" @update:checked="toggleDarkMode" />
        </div>
      </CardContent>
    </Card>

    <!-- Notifications -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Bell class="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>Configure when you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">Deadline Reminders</p>
            <p class="text-xs text-muted-foreground">Get notified before a task deadline.</p>
          </div>
          <Switch :checked="notifyOnDeadline" @update:checked="notifyOnDeadline = $event" />
        </div>
        <Separator />
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">Task Completed</p>
            <p class="text-xs text-muted-foreground">Notification when a task is marked done.</p>
          </div>
          <Switch :checked="notifyOnComplete" @update:checked="notifyOnComplete = $event" />
        </div>
      </CardContent>
    </Card>

    <!-- Data Management -->
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export, import, or clear your task data.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <Button variant="outline" @click="exportTasks">
            <Download class="h-4 w-4 mr-2" />
            Export Tasks
          </Button>
          <Button variant="outline" @click="importInput?.click()">
            <Upload class="h-4 w-4 mr-2" />
            Import Tasks
          </Button>
          <input
            ref="importInput"
            type="file"
            accept=".json"
            class="hidden"
            @change="importTasks"
          />
        </div>
        <Separator />
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-destructive">Delete All Tasks</p>
            <p class="text-xs text-muted-foreground">
              Permanently delete all {{ store.stats.total }} tasks.
            </p>
          </div>
          <Button variant="destructive" size="sm" @click="clearAllTasks">
            <Trash2 class="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
