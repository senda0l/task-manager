<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskForm from "~/entities/task/ui/TaskForm.vue";
import TaskList from "~/entities/task/ui/TaskList.vue";
import TaskFilters from "~/features/task-management/TaskFilters.vue";
import Card from "~/shared/ui/Card.vue";
import CardHeader from "~/shared/ui/CardHeader.vue";
import CardTitle from "~/shared/ui/CardTitle.vue";
import CardDescription from "~/shared/ui/CardDescription.vue";
import CardContent from "~/shared/ui/CardContent.vue";
import Separator from "~/shared/ui/Separator.vue";

const store = useTaskStore();

onMounted(() => {
  store.init();
  store.setFilter("all");
});
</script>

<template>
  <div class="space-y-6">
    <Card>
      <div class="flex items-center justify-between pr-7">
        <CardHeader>
          <CardTitle class="text-xl">All Tasks</CardTitle>
          <CardDescription>View and manage all your tasks in one place.</CardDescription>
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
