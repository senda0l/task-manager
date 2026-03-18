<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsContent } from 'radix-vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value: string
}>()

const classes = computed(() =>
  cn(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.class
  )
)
</script>

<template>
  <TabsContent :value="value" :class="classes">
    <slot />
  </TabsContent>
</template>
