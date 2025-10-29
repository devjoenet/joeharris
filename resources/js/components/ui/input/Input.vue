<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
  import { defineExpose } from "vue";
  import { useTextField, type UseTextFieldProps } from "@/composables/useTextField";

  const props = withDefaults(
    defineProps<
      UseTextFieldProps & {
        label?: string;
        supportingText?: string;
        class?: string;
        fieldClass?: string;
        inputClass?: string;
      }
    >(),
    {
      variant: "filled",
      density: "default",
      type: "text",
      showCounter: false,
    },
  );

  const emit = defineEmits<{
    (e: "update:modelValue", v: string | number): void;
    (e: "focus", ev: FocusEvent): void;
    (e: "blur", ev: FocusEvent): void;
    (e: "input", ev: Event): void;
    (e: "change", ev: Event): void;
  }>();

  const { modelValue, inputEl, isFocused, hasLeading, hasTrailing, hasSupportingSlot, isDisabled, isInvalid, inputId, helperId, errorId, rawValue, densityTokens, containerClasses, fieldClasses, inputClasses, supportingClasses, inputAttrs } =
    useTextField(props, emit);

  defineExpose({
    focus: () => inputEl.value?.focus(),
    blur: () => inputEl.value?.blur(),
  });
</script>

<template>
  <div :class="[containerClasses, props.class]">
    <div :class="fieldClasses" :data-variant="props.variant">
      <span v-if="hasLeading" class="flex h-full items-center text-(--color-input-supporting)" aria-hidden="true">
        <slot name="leading" />
      </span>

      <div class="relative flex-1">
        <input
          ref="inputEl"
          v-model="modelValue"
          v-bind="inputAttrs"
          :class="inputClasses"
          @focus="
            isFocused = true;
            $emit('focus', $event);
          "
          @blur="
            isFocused = false;
            $emit('blur', $event);
          "
          @input="$emit('input', $event)"
          @change="$emit('change', $event)"
        />

        <label v-if="props.label" :for="inputId" class="input-label md3-label" :class="densityTokens.labelFloatTop">
          {{ props.label }}
        </label>
      </div>

      <span v-if="hasTrailing" class="flex h-full items-center text-(--color-input-supporting)" aria-hidden="true">
        <slot name="trailing" />
      </span>
    </div>

    <div class="flex items-start justify-between">
      <p v-if="props.supportingText || hasSupportingSlot" :id="helperId" :class="supportingClasses" aria-live="polite">
        <slot name="supporting">{{ props.supportingText }}</slot>
      </p>

      <div v-if="props.showCounter && props.maxLength" :id="`${inputId}-counter`" class="ml-auto text-xs tabular-nums text-(--color-input-supporting)">{{ rawValue.length }}/{{ props.maxLength }}</div>
    </div>
  </div>
</template>
