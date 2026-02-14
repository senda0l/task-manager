<script setup lang="ts">
import { DialogTrigger } from 'radix-vue'
import { type HTMLAttributes } from 'vue'

defineProps<{
  class?: HTMLAttributes['class']
  asChild?: boolean
}>()
</script>

<template>
  <DialogTrigger :as-child="asChild" :class="$props.class">
    <slot />
  </DialogTrigger>
</template>
