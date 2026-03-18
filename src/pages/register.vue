<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { AlertCircle, CheckCircle2, LoaderCircle, LockKeyhole, Mail, UserRoundPlus } from "lucide-vue-next";
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
  title: "Register | TaskFlow",
});

const authStore = useAuthStore();
const route = useRoute();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: true,
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const redirectTarget = computed(() => {
  const redirect = route.query.redirect;
  return typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/";
});

const passwordsMatch = computed(() => {
  return form.password.length > 0 && form.password === form.confirmPassword;
});

const canSubmit = computed(() => {
  return (
    form.email.trim().length > 0 &&
    form.password.trim().length >= 8 &&
    passwordsMatch.value &&
    !isSubmitting.value
  );
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
      return apiMessage[0] ?? "Unable to create your account.";
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

  return "Unable to create your account.";
};

const submit = async () => {
  if (!canSubmit.value) {
    if (form.password !== form.confirmPassword) {
      errorMessage.value = "Passwords must match before continuing.";
    }
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    await authStore.register(form.email.trim(), form.password, form.rememberMe);
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
        <UserRoundPlus class="h-5 w-5" />
      </div>
      <div class="space-y-1.5">
        <CardTitle class="text-3xl font-semibold tracking-tight">Create your workspace access</CardTitle>
        <CardDescription class="text-sm leading-6">
          Set up an account to manage tasks, monitor progress, and keep your planning in one place.
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
          <Label for="register-email">Email</Label>
          <div class="relative">
            <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-email"
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
          <Label for="register-password">Password</Label>
          <div class="relative">
            <LockKeyhole class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-password"
              v-model="form.password"
              type="password"
              placeholder="Create a password"
              class="h-11 pl-10"
              :disabled="isSubmitting"
              autocomplete="new-password"
            />
          </div>
          <p class="text-xs text-muted-foreground">Use at least 8 characters for a stronger account.</p>
        </div>

        <div class="space-y-2">
          <Label for="register-confirm-password">Confirm password</Label>
          <div class="relative">
            <CheckCircle2 class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-confirm-password"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Repeat your password"
              class="h-11 pl-10"
              :disabled="isSubmitting"
              autocomplete="new-password"
            />
          </div>
          <p v-if="form.confirmPassword && !passwordsMatch" class="text-xs text-destructive">
            Passwords do not match yet.
          </p>
        </div>

        <div class="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
          <label class="flex items-center gap-3 text-sm font-medium text-foreground">
            <Checkbox v-model:checked="form.rememberMe" :disabled="isSubmitting" />
            <span>Keep me signed in</span>
          </label>
          <span class="text-xs text-muted-foreground">Account access persists across sessions</span>
        </div>

        <Button type="submit" class="h-11 w-full text-sm font-semibold" :disabled="!canSubmit">
          <LoaderCircle v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          <span>{{ isSubmitting ? "Creating account" : "Create account" }}</span>
        </Button>
      </form>

      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/login" class="font-semibold text-foreground transition-colors hover:text-primary">
          Sign in
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>