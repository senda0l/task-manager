<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'radix-vue'
import { ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClasses = computed(() => cn('w-full', props.class))
</script>

<template>
  <CollapsibleRoot
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :class="rootClasses"
    @update:open="emit('update:open', $event)"
  >
    <slot name="trigger" :Toggle="CollapsibleTrigger">
      <CollapsibleTrigger as-child>
        <slot name="trigger-content" />
      </CollapsibleTrigger>
    </slot>

    <CollapsibleContent class="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
