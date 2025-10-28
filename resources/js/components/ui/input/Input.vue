<script setup lang="ts">
  import { provide, ref, useId } from "vue";
  import InputRoot from "./InputRoot.vue";
  import InputLabel from "./InputLabel.vue";
  import InputField from "./InputField.vue";
  import InputDescription from "./InputDescription.vue";
  import InputTextarea from "./InputTextarea.vue";
  import { inputInjectionKey, type InputContext } from "./index";

  const props = withDefaults(defineProps<InputContext["props"] & { multiline?: boolean }>(), {
    variant: "filled",
    density: "default",
    multiline: false,
  });

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();

  const isFocused = ref(false);
  const inputId = props.id ?? useId();

  const ctx: InputContext = { props, emit, isFocused, inputId };
  provide(inputInjectionKey, ctx);
</script>

<template>
  <InputRoot :variant="props.variant" :density="props.density" :error="props.error" :disabled="props.disabled">
    <template #leading>
      <slot name="leading" />
    </template>

    <template #trailing>
      <slot name="trailing" />
    </template>

    <InputLabel v-if="props.label" />
    <component :is="props.multiline ? InputTextarea : InputField" />
  </InputRoot>

  <InputDescription v-if="props.supportingText" />
</template>
