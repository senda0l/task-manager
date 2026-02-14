<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const classes = computed(() =>
  cn('inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', props.class)
)
</script>

<template>
  <AlertDialogAction :class="classes"><slot /></AlertDialogAction>
</template>
