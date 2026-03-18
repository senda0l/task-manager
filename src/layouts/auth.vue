<script setup lang="ts">
import { ArrowRight, CheckCircle2, ShieldCheck, TimerReset } from "lucide-vue-next";

const highlights = [
  {
    icon: CheckCircle2,
    title: "Stay on top of every task",
    description: "Track active work, completed items, and upcoming priorities from one place.",
  },
  {
    icon: TimerReset,
    title: "Keep momentum visible",
    description: "Review progress trends and move blockers before they slow the day down.",
  },
  {
    icon: ShieldCheck,
    title: "Simple, focused access",
    description: "Sign in to your workspace and get straight into planning and execution.",
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50">
    <div class="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
      <section class="relative hidden overflow-hidden lg:flex">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.32),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.28),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

        <div class="relative flex w-full flex-col justify-between px-10 py-12 xl:px-16">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm">
              <ArrowRight class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.3em] text-slate-300/80">TaskFlow</p>
              <h1 class="text-2xl font-semibold tracking-tight">Work that moves cleanly.</h1>
            </div>
          </div>

          <div class="max-w-xl space-y-8">
            <div class="space-y-4">
              <p class="text-sm font-medium uppercase tracking-[0.35em] text-sky-300/80">Project control</p>
              <h2 class="text-5xl font-semibold leading-tight text-white xl:text-6xl">
                Manage tasks with a workspace built for focus, not clutter.
              </h2>
              <p class="max-w-lg text-base leading-7 text-slate-300">
                Organize your team, review progress, and make every work session feel deliberate.
              </p>
            </div>

            <div class="grid gap-4">
              <article
                v-for="item in highlights"
                :key="item.title"
                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div class="flex items-start gap-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                    <component :is="item.icon" class="h-5 w-5" />
                  </div>
                  <div class="space-y-1.5">
                    <h3 class="text-base font-medium text-white">{{ item.title }}</h3>
                    <p class="text-sm leading-6 text-slate-300">{{ item.description }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <p class="text-sm text-slate-400">Built for daily planning, execution, and review.</p>
        </div>
      </section>

      <section class="relative flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground sm:px-10 lg:px-12">
        <div class="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)]" />
        <div class="relative w-full max-w-md">
          <slot />
        </div>
      </section>
    </div>
  </div>
</template>