<script setup lang="ts">
import type { Task } from '~/entities/task/model/types'
import { useTaskStore } from '~/entities/task/model/task.store'

const props = defineProps<{ task: Task }>()
const store = useTaskStore()
</script>

<template>
  <div
    class="flex justify-between items-center p-4 border rounded-2xl"
    :class="{ 'opacity-60 line-through': task.completed }"
  >
    <label class="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="store.toggleTask(task.id)"
      />
      <span>{{ task.title }}</span>
    </label>

    <button
      @click="store.removeTask(task.id)"
      class="px-3 py-1 border rounded-xl hover:bg-red-500 hover:text-white transition"
    >
      Delete
    </button>
  </div>
</template>
