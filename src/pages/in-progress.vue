<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskForm from "~/entities/task/ui/TaskForm.vue";
import TaskList from "~/entities/task/ui/TaskList.vue";
import Card from "~/shared/ui/components/Card/index.vue";
import CardHeader from "~/shared/ui/components/CardHeader/index.vue";
import CardTitle from "~/shared/ui/components/CardTitle/index.vue";
import CardDescription from "~/shared/ui/components/CardDescription/index.vue";
import CardContent from "~/shared/ui/components/CardContent/index.vue";
import Badge from "~/shared/ui/components/Badge/index.vue";
import { Clock } from "lucide-vue-next";

const store = useTaskStore();

onMounted(() => {
  store.setFilter("in_progress");
});
</script>

<template>
  <div class="space-y-6">
    <Card>
      <div class="flex items-center justify-between pr-7">
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Clock class="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <CardTitle class="text-xl">In Progress</CardTitle>
                <Badge variant="secondary">{{ store.stats.inProgress }}</Badge>
              </div>
              <CardDescription>Tasks you're currently working on.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <TaskForm />
      </div>
      <CardContent>
        <TaskList />
      </CardContent>
    </Card>
  </div>
</template>
