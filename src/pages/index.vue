<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskForm from "~/entities/task/ui/TaskForm.vue";
import TaskList from "~/entities/task/ui/TaskList.vue";
import TaskFilters from "~/features/task-management/TaskFilters.vue";
import Card from "~/shared/ui/Card.vue";
import CardHeader from "~/shared/ui/CardHeader.vue";
import CardTitle from "~/shared/ui/CardTitle.vue";
import CardDescription from "~/shared/ui/CardDescription.vue";
import CardContent from "~/shared/ui/CardContent.vue";
import Separator from "~/shared/ui/Separator.vue";
import { ClipboardList, CheckCircle2, Clock, BarChart3 } from "lucide-vue-next";

const store = useTaskStore();

onMounted(() => {
  store.init();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Total Tasks</CardTitle>
          <ClipboardList class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ store.stats.total }}</div>
          <p class="text-xs text-muted-foreground">All tasks in your list</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Active</CardTitle>
          <Clock class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ store.stats.active }}</div>
          <p class="text-xs text-muted-foreground">Tasks to be completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Completed</CardTitle>
          <CheckCircle2 class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ store.stats.completed }}</div>
          <p class="text-xs text-muted-foreground">Tasks finished</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Completion Rate</CardTitle>
          <BarChart3 class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{
              store.stats.total > 0
                ? Math.round((store.stats.completed / store.stats.total) * 100)
                : 0
            }}%
          </div>
          <div class="mt-2 h-2 w-full rounded-full bg-secondary">
            <div
              class="h-2 rounded-full bg-primary transition-all"
              :style="{
                width:
                  store.stats.total > 0
                    ? `${(store.stats.completed / store.stats.total) * 100}%`
                    : '0%',
              }"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Task Card -->
    <Card>
      <div class="flex align-middle items-center justify-between pr-7">
        <CardHeader>
          <CardTitle class="text-xl">My Tasks</CardTitle>
          <CardDescription
            >Create, manage, and track your daily tasks.</CardDescription
          >
        </CardHeader>
        <TaskForm />
      </div>
      <CardContent class="space-y-4">
        <Separator />
        <TaskFilters />
        <Separator />
        <TaskList />
      </CardContent>
    </Card>
  </div>
</template>
