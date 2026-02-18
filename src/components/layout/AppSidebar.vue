<script setup lang="ts">
import { ref } from "vue";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-vue-next";
import Separator from "~/shared/ui/Separator.vue";
import { cn } from "~/shared/lib/utils";
import { useTaskStore } from "~/entities/task/model/task.store";
const store = useTaskStore();
const route = useRoute();
const collapsed = ref(false);

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Tasks", icon: ListTodo, href: "/tasks" },
  { name: "Completed", icon: CheckCircle2, href: "/completed" },
  { name: "In Progress", icon: Clock, href: "/in-progress" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
];

const bottomNav = [{ name: "Settings", icon: Settings, href: "/settings" }];

const isActive = (href: string) => {
  if (href === "/") return route.path === "/";
  return route.path.startsWith(href);
};
</script>

<template>
  <aside
    :class="
      cn(
        'relative flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      )
    "
  >
    <!-- Header -->
    <div class="flex h-14 items-center px-4">
      <div class="flex items-center gap-2 overflow-hidden">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <ListTodo class="h-4 w-4" />
        </div>
        <span
          v-if="!collapsed"
          class="text-lg font-semibold tracking-tight truncate"
        >
          TaskFlow
        </span>
      </div>
    </div>

    <Separator />

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 p-2 overflow-y-auto">
      <p
        v-if="!collapsed"
        class="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        Menu
      </p>
      <NuxtLink
        v-for="item in navigation"
        @click="store.searchQuery = ''"
        :key="item.name"
        :to="item.href"
        :class="
          cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            collapsed && 'justify-center px-2',
          )
        "
      >
        <component :is="item.icon" class="h-4 w-4 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <Separator />

    <!-- Bottom Navigation -->
    <div class="p-2">
      <NuxtLink
        v-for="item in bottomNav"
        :key="item.name"
        :to="item.href"
        :class="
          cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            collapsed && 'justify-center px-2',
          )
        "
      >
        <component :is="item.icon" class="h-4 w-4 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.name }}</span>
      </NuxtLink>
    </div>

    <!-- Toggle Button -->
    <button
      class="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:bg-accent transition-colors"
      @click="collapsed = !collapsed"
    >
      <ChevronLeft v-if="!collapsed" class="h-3 w-3" />
      <ChevronRight v-else class="h-3 w-3" />
    </button>
  </aside>
</template>
