<script setup lang="ts">
  import TextLink from "@/components/TextLink.vue";
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Input } from "@/components/ui/input";
  import AuthBase from "@/layouts/AuthLayout.vue";
  import { register } from "@/routes";
  import { store } from "@/routes/login";
  import password, { email, request } from "@/routes/password";
  import { Form, Head } from "@inertiajs/vue3";
  import { LoaderCircle } from "lucide-vue-next";

  defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
  }>();
</script>

<template>
  <AuthBase title="Log in to your account" description="Enter your email and password below to log in">
    <Head title="Log in" />

    <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <Form v-bind="store.form()" :reset-on-success="['password']" v-slot="{ errors, processing }" class="flex flex-col gap-6">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Input :v-model="email" label="Email Address" type="email" required autofocus autocomplete="email" variant="outlined" supporting-text="Use the address linked to your account" :error="Boolean(errors.email)" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <TextLink v-if="canResetPassword" :href="request()" class="text-sm" :tabindex="5"> Forgot password? </TextLink>
          </div>
          <Input :v-model="password" label="Password" type="password" required autofocus autocomplete="current-password" variant="outlined" :error="Boolean(errors.password)" />
        </div>

        <div class="flex items-center justify-between">
          <Checkbox name="terms" density="comfortable" label="I agree to the Terms" supportingText="You can update this setting anytime in Preferences." />
        </div>

        <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="processing" data-test="login-button">
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Log in
        </Button>
      </div>

      <div class="text-center text-sm text-muted-foreground" v-if="canRegister">
        Don't have an account?
        <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
      </div>
    </Form>
  </AuthBase>
</template>
