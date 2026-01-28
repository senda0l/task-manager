<script setup lang="ts">
import { useTaskStore } from '~/entities/task/model/task.store'
import TaskItem from './TaskItem.vue'

const store = useTaskStore()
</script>

<template>
  <div class="list">
    <TaskItem v-for="t in store.filteredTasks" :key="t.id" :task="t" />
    <p v-if="store.filteredTasks?.length === 0" class="empty">No tasks</p>
  </div>
</template>

<style scoped>
.list { display:flex; flex-direction:column; gap:10px; }
.empty { opacity:.6; padding:8px 2px; }
</style>
