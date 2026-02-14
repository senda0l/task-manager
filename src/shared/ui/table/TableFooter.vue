<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const classes = computed(() =>
  cn('h-12 px-4 text-left align-middle font-medium [&_tr]:border-b', props.class)
)
</script>

<template>
  <tfoot :class="classes"><slot /></tfoot>
</template>
