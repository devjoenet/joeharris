<script setup lang="ts">
  import { computed, ref, useAttrs, useSlots, useId, type HTMLAttributes } from "vue";
  import { useVModel } from "@vueuse/core";
  import { cn } from "@/lib/utils";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      defaultValue?: string | number;
      modelValue?: string | number;
      class?: HTMLAttributes["class"];
      variant?: "filled" | "outlined";
      label?: string;
      supportingText?: string;
      error?: boolean;
      fieldClass?: HTMLAttributes["class"];
      density?: "default" | "comfortable" | "compact";
      inputClass?: HTMLAttributes["class"];
    }>(),
    {
      variant: "filled",
      density: "default",
    },
  );

  const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
  }>();

  const attrs = useAttrs();
  const slots = useSlots();
  const generatedId = useId();
  const isFocused = ref(false);

  const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const hasLeading = computed(() => Boolean(slots.leading));
  const hasTrailing = computed(() => Boolean(slots.trailing));
  const hasSupportingSlot = computed(() => Boolean(slots.supporting));

  const isDisabled = computed(() => {
    const disabledAttr = attrs.disabled as string | boolean | undefined;

    if (disabledAttr === "" || disabledAttr === "true" || disabledAttr === true) {
      return true;
    }

    if (disabledAttr === "false") {
      return false;
    }

    return Boolean(disabledAttr);
  });

  const isInvalid = computed(() => {
    if (props.error) {
      return true;
    }

    const invalidAttr = attrs["aria-invalid"] as string | boolean | undefined;

    if (invalidAttr === "" || invalidAttr === "true" || invalidAttr === true) {
      return true;
    }

    if (invalidAttr === "false") {
      return false;
    }

    return Boolean(invalidAttr);
  });

  const rawValue = computed(() => {
    if (modelValue.value !== undefined && modelValue.value !== null) {
      const valueString = String(modelValue.value);

      if (valueString.length > 0) {
        return valueString;
      }
    }

    const attrValue = attrs.value as string | number | undefined;

    if (attrValue !== undefined && attrValue !== null) {
      const valueString = String(attrValue);

      if (valueString.length > 0) {
        return valueString;
      }
    }

    if (props.defaultValue !== undefined && props.defaultValue !== null) {
      const valueString = String(props.defaultValue);

      if (valueString.length > 0) {
        return valueString;
      }
    }

    return "";
  });

  const isLabelFloating = computed(() => Boolean(props.label) && (isFocused.value || rawValue.value.length > 0));

  const placeholder = computed(() => {
    const attrPlaceholder = attrs.placeholder as string | undefined;

    if (props.label && (!attrPlaceholder || attrPlaceholder.length === 0)) {
      return " ";
    }

    return attrPlaceholder;
  });

  const inputId = computed(() => {
    const providedId = attrs.id as string | undefined;

    if (providedId) {
      return providedId;
    }

    return props.label ? generatedId : undefined;
  });

  const inputAttrs = computed(() => {
    const { class: _class, placeholder: _placeholder, id: _providedId, ...delegated } = attrs as Record<string, unknown>;

    return {
      ...delegated,
      id: inputId.value,
      placeholder: placeholder.value,
    };
  });

  const densityConfig = computed(() => {
    switch (props.density) {
      case "comfortable":
        return {
          field: "h-12",
          input: "pt-4 pb-2",
          labelFloating: "top-[0.625rem]",
        } as const;
      case "compact":
        return {
          field: "h-10",
          input: "pt-3 pb-1",
          labelFloating: "top-[0.375rem]",
        } as const;
      default:
        return {
          field: "h-14",
          input: "pt-5 pb-2",
          labelFloating: "top-2",
        } as const;
    }
  });

  const containerClasses = computed(() => cn("flex w-full flex-col gap-2", props.class));

  const fieldClasses = computed(() =>
    cn(
      "relative flex w-full items-center gap-3 rounded-xl px-4 transition-all duration-200",
      densityConfig.value.field,
      props.variant === "outlined"
        ? cn(
            "border border-border/70 bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 focus-within:ring-offset-background dark:border-border/50 dark:bg-background/40",
            isInvalid.value && "border-destructive focus-within:border-destructive focus-within:ring-destructive/30",
          )
        : cn(
            "border border-transparent border-b-border/70 bg-secondary/30 shadow-[0_1px_0_rgba(16,24,40,0.08)] focus-within:bg-secondary/20 focus-within:border-b-primary focus-within:ring-1 focus-within:ring-primary/15 focus-within:ring-offset-2 focus-within:ring-offset-background dark:border-b-border/50 dark:bg-secondary/20",
            isInvalid.value && "border-b-destructive focus-within:border-b-destructive focus-within:ring-destructive/30 shadow-none",
          ),
      isDisabled.value && "opacity-60",
      props.fieldClass,
    ),
  );

  const inputClasses = computed(() =>
    cn(
      "peer block w-full appearance-none border-0 bg-transparent px-0 text-base font-medium text-foreground caret-primary outline-none placeholder:text-transparent selection:bg-primary/90 selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70 file:inline-flex file:h-8 file:items-center file:justify-center file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:text-sm file:font-semibold file:text-primary file:transition-colors file:hover:bg-primary/15",
      densityConfig.value.input,
      props.inputClass,
    ),
  );

  const labelClasses = computed(() =>
    cn(
      "pointer-events-none absolute left-0 z-10 origin-left text-sm font-medium leading-none text-muted-foreground transition-all duration-200",
      isLabelFloating.value ? cn(densityConfig.value.labelFloating, "translate-y-0 text-xs", props.variant === "outlined" ? "px-1 peer-focus:text-primary" : "px-0") : "top-1/2 -translate-y-1/2 text-base",
      isInvalid.value ? "text-destructive peer-focus:text-destructive" : "peer-focus:text-primary",
      props.variant === "outlined" && isLabelFloating.value ? "bg-background dark:bg-background/60" : "",
    ),
  );

  const supportingClasses = computed(() => cn("text-xs font-medium", isInvalid.value ? "text-destructive" : "text-muted-foreground"));
</script>

<template>
  <div :class="containerClasses">
    <div :class="fieldClasses" :data-disabled="isDisabled ? '' : null" :data-invalid="isInvalid ? '' : null" :data-variant="props.variant">
      <span v-if="hasLeading" :class="cn('flex h-full items-center text-muted-foreground transition-colors duration-200', isInvalid && 'text-destructive', isDisabled && 'opacity-70')">
        <slot name="leading" />
      </span>

      <div class="relative flex-1">
        <input v-model="modelValue" v-bind="inputAttrs" data-slot="input" :class="inputClasses" @focus="isFocused = true" @blur="isFocused = false" />
        <label v-if="props.label" :for="inputId" :class="labelClasses">
          {{ props.label }}
        </label>
      </div>

      <span v-if="hasTrailing" :class="cn('flex h-full items-center text-muted-foreground transition-colors duration-200', isInvalid && 'text-destructive', isDisabled && 'opacity-70')">
        <slot name="trailing" />
      </span>
    </div>

    <p v-if="props.supportingText || hasSupportingSlot" :class="supportingClasses">
      <slot name="supporting">{{ props.supportingText }}</slot>
    </p>
  </div>
</template>
