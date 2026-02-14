<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  options: Array<{ label: string; value: string; description?: string; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const rootClasses = computed(() =>
  cn(
    'grid gap-2',
    props.orientation === 'horizontal' ? 'grid-flow-col auto-cols-fr' : '',
    props.class
  )
)
</script>

<template>
  <RadioGroupRoot
    :model-value="modelValue"
    :disabled="disabled"
    :orientation="orientation"
    :class="rootClasses"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center space-x-2"
    >
      <RadioGroupItem
        :value="option.value"
        :disabled="option.disabled"
        class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RadioGroupIndicator class="flex items-center justify-center">
          <Circle class="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupIndicator>
      </RadioGroupItem>
      <div class="grid gap-0.5 leading-none">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {{ option.label }}
        </label>
        <p v-if="option.description" class="text-xs text-muted-foreground">
          {{ option.description }}
        </p>
      </div>
    </div>
  </RadioGroupRoot>
</template>
