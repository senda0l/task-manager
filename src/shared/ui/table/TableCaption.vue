<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const classes = computed(() =>
  cn('mt-1 text-sm text-muted-foreground', props.class)
)
</script>

<template>
  <caption :class="classes"><slot /></caption>
</template>
