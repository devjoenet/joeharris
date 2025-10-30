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

  const { modelValue, inputEl, isFocused, hasLeading, hasTrailing, hasSupportingSlot, isDisabled, isInvalid, inputId, helperId, errorId, rawValue, densityTokens, containerClasses, fieldClasses, inputClasses, supportingClasses, inputAttrs } = useTextField(props, emit);

  function onFocus(e: FocusEvent) {
    isFocused.value = true;
    emit("focus", e);
  }
  function onBlur(e: FocusEvent) {
    isFocused.value = false;
    emit("blur", e);
  }
  function onInput(e: Event) {
    emit("input", e);
  }
  function onChange(e: Event) {
    emit("change", e);
  }

  defineExpose({
    focus: () => inputEl.value?.focus(),
    blur: () => inputEl.value?.blur(),
  });
</script>

<template>
  <div :class="[containerClasses, props.class]">
    <div :class="fieldClasses" :data-variant="props.variant">
      <span v-if="hasLeading" class="flex h-full items-center text-muted-foreground" aria-hidden="true">
        <slot name="leading" />
      </span>

      <div class="relative flex-1">
        <input ref="inputEl" v-model="modelValue" v-bind="inputAttrs" :class="inputClasses" @focus="onFocus" @blur="onBlur" @input="onInput" @change="onChange" />

        <label
          v-if="props.label"
          :for="inputId"
          class="input-label absolute left-0 top-1/2 -translate-y-1/2 origin-left text-base font-semibold text-muted-foreground transition-all pointer-events-none peer-focus:top-(--label-float-top) peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-foreground peer-[:not(:placeholder-shown)]:top-(--label-float-top) peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          :style="{ '--label-float-top': densityTokens.labelFloatTopVar }"
        >
          {{ props.label }}
        </label>
      </div>

      <span v-if="hasTrailing" class="flex h-full items-center text-muted-foreground" aria-hidden="true">
        <slot name="trailing" />
      </span>
    </div>

    <div class="flex items-start justify-between">
      <p v-if="props.supportingText || hasSupportingSlot" :id="helperId" :class="supportingClasses" aria-live="polite">
        <slot name="supporting">{{ props.supportingText }}</slot>
      </p>

      <div v-if="props.showCounter && props.maxLength" :id="`${inputId}-counter`" class="ml-auto text-xs tabular-nums text-muted-foreground">{{ rawValue.length }}/{{ props.maxLength }}</div>
    </div>
  </div>
</template>
