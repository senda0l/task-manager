<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '~/shared/lib/utils'

export interface DropdownMenuItemDef {
  label: string
  icon?: any
  shortcut?: string
  disabled?: boolean
  destructive?: boolean
  onClick?: () => void
  separator?: boolean
  type?: 'item' | 'label' | 'separator' | 'checkbox'
  checked?: boolean
  onCheckedChange?: (val: boolean) => void
  children?: DropdownMenuItemDef[]
}

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  items: DropdownMenuItemDef[]
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}>(), {
  align: 'end',
  sideOffset: 4,
})

const contentClasses = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class
  )
)
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent :align="align" :side-offset="sideOffset" :class="contentClasses">
        <template v-for="(item, i) in items" :key="i">
          <DropdownMenuSeparator
            v-if="item.type === 'separator' || item.separator"
            class="-mx-1 my-1 h-px bg-muted"
          />
          <DropdownMenuLabel
            v-else-if="item.type === 'label'"
            class="px-2 py-1.5 text-sm font-semibold"
          >
            {{ item.label }}
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            v-else-if="item.type === 'checkbox'"
            :checked="item.checked"
            :disabled="item.disabled"
            class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            @update:checked="item.onCheckedChange?.($event)"
          >
            {{ item.label }}
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub v-else-if="item.children?.length">
            <DropdownMenuSubTrigger
              class="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent"
            >
              <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
              {{ item.label }}
              <ChevronRight class="ml-auto h-4 w-4" />
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              >
                <DropdownMenuItem
                  v-for="(child, ci) in item.children"
                  :key="ci"
                  :disabled="child.disabled"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  @select="child.onClick?.()"
                >
                  <component v-if="child.icon" :is="child.icon" class="mr-2 h-4 w-4" />
                  {{ child.label }}
                  <span v-if="child.shortcut" class="ml-auto text-xs tracking-widest opacity-60">{{ child.shortcut }}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            v-else
            :disabled="item.disabled"
            :class="cn(
              'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              item.destructive && 'text-destructive focus:text-destructive'
            )"
            @select="item.onClick?.()"
          >
            <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
            {{ item.label }}
            <span v-if="item.shortcut" class="ml-auto text-xs tracking-widest opacity-60">{{ item.shortcut }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
