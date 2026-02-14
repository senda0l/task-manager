<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import Card from "~/shared/ui/Card.vue";
import CardHeader from "~/shared/ui/CardHeader.vue";
import CardTitle from "~/shared/ui/CardTitle.vue";
import CardDescription from "~/shared/ui/CardDescription.vue";
import CardContent from "~/shared/ui/CardContent.vue";
import Progress from "~/shared/ui/Progress.vue";
import Badge from "~/shared/ui/Badge.vue";
import Separator from "~/shared/ui/Separator.vue";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  Target,
  Activity,
  CalendarDays,
} from "lucide-vue-next";

const store = useTaskStore();

onMounted(() => {
  store.init();
});

const completionRate = computed(() =>
  store.stats.total > 0
    ? Math.round((store.stats.completed / store.stats.total) * 100)
    : 0,
);

const priorityBreakdown = computed(() => {
  const high = store.tasks.filter((t) => t.priority === "high").length;
  const medium = store.tasks.filter((t) => t.priority === "medium").length;
  const low = store.tasks.filter((t) => t.priority === "low").length;
  return { high, medium, low };
});

const recentTasks = computed(() => {
  return [...store.tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
});

const overdueTasks = computed(() => {
  const now = new Date().toISOString().split("T")[0];
  return store.tasks.filter(
    (t) => t.deadline && t.deadline < now && t.status !== "done",
  );
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Analytics</h1>
      <p class="text-muted-foreground">Overview of your task performance and productivity.</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Tasks</CardTitle>
          <ListTodo class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ store.stats.total }}</div>
          <p class="text-xs text-muted-foreground">All tasks created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Completed</CardTitle>
          <CheckCircle2 class="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-emerald-600">{{ store.stats.completed }}</div>
          <p class="text-xs text-muted-foreground">Tasks finished</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">In Progress</CardTitle>
          <Clock class="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-blue-600">{{ store.stats.inProgress }}</div>
          <p class="text-xs text-muted-foreground">Currently working</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Completion Rate</CardTitle>
          <TrendingUp class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ completionRate }}%</div>
          <Progress :model-value="completionRate" class="mt-2" />
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Priority Breakdown -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Target class="h-5 w-5" />
            Priority Breakdown
          </CardTitle>
          <CardDescription>Distribution of tasks by priority level.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-red-500" />
                <span class="text-sm font-medium">High Priority</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">{{ priorityBreakdown.high }}</span>
                <Badge variant="destructive" class="text-[10px]">
                  {{ store.stats.total > 0 ? Math.round((priorityBreakdown.high / store.stats.total) * 100) : 0 }}%
                </Badge>
              </div>
            </div>
            <Progress
              :model-value="store.stats.total > 0 ? (priorityBreakdown.high / store.stats.total) * 100 : 0"
              class="h-2"
            />
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-yellow-500" />
                <span class="text-sm font-medium">Medium Priority</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">{{ priorityBreakdown.medium }}</span>
                <Badge variant="secondary" class="text-[10px]">
                  {{ store.stats.total > 0 ? Math.round((priorityBreakdown.medium / store.stats.total) * 100) : 0 }}%
                </Badge>
              </div>
            </div>
            <Progress
              :model-value="store.stats.total > 0 ? (priorityBreakdown.medium / store.stats.total) * 100 : 0"
              class="h-2"
            />
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-green-500" />
                <span class="text-sm font-medium">Low Priority</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">{{ priorityBreakdown.low }}</span>
                <Badge variant="outline" class="text-[10px]">
                  {{ store.stats.total > 0 ? Math.round((priorityBreakdown.low / store.stats.total) * 100) : 0 }}%
                </Badge>
              </div>
            </div>
            <Progress
              :model-value="store.stats.total > 0 ? (priorityBreakdown.low / store.stats.total) * 100 : 0"
              class="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Status Overview -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Activity class="h-5 w-5" />
            Status Overview
          </CardTitle>
          <CardDescription>Current state of all your tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <ListTodo class="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium">Active</p>
                  <span class="text-2xl font-bold">{{ store.stats.active }}</span>
                </div>
                <Progress
                  :model-value="store.stats.total > 0 ? (store.stats.active / store.stats.total) * 100 : 0"
                  class="mt-1 h-1.5"
                />
              </div>
            </div>

            <Separator />

            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Clock class="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium">In Progress</p>
                  <span class="text-2xl font-bold">{{ store.stats.inProgress }}</span>
                </div>
                <Progress
                  :model-value="store.stats.total > 0 ? (store.stats.inProgress / store.stats.total) * 100 : 0"
                  class="mt-1 h-1.5"
                />
              </div>
            </div>

            <Separator />

            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium">Completed</p>
                  <span class="text-2xl font-bold">{{ store.stats.completed }}</span>
                </div>
                <Progress
                  :model-value="store.stats.total > 0 ? (store.stats.completed / store.stats.total) * 100 : 0"
                  class="mt-1 h-1.5"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Overdue Tasks -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CalendarDays class="h-5 w-5 text-red-500" />
            Overdue Tasks
          </CardTitle>
          <CardDescription>Tasks past their deadline that still need attention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="overdueTasks.length === 0" class="py-6 text-center text-sm text-muted-foreground">
            No overdue tasks. You're on track!
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="task in overdueTasks"
              :key="task.id"
              class="flex items-center justify-between rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-3"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium truncate">{{ task.title }}</p>
                <p class="text-xs text-red-600 dark:text-red-400">Due: {{ task.deadline }}</p>
              </div>
              <Badge variant="destructive" class="shrink-0 text-[10px]">{{ task.priority }}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Tasks -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BarChart3 class="h-5 w-5" />
            Recent Tasks
          </CardTitle>
          <CardDescription>Your latest created tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="recentTasks.length === 0" class="py-6 text-center text-sm text-muted-foreground">
            No tasks yet. Create one to get started!
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="task in recentTasks"
              :key="task.id"
              class="flex items-center gap-3 rounded-lg border p-3"
            >
              <div
                :class="[
                  'h-2 w-2 rounded-full shrink-0',
                  task.status === 'done' ? 'bg-emerald-500' :
                  task.status === 'in progress' ? 'bg-blue-500' : 'bg-slate-400',
                ]"
              />
              <div class="min-w-0 flex-1">
                <p
                  :class="[
                    'text-sm font-medium truncate',
                    task.status === 'done' && 'line-through text-muted-foreground',
                  ]"
                >
                  {{ task.title }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ new Date(task.createdAt).toLocaleDateString() }}
                </p>
              </div>
              <Badge
                :variant="task.status === 'done' ? 'default' : task.status === 'in progress' ? 'secondary' : 'outline'"
                class="shrink-0 text-[10px]"
              >
                {{ task.status }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
