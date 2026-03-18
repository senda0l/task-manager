<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  open?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  showClose?: boolean
}>(), {
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
  showClose: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const contentClasses = computed(() =>
  cn(
    'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class
  )
)
</script>

<template>
  <PopoverRoot
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side="side"
        :side-offset="sideOffset"
        :align="align"
        :class="contentClasses"
      >
        <slot />
        <PopoverClose
          v-if="showClose"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X class="h-4 w-4" />
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
