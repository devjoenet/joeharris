<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import { useVModel } from "@vueuse/core";

  const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
  }>();

  const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
  }>();

  const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="
      cn(
        'flex h-12 w-full min-w-0 rounded-xl border border-border/70 bg-secondary/30 px-4 py-3 text-base font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[background-color,border-color,box-shadow,color] placeholder:text-muted-foreground/80 selection:bg-primary/90 selection:text-primary-foreground outline-none disabled:pointer-events-none disabled:opacity-40 file:inline-flex file:h-8 file:items-center file:justify-center file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:text-sm file:font-semibold file:text-primary file:transition-colors file:hover:bg-primary/15 md:text-sm',
        'focus-visible:bg-background focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.18)]',
        'dark:bg-input/40 dark:border-border/50 dark:placeholder:text-muted-foreground/70 dark:file:bg-primary/20 dark:file:text-primary-foreground',
        'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/40',
        props.class,
      )
    "
  />
</template>
