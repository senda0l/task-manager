<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '~/entities/task/model/task.store'
import TaskForm from '~/entities/task/ui/TaskForm.vue'
import TaskList from '~/entities/task/ui/TaskList.vue'
import TaskFilters from '~/features/task-management/TaskFilters.vue'

const store = useTaskStore()

onMounted(() => {
  store.init()
})
</script>

<template>
  <main class="max-w-2xl mx-auto mt-16 px-4">
    <h1 class="text-3xl font-bold mb-6">Task Manager</h1>

    <div class="border rounded-2xl p-6 space-y-6">
      <TaskForm />
      <TaskFilters />
      <TaskList />
    </div>
  </main>
</template>
