<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label as RadixLabel } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  for?: string
}>()

const classes = computed(() =>
  cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.class
  )
)
</script>

<template>
  <RadixLabel :class="classes" :for="$props.for">
    <slot />
  </RadixLabel>
</template>
