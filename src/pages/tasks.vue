<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskForm from "~/entities/task/ui/TaskForm.vue";
import TaskList from "~/entities/task/ui/TaskList.vue";
import TaskFilters from "~/features/task-management/TaskFilters.vue";
import Card from "~/shared/ui/components/Card/index.vue";
import CardHeader from "~/shared/ui/components/CardHeader/index.vue";
import CardTitle from "~/shared/ui/components/CardTitle/index.vue";
import CardDescription from "~/shared/ui/components/CardDescription/index.vue";
import CardContent from "~/shared/ui/components/CardContent/index.vue";
import Separator from "~/shared/ui/components/Separator/index.vue";

const store = useTaskStore();


onMounted(async () => {
  await store.fetchTasks();
  store.setFilter("all");
});
</script>

<template>
  <div class="space-y-6">
    <Card>
      <div class="flex items-center justify-between pr-7">
        <CardHeader>
          <CardTitle class="text-xl">All Tasks</CardTitle>
          <CardDescription
            >View and manage all your tasks in one place.</CardDescription
          >
        </CardHeader>
        <TaskForm />
      </div>
      <CardContent class="space-y-4">
        <Separator />
        <TaskFilters />
        <Separator />
        <TaskList />
      </CardContent>
    </Card>
  </div>
</template>
