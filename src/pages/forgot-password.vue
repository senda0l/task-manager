<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { AlertCircle, CheckCircle2, LoaderCircle, Mail, Send } from "lucide-vue-next";
import Alert from "~/shared/ui/components/Alert/index.vue";
import AlertDescription from "~/shared/ui/components/AlertDescription/index.vue";
import Button from "~/shared/ui/components/Button/index.vue";
import Card from "~/shared/ui/components/Card/index.vue";
import CardContent from "~/shared/ui/components/CardContent/index.vue";
import CardDescription from "~/shared/ui/components/CardDescription/index.vue";
import CardHeader from "~/shared/ui/components/CardHeader/index.vue";
import CardTitle from "~/shared/ui/components/CardTitle/index.vue";
import Input from "~/shared/ui/components/Input/index.vue";
import Label from "~/shared/ui/components/Label/index.vue";
import { useApi } from "~/shared/api";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Forgot Password | TaskFlow",
});

const api = useApi();

const form = reactive({
  email: "",
});

const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const canSubmit = computed(() => {
  return form.email.trim().length > 0 && !isSubmitting.value;
});

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object") {
    const fetchError = error as {
      data?: { message?: string | string[] };
      response?: { status?: number };
      statusCode?: number;
      statusMessage?: string;
      message?: string;
    };

    const statusCode = fetchError.response?.status ?? fetchError.statusCode;
    if (statusCode === 404) {
      return "The reset-password endpoint is not available yet. Add /auth/forgot-password on the API to enable this flow.";
    }

    const apiMessage = fetchError.data?.message;
    if (Array.isArray(apiMessage)) {
      return apiMessage[0] ?? "Unable to start the password reset flow.";
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

  return "Unable to start the password reset flow.";
};

const submit = async () => {
  if (!canSubmit.value) {
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await api("/auth/forgot-password", {
      method: "POST",
      body: { email: form.email.trim() },
    });

    successMessage.value = "If the account exists, a password reset email has been requested.";
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
        <Send class="h-5 w-5" />
      </div>
      <div class="space-y-1.5">
        <CardTitle class="text-3xl font-semibold tracking-tight">Reset your password</CardTitle>
        <CardDescription class="text-sm leading-6">
          Enter your email address and TaskFlow will request a reset link from the API.
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent class="space-y-6">
      <Alert v-if="errorMessage" variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertDescription>{{ errorMessage }}</AlertDescription>
      </Alert>

      <Alert v-if="successMessage" class="border-emerald-200 bg-emerald-50 text-emerald-900 [&>svg]:text-emerald-700">
        <CheckCircle2 class="h-4 w-4" />
        <AlertDescription>{{ successMessage }}</AlertDescription>
      </Alert>

      <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-2">
          <Label for="forgot-email">Email</Label>
          <div class="relative">
            <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="forgot-email"
              v-model="form.email"
              type="email"
              placeholder="you@company.com"
              class="h-11 pl-10"
              :disabled="isSubmitting"
              autocomplete="email"
            />
          </div>
        </div>

        <Button type="submit" class="h-11 w-full text-sm font-semibold" :disabled="!canSubmit">
          <LoaderCircle v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          <span>{{ isSubmitting ? "Requesting reset" : "Send reset link" }}</span>
        </Button>
      </form>

      <p class="text-center text-sm text-muted-foreground">
        Remembered your password?
        <NuxtLink to="/login" class="font-semibold text-foreground transition-colors hover:text-primary">
          Back to sign in
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>