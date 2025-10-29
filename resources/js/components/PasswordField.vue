<script setup lang="ts">
  import { computed } from "vue";
  import { usePasswordToggle } from "@/composables/usePasswordToggle";
  import { Input } from "@/components/ui/input";
  import { Lock } from "lucide-vue-next";

  const props = defineProps<{
    modelValue: string;
    label?: string;
    error?: boolean;
    supportingText?: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();

  // Proxy model for proper v-model binding
  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });

  const toggle = usePasswordToggle();
</script>

<template>
  <Input v-model="model" :type="toggle.inputType" :label="props.label || 'Password'" :error="props.error" :supporting-text="props.supportingText" variant="outlined">
    <template #leading>
      <Lock class="h-4 w-4" />
    </template>

    <template #trailing>
      <button type="button" class="text-muted-foreground hover:text-foreground transition" @click="toggle.toggle" :aria-label="toggle.toggleLabel.value">
        <component :is="toggle.Icon" class="h-4 w-4" />
      </button>
    </template>
  </Input>
</template>
