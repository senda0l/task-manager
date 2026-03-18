<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskList from "~/entities/task/ui/TaskList.vue";
import Card from "~/shared/ui/components/Card/index.vue";
import CardHeader from "~/shared/ui/components/CardHeader/index.vue";
import CardTitle from "~/shared/ui/components/CardTitle/index.vue";
import CardDescription from "~/shared/ui/components/CardDescription/index.vue";
import CardContent from "~/shared/ui/components/CardContent/index.vue";
import Badge from "~/shared/ui/components/Badge/index.vue";
import { CheckCircle2 } from "lucide-vue-next";

const store = useTaskStore();

onMounted(() => {
  store.setFilter("completed");
});
</script>

<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <CardTitle class="text-xl">Completed Tasks</CardTitle>
              <Badge variant="secondary">{{ store.stats.completed }}</Badge>
            </div>
            <CardDescription>Tasks you have finished. Great work!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TaskList />
      </CardContent>
    </Card>
  </div>
</template>
