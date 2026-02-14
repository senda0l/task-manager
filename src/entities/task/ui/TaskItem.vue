<script setup lang="ts">
import type { Task, TaskStatus } from "~/entities/task/model/types";
import { useTaskStore } from "~/entities/task/model/task.store";
import { Newspaper, Trash2 } from "lucide-vue-next";
import Checkbox from "~/shared/ui/Checkbox.vue";
import Button from "~/shared/ui/Button.vue";
import Badge from "~/shared/ui/Badge.vue";
import Select from "~/shared/ui/Select.vue";
import { cn } from "~/shared/lib/utils";

const props = defineProps<{ task: Task }>();
const store = useTaskStore();
const status = ref<TaskStatus>(props.task.status);
const priorityVariant = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
};

watch(
  () => props.task.status,
  (newStatus) => {
    status.value = newStatus;
  },
);

watch(status, (newStatus) => {
  if (newStatus !== props.task.status) {
    store.updateTaskStatus(props.task.id, newStatus as TaskStatus);
  }
});

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "In Progress", value: "in progress" },
  { label: "Done", value: "done" },
];


</script>

<template>
  <div
    :class="
      cn(
        'group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50',
        task.status === 'active' && 'opacity-60',
        store.isSelected(task.id) && 'border-primary bg-primary/5',
      )
    "
  >
    <Checkbox
    :checked="store.isSelected(task.id)"
    @update:checked="store.toggleSelect(task.id)" />

    <div class="flex-1 min-w-0">
      <p
        :class="
          cn(
            'text-sm font-medium leading-none truncate',
            task.status === 'done' && 'line-through text-muted-foreground',
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
        class="text-xs text-muted-foreground mt-1 truncate"
      >
        Deadline: {{ task.deadline }}
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
