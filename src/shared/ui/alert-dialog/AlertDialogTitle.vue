<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogTitle } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const classes = computed(() => cn('text-lg font-semibold', props.class))
</script>

<template>
  <AlertDialogTitle :class="classes"><slot /></AlertDialogTitle>
</template>
