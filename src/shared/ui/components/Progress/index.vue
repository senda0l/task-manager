<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: number
  max?: number
}>()

const rootClasses = computed(() =>
  cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', props.class)
)

const percentage = computed(() => {
  const max = props.max ?? 100
  return ((props.modelValue ?? 0) / max) * 100
})
</script>

<template>
  <ProgressRoot
    :model-value="modelValue"
    :max="max ?? 100"
    :class="rootClasses"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </ProgressRoot>
</template>
