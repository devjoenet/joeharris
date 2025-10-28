<script setup lang="ts">
  import { computed, inject } from "vue";
  import { cn } from "@/lib/utils";
  import { inputInjectionKey } from "./index";

  const ctx = inject(inputInjectionKey);
  if (!ctx) throw new Error("InputLabel must be used within Input");

  const isFloating = computed(() => ctx.isFocused.value || !!ctx.props.modelValue?.toString().length);

  const labelClasses = computed(() =>
    cn(
      "absolute left-4 z-10 origin-left text-sm text-muted-foreground transition-[transform,font-size,color] duration-200",
      isFloating.value ? "translate-y-1 text-xs text-primary" : "top-1/2 -translate-y-1/2 text-base",
      ctx.props.error && "text-destructive",
      ctx.props.variant === "outlined" && isFloating.value && "bg-surface px-1",
    ),
  );
</script>

<template>
  <label :for="ctx.inputId" :class="labelClasses">{{ ctx.props.label }}</label>
</template>
