<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const cardClasses = computed(() =>
  cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)
)
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
