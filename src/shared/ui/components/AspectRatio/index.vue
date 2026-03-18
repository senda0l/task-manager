<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AspectRatio } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  ratio?: number
}>()

const classes = computed(() => cn('overflow-hidden', props.class))
</script>

<template>
  <AspectRatio :ratio="ratio ?? 16 / 9" :class="classes">
    <slot />
  </AspectRatio>
</template>
