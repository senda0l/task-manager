<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import { Plus } from "lucide-vue-next";
import Button from "~/shared/ui/Button.vue";
import Input from "~/shared/ui/Input.vue";
import Label from "~/shared/ui/Label.vue";
import Select from "~/shared/ui/Select.vue";
import type { Task, TaskPriority, TaskStatus } from "../model/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "~/shared/ui/dialog";

const store = useTaskStore();
const title = ref("");
const describtion = ref("");
const deadline = ref("");
const priority = ref<TaskPriority>("medium");
const status = ref<TaskStatus>("active");
const isTaskModalOpen = ref(false);

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];



const onSubmit = () => {
  if (!title.value.trim()) return;
  store.addTask({
    title: title.value,
    describtion: describtion.value,
    deadline: deadline.value,
    priority: priority.value,
    status: status.value,
  });
  title.value = "";
  describtion.value = "";
  deadline.value = "";
  priority.value = "medium";
  status.value = "active";
  isTaskModalOpen.value = false;
};
</script>

<template>
  <Dialog v-model:open="isTaskModalOpen">
    <DialogTrigger as-child>
      <Button size="default" class="gap-2">
        <Plus class="h-4 w-4" />
        Add Task
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>
          Add a new task to your list. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="onSubmit" class="space-y-4 py-4">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none" for="task-title">
            Task title
          </label>
          <Input
            id="task-title"
            v-model="title"
            placeholder="What needs to be done?"
          />
          <Label for="task-description">Task description</Label>
          <Input
            id="task-description"
            v-model="describtion"
            placeholder="Write a little description of your task"
          />

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Priority</Label>
              <Select
                v-model="priority"
                placeholder="Select priority"
                :options="priorityOptions"
              />
            </div>
            <!-- <div class="space-y-2">
              <Label>Status</Label>
              <Select
                v-model="status"
                placeholder="Select status"
                :options="statusOptions"
              />
          </div> -->
          </div>

          <div class="space-y-2">
            <Label for="task-deadline">Deadline</Label>
            <Input
              id="task-deadline"
              v-model="deadline"
              type="date"
              placeholder="Select a deadline"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="isTaskModalOpen = false"
          >
            Cancel
          </Button>
          <Button type="submit"> Save Task </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
