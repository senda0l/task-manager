<script setup lang="ts">
import { useTaskStore } from "~/entities/task/model/task.store";
import Button from "~/shared/ui/components/Button/index.vue";
import Badge from "~/shared/ui/components/Badge/index.vue";
import Separator from "~/shared/ui/components/Separator/index.vue";
import { ListFilter } from "lucide-vue-next";
import Select from "~/shared/ui/components/Select/index.vue";

const store = useTaskStore();
const selectedFilter = ref('all')
const filters = [
  { label: "All", value: "all" as const },
  { label: "Active", value: "active" as const },
  { label: "In progress", value: "in_progress" as const },
  { label: "Completed", value: "completed" as const },
  { label: "Overdue", value: "overdue" as const },
];
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <div class="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
      <ListFilter class="h-4 w-4" />
      <span class="hidden sm:inline font-medium">Filter</span>
    </div>

    <div class="flex items-center rounded-lg border bg-background p-1">
      <Button
        v-for="f in filters"
        :key="f.value"
        :variant="store.filter === f.value ? 'default' : 'ghost'"
        size="sm"
        class="h-7 text-xs px-3"
        @click="store.setFilter(f.value)"
      >
        {{ f.label }}
      </Button>
    </div>

    <Separator orientation="vertical" class="h-5 hidden sm:block" />

    
    <div class="flex items-center gap-3 ml-auto text-xs text-muted-foreground">
      <div class="flex items-center gap-1.5">
        <span>Total</span>
        <Badge variant="secondary" class="h-5 text-[10px] px-1.5">{{
          store.stats.total
        }}</Badge>
      </div>
      <div class="flex items-center gap-1.5">
        <span>Active</span>
        <Badge variant="outline" class="h-5 text-[10px] px-1.5">{{
          store.stats.active
        }}</Badge>
      </div>
      <div class="flex items-center gap-1.5">
        <span>In Progress</span>
        <Badge variant="outline" class="h-5 text-[10px] px-1.5">{{
          store.stats.inProgress
        }}</Badge>
      </div>
      <div class="flex items-center gap-1.5">
        <span>Done</span>
        <Badge
          variant="default"
          class="h-5 text-[10px] px-1.5 bg-emerald-600"
          >{{ store.stats.completed }}</Badge
        >
      </div>
    </div>
  </div>
</template>
