<script setup lang="ts">
import { useTaskStore } from "../model/task.store";
import { ref } from "vue";

const store = useTaskStore();

const title = ref("");

const onSubmit = () => {
  store.addTask({ title: title.value });
  title.value = "";
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="title of the task" />
    <button type="submit">add</button>
  </form>
</template>
