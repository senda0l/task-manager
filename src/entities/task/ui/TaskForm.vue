<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '~/entities/task/model/task.store'

const store = useTaskStore()
const title = ref('')

const onSubmit = () => {
  store.addTask({ title: title.value })
  title.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex gap-3">
    <input
      v-model="title"
      placeholder="Add a task..."
      class="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
    />
    <button
      type="submit"
      class="px-4 py-2 border rounded-xl hover:bg-black hover:text-white transition"
    >
      Add
    </button>
  </form>
</template>
