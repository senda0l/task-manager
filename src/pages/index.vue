<script setup lang="ts">
import { useTaskStore } from "../entities/task/model/task.store";
import { onMounted } from "vue";
import TaskList from "../entities/task/ui/TaskList.vue";
import TaskFilters from "../features/task-management/TaskFilters.vue";
import TaskForm from "../entities/task/ui/TaskForm.vue";

const store = useTaskStore();

onMounted(() => {
  store.init();
});
</script>
<template>
  <main>
    <h1>Task Manager</h1>

    <section>
      <TaskForm />
      <TaskFilters />
      <TaskList />
    </section>
  </main>
</template>
