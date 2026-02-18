<script setup lang="ts">
import { useTaskStore } from "~/entities/task/model/task.store";
import TaskItem from "./TaskItem.vue";
import ScrollArea from "~/shared/ui/ScrollArea.vue";
import Button from "~/shared/ui/Button.vue";
import { Trash2, CheckSquare, XSquare } from "lucide-vue-next";

const store = useTaskStore();
</script>

<template>
  <div>
    <!-- Bulk actions bar -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="store.hasSelected"
        class="flex items-center gap-2 mb-3 p-2 rounded-lg border border-destructive/30 bg-destructive/5"
      >
        <span class="text-sm text-muted-foreground ml-1">
          {{ store.selectedCount }} task{{ store.selectedCount > 1 ? "s" : "" }} selected
        </span>
        <div class="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          @click="store.selectAll()"
        >
          <CheckSquare class="h-4 w-4 mr-1" />
          Select All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          @click="store.deselectAll()"
        >
          <XSquare class="h-4 w-4 mr-1" />
          Deselect
        </Button>
        <Button
          variant="destructive"
          size="sm"
          @click="store.bulkDelete()"
        >
          <Trash2 class="h-4 w-4 mr-1" />
          Delete Selected
        </Button>
      </div>
    </Transition>

    <!-- Task list -->
    <ScrollArea class="h-[400px]">
      <div
        v-if="store.filteredTasks.length === 0"
        class="flex flex-col items-center justify-center py-12 text-muted-foreground"
      >
        <p class="text-sm">No tasks found</p>
      </div>
      <TransitionGroup
        v-else
        name="task"
        tag="div"
        class="relative space-y-2 pr-3"
      >
        <TaskItem
          v-for="task in store.filteredTasks"
          :key="task.id"
          :task="task"
        />
      </TransitionGroup>
    </ScrollArea>
  </div>
</template>

<style scoped>
.task-move,
.task-enter-active,
.task-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.task-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
</style>