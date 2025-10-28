<script setup lang="ts">
  import { inject } from "vue";
  import { inputInjectionKey } from "./index";

  const ctx = inject(inputInjectionKey);
  if (!ctx) throw new Error("InputField must be used within Input");

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    ctx.emit("update:modelValue", target.value);
  };
</script>

<template>
  <input
    :id="ctx.inputId"
    :disabled="ctx.props.disabled"
    :aria-invalid="ctx.props.error"
    class="peer w-full border-0 bg-transparent text-base font-medium text-foreground caret-primary placeholder:text-transparent focus:outline-none"
    :value="ctx.props.modelValue"
    @input="onInput"
    @focus="ctx.isFocused.value = true"
    @blur="ctx.isFocused.value = false"
  />
</template>
