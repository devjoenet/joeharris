<script setup lang="ts">
  import { inject, onMounted, ref, watch } from "vue";
  import { inputInjectionKey } from "./index";

  const ctx = inject(inputInjectionKey);
  if (!ctx) throw new Error("InputTextarea must be used within Input");

  const textareaRef = ref<HTMLTextAreaElement>();

  const resize = () => {
    if (!ctx.props.autoGrow || !textareaRef.value) return;
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  };

  onMounted(resize);
  watch(() => ctx.props.modelValue, resize);

  const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    ctx.emit("update:modelValue", target.value);
    resize();
  };
</script>

<template>
  <textarea
    ref="textareaRef"
    :id="ctx.inputId"
    :disabled="ctx.props.disabled"
    :aria-invalid="ctx.props.error"
    class="peer w-full resize-none border-0 bg-transparent text-base font-medium text-foreground caret-primary placeholder:text-transparent focus:outline-none"
    :value="ctx.props.modelValue"
    @input="onInput"
    @focus="ctx.isFocused.value = true"
    @blur="ctx.isFocused.value = false"
    rows="1"
  />
</template>
