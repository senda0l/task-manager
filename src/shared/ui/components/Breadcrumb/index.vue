<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: any
  current?: boolean
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  items: BreadcrumbItem[]
}>()

const navClasses = computed(() => cn('', props.class))
</script>

<template>
  <nav :class="navClasses" aria-label="breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="inline-flex items-center gap-1.5"
      >
        <ChevronRight v-if="i > 0" class="h-3.5 w-3.5" />
        <NuxtLink
          v-if="item.href && !item.current"
          :to="item.href"
          class="transition-colors hover:text-foreground"
        >
          <component v-if="item.icon" :is="item.icon" class="h-4 w-4" />
          <span v-else>{{ item.label }}</span>
        </NuxtLink>
        <span
          v-else
          role="link"
          aria-disabled="true"
          aria-current="page"
          :class="cn('font-normal', item.current && 'text-foreground')"
        >
          <component v-if="item.icon" :is="item.icon" class="h-4 w-4" />
          <span v-else>{{ item.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
