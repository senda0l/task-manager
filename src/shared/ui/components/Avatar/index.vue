<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import { cn } from '~/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        default: 'h-10 w-10',
        sm: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

type AvatarVariants = VariantProps<typeof avatarVariants>

const props = defineProps<{
  class?: HTMLAttributes['class']
  src?: string
  alt?: string
  fallback?: string
  size?: NonNullable<AvatarVariants['size']>
}>()

const rootClasses = computed(() =>
  cn(avatarVariants({ size: props.size }), props.class)
)

const initials = computed(() => {
  if (props.fallback) return props.fallback
  if (props.alt) {
    return props.alt
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return '?'
})
</script>

<template>
  <AvatarRoot :class="rootClasses">
    <AvatarImage
      v-if="src"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full"
    />
    <AvatarFallback
      class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium"
    >
      {{ initials }}
    </AvatarFallback>
  </AvatarRoot>
</template>
