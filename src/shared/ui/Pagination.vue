<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import Button from '~/shared/ui/Button.vue'
import { cn } from '~/shared/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  currentPage: number
  totalPages: number
  siblingCount?: number
}>()

const emit = defineEmits<{
  'update:currentPage': [value: number]
}>()

const siblings = computed(() => props.siblingCount ?? 1)

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const sibling = siblings.value
  const result: (number | 'ellipsis')[] = []

  // Always show first page
  result.push(1)

  const start = Math.max(2, current - sibling)
  const end = Math.min(total - 1, current + sibling)

  if (start > 2) result.push('ellipsis')
  for (let i = start; i <= end; i++) result.push(i)
  if (end < total - 1) result.push('ellipsis')

  // Always show last page if > 1
  if (total > 1) result.push(total)

  return result
})

const navClasses = computed(() =>
  cn('mx-auto flex w-full justify-center', props.class)
)
</script>

<template>
  <nav role="navigation" aria-label="pagination" :class="navClasses">
    <ul class="flex flex-row items-center gap-1">
      <li>
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9"
          :disabled="currentPage === 1"
          aria-label="Previous page"
          @click="emit('update:currentPage', currentPage - 1)"
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>
      </li>

      <li v-for="(page, i) in pages" :key="i">
        <span
          v-if="page === 'ellipsis'"
          class="flex h-9 w-9 items-center justify-center"
        >
          <MoreHorizontal class="h-4 w-4" />
        </span>
        <Button
          v-else
          :variant="page === currentPage ? 'default' : 'outline'"
          size="icon"
          class="h-9 w-9"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="emit('update:currentPage', page)"
        >
          {{ page }}
        </Button>
      </li>

      <li>
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9"
          :disabled="currentPage === totalPages"
          aria-label="Next page"
          @click="emit('update:currentPage', currentPage + 1)"
        >
          <ChevronRight class="h-4 w-4" />
        </Button>
      </li>
    </ul>
  </nav>
</template>
