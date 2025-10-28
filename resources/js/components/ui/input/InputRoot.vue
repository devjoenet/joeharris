<script setup lang="ts">
  import { computed } from "vue";
  import { cn } from "@/lib/utils";
  import type { InputContext } from "./index";

  const props = defineProps<Pick<InputContext["props"], "variant" | "density" | "error" | "disabled">>();

  const densityConfig = computed(() => {
    switch (props.density) {
      case "comfortable":
        return { field: "h-12" };
      case "compact":
        return { field: "h-10" };
      default:
        return { field: "h-14" };
    }
  });

  const fieldClasses = computed(() =>
    cn(
      "group relative flex w-full items-center gap-3 rounded-xl px-4 transition-all duration-200",
      densityConfig.value.field,
      props.variant === "outlined" ? "border border-outline bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20" : "border-b border-outline-variant bg-surface-variant/50 focus-within:border-b-primary",
      props.error && "border-destructive focus-within:ring-destructive/30",
      props.disabled && "opacity-60 pointer-events-none",
    ),
  );
</script>

<template>
  <div :class="fieldClasses" :data-variant="props.variant">
    <span v-if="$slots.leading" class="flex h-full items-center text-muted-foreground transition-colors duration-200 data-[error=true]:text-destructive" :data-error="props.error">
      <slot name="leading" />
    </span>

    <div class="relative flex-1">
      <slot />
    </div>

    <span v-if="$slots.trailing" class="flex h-full items-center text-muted-foreground transition-colors duration-200 data-[error=true]:text-destructive" :data-error="props.error">
      <slot name="trailing" />
    </span>
  </div>
</template>
