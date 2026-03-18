<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  checked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
}>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()

const classes = computed(() =>
  cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    props.class
  )
)
</script>

<template>
  <CheckboxRoot
    :checked="checked"
    :disabled="disabled"
    :required="required"
    :name="name"
    :value="value"
    :class="classes"
    @update:checked="emit('update:checked', $event)"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Check class="h-3.5 w-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
