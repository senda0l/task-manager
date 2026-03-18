<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { AlertCircle, LoaderCircle, LockKeyhole, Mail } from "lucide-vue-next";
import { useAuthStore } from "~/entities/auth/useAuth";
import Alert from "~/shared/ui/components/Alert/index.vue";
import AlertDescription from "~/shared/ui/components/AlertDescription/index.vue";
import Button from "~/shared/ui/components/Button/index.vue";
import Card from "~/shared/ui/components/Card/index.vue";
import CardContent from "~/shared/ui/components/CardContent/index.vue";
import CardDescription from "~/shared/ui/components/CardDescription/index.vue";
import CardHeader from "~/shared/ui/components/CardHeader/index.vue";
import CardTitle from "~/shared/ui/components/CardTitle/index.vue";
import Checkbox from "~/shared/ui/components/Checkbox/index.vue";
import Input from "~/shared/ui/components/Input/index.vue";
import Label from "~/shared/ui/components/Label/index.vue";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Login | TaskFlow",
});

const authStore = useAuthStore();
const route = useRoute();

const form = reactive({
  email: "",
  password: "",
  rememberMe: true,
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const canSubmit = computed(() => {
  return form.email.trim().length > 0 && form.password.trim().length > 0 && !isSubmitting.value;
});

const redirectTarget = computed(() => {
  const redirect = route.query.redirect;
  return typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/";
});

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object") {
    const fetchError = error as {
      data?: { message?: string | string[] };
      statusMessage?: string;
      message?: string;
    };

    const apiMessage = fetchError.data?.message;
    if (Array.isArray(apiMessage)) {
      return apiMessage[0] ?? "Unable to sign in with the provided credentials.";
    }

    if (typeof apiMessage === "string" && apiMessage.length > 0) {
      return apiMessage;
    }

    if (typeof fetchError.statusMessage === "string" && fetchError.statusMessage.length > 0) {
      return fetchError.statusMessage;
    }

    if (typeof fetchError.message === "string" && fetchError.message.length > 0) {
      return fetchError.message;
    }
  }

  return "Unable to sign in with the provided credentials.";
};

const submit = async () => {
  if (!canSubmit.value) {
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    await authStore.login(form.email.trim(), form.password, form.rememberMe);

    await navigateTo(redirectTarget.value);
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Card class="overflow-hidden border-border/60 shadow-2xl shadow-slate-950/10">
    <CardHeader class="space-y-3 pb-6">
      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <LockKeyhole class="h-5 w-5" />
      </div>
      <div class="space-y-1.5">
        <CardTitle class="text-3xl font-semibold tracking-tight">Sign in to TaskFlow</CardTitle>
        <CardDescription class="text-sm leading-6">
          Use your workspace credentials to access tasks, analytics, and team progress.
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent class="space-y-6">
      <Alert v-if="errorMessage" variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertDescription>{{ errorMessage }}</AlertDescription>
      </Alert>

      <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <div class="relative">
            <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@company.com"
              class="h-11 pl-10"
              :disabled="isSubmitting"
              autocomplete="email"
            />
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between gap-3">
            <Label for="password">Password</Label>
            <span class="text-xs font-medium text-muted-foreground">Minimum 8 characters recommended</span>
          </div>
          <div class="relative">
            <LockKeyhole class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              class="h-11 pl-10"
              :disabled="isSubmitting"
              autocomplete="current-password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
          <label class="flex items-center gap-3 text-sm font-medium text-foreground">
            <Checkbox v-model:checked="form.rememberMe" :disabled="isSubmitting" />
            <span>Keep me signed in</span>
          </label>
          <NuxtLink to="/forgot-password" class="text-xs font-medium text-primary transition-colors hover:text-primary/80">
            Forgot password?
          </NuxtLink>
        </div>

        <Button type="submit" class="h-11 w-full text-sm font-semibold" :disabled="!canSubmit">
          <LoaderCircle v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          <span>{{ isSubmitting ? "Signing in" : "Sign in" }}</span>
        </Button>
      </form>

      <div class="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
        Access is managed by your backend API. If your credentials were just created, confirm the API server is running and available.
      </div>

      <p class="text-center text-sm text-muted-foreground">
        Need an account?
        <NuxtLink to="/register" class="font-semibold text-foreground transition-colors hover:text-primary">
          Create one here
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>