<script setup lang="ts">
import AppSidebar from '~/components/layout/AppSidebar.vue'
import AppNavbar from '~/components/layout/AppNavbar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Navbar -->
      <AppNavbar />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
