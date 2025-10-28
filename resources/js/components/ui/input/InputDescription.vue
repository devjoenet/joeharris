<script setup lang="ts">
  import { inject } from "vue";
  import { inputInjectionKey } from "./index";

  const ctx = inject(inputInjectionKey);
  if (!ctx) throw new Error("InputDescription must be used within Input");
</script>

<template>
  <p :id="`${ctx.inputId}-desc`" class="mt-1 text-xs font-medium text-muted-foreground" :class="{ 'text-destructive': ctx.props.error }">
    <slot>{{ ctx.props.supportingText }}</slot>
  </p>
</template>
