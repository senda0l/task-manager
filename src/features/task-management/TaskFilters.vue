<script setup lang="ts">
import { useTaskStore } from '~/entities/task/model/task.store'
const store = useTaskStore()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <button
      class="px-3 py-1 border rounded-full"
      :class="{ 'bg-black text-white': store.filter === 'all' }"
      @click="store.setFilter('all')"
    >
      All
    </button>

    <button
      class="px-3 py-1 border rounded-full"
      :class="{ 'bg-black text-white': store.filter === 'active' }"
      @click="store.setFilter('active')"
    >
      Active
    </button>

    <button
      class="px-3 py-1 border rounded-full"
      :class="{ 'bg-black text-white': store.filter === 'completed' }"
      @click="store.setFilter('completed')"
    >
      Completed
    </button>

    <div class="ml-auto text-sm opacity-70">
      Total: {{ store.stats.total }} |
      Active: {{ store.stats.active }} |
      Done: {{ store.stats.completed }}
    </div>
  </div>
</template>
