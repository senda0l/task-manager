<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const classes = computed(() =>
  cn('relative w-full overflow-auto', props.class)
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
