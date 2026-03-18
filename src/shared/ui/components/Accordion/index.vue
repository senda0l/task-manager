<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  modelValue?: string | string[]
  items: Array<{
    value: string
    title: string
    content: string
  }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const rootClasses = computed(() => cn('w-full', props.class))
</script>

<template>
  <AccordionRoot
    :type="(type as any) ?? 'single'"
    :collapsible="collapsible ?? true"
    :default-value="defaultValue"
    :model-value="modelValue"
    :class="rootClasses"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="border-b"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger
          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
        >
          {{ item.title }}
          <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div class="pb-4 pt-0">
          {{ item.content }}
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
