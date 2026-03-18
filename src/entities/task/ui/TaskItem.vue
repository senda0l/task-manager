<script setup lang="ts">
import type { Task, TaskStatus } from "~/entities/task/model/types";
import { useTaskStore } from "~/entities/task/model/task.store";
import { Trash2 } from "lucide-vue-next";
import { Checkbox } from "~/shared/ui";
import { Button } from "~/shared/ui";
import { Badge } from "~/shared/ui";
import { Select } from "~/shared/ui";
import { cn } from "~/shared/lib/utils";

const props = defineProps<{ task: Task }>();
const store = useTaskStore();
const status = ref<TaskStatus>(props.task.status);
const priorityVariant = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "destructive";
    case "MEDIUM":
      return "default";
    case "LOW":
      return "secondary";
    default:
      return "outline";
  }
};

const formatDeadline = (deadline: string) => {
  return new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

watch(
  () => props.task.status,
  (newStatus) => {
    status.value = newStatus;
  },
);

watch(status, async (newStatus) => {
  if (newStatus !== props.task.status) {
    await store.updateTaskStatus(props.task.id, newStatus as TaskStatus);
  }
});

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];
</script>

<template>
  <div
    :class="
      cn(
        'group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50',
        task.status === 'DONE' && 'opacity-60',
        store.isTaskOverdue(task) &&
          'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30',
        store.isSelected(task.id) && 'border-primary bg-primary/5',
      )
    "
  >
    <Checkbox
      :checked="store.isSelected(task.id)"
      @update:checked="store.toggleSelect(task.id)"
    />

    <div class="flex-1 min-w-0">
      <p
        :class="
          cn(
            'text-sm font-medium leading-none truncate',
            task.status === 'DONE' && 'line-through text-muted-foreground',
          )
        "
      >
        {{ task.title }}
      </p>
      <p
        v-if="task.describtion"
        class="text-xs text-muted-foreground mt-1 truncate"
      >
        {{ task.describtion }}
      </p>
    </div>
    <div>
      <p
        v-if="task.deadline"
        :class="
          cn(
            'text-xs truncate',
            store.isTaskOverdue(task)
              ? 'text-red-500 font-medium'
              : 'text-muted-foreground',
          )
        "
      >
        Deadline: {{ formatDeadline(task.deadline) }}
      </p>
    </div>

    <Badge
      :variant="priorityVariant(task.priority) as any"
      class="shrink-0 text-[10px] h-5"
    >
      {{ task.priority }}
    </Badge>
    <!-- <Badge
      :variant="statusVariant(task.status) as any"
      class="shrink-0 text-[10px] h-5"
    >
      {{ task.status }}
    </Badge> -->
    <Select
      v-model="status"
      placeholder="Select status"
      :options="statusOptions"
      class="w-[130px]"
    />

    <Button
      variant="ghost"
      size="icon"
      class="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      @click="store.removeTask(task.id)"
    >
      <Trash2 class="h-4 w-4" />
    </Button>
  </div>
</template>
