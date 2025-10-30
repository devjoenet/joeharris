<script setup lang="ts">
  import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
  import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
  import { computed } from "vue";
  import { useCheckbox } from "@/composables/useCheckbox";

  const props = withDefaults(
    defineProps<
      CheckboxRootProps & {
        class?: string;
        density?: "default" | "comfortable" | "compact";
        label?: string;
        supportingText?: string;
      }
    >(),
    {
      density: "default",
    },
  );

  const emits = defineEmits<CheckboxRootEmits>();

  const forwarded = useForwardPropsEmits(
    computed(() => {
      const { class: _c, density: _d, label: _l, supportingText: _s, ...rest } = props;
      return rest;
    }),
    emits,
  );

  const { baseId, labelId, helpId, describedBy, ariaInvalid, fieldClasses, rootClasses, indicatorClasses, styleVars } = useCheckbox(props);
</script>

<template>
  <label :for="baseId" :class="fieldClasses">
    <CheckboxRoot data-slot="checkbox" v-bind="forwarded" :id="baseId" :class="rootClasses + ' group transition-shadow outline-none'" :style="styleVars" :aria-invalid="ariaInvalid" :aria-describedby="describedBy">
      <CheckboxIndicator data-slot="checkbox-indicator" :class="indicatorClasses">
        <svg class="hidden group-data-[state=checked]:block" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7.5l2.5 2.5L11 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg class="hidden group-data-[state=indeterminate]:block" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="3" y="6.25" width="8" height="1.5" rx="0.75" fill="currentColor" />
        </svg>
        <slot />
      </CheckboxIndicator>
    </CheckboxRoot>

    <div v-if="props.label || props.supportingText" class="min-w-0">
      <span v-if="props.label" :id="labelId" class="leading-5 font-semibold text-foreground">{{ props.label }}</span>
      <p v-if="props.supportingText" :id="helpId" class="mt-0.5 text-[0.8125rem] leading-4.5 text-muted-foreground">
        {{ props.supportingText }}
      </p>
    </div>
  </label>
</template>
