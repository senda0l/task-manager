<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Toggle as RadixToggle } from 'radix-vue'
import { cn } from '~/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ToggleVariants = VariantProps<typeof toggleVariants>

const props = defineProps<{
  class?: HTMLAttributes['class']
  pressed?: boolean
  disabled?: boolean
  variant?: NonNullable<ToggleVariants['variant']>
  size?: NonNullable<ToggleVariants['size']>
}>()

const emit = defineEmits<{
  'update:pressed': [value: boolean]
}>()

const classes = computed(() =>
  cn(toggleVariants({ variant: props.variant, size: props.size }), props.class)
)
</script>

<template>
  <RadixToggle
    :pressed="pressed"
    :disabled="disabled"
    :class="classes"
    @update:pressed="emit('update:pressed', $event)"
  >
    <slot />
  </RadixToggle>
</template>
