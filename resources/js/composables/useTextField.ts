import { computed, ref, useAttrs, useId, useSlots, type HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";

type Density = "default" | "comfortable" | "compact";
type Variant = "filled" | "outlined";

export interface UseTextFieldProps {
  defaultValue?: string | number;
  modelValue?: string | number;
  label?: string;
  error?: boolean;
  density?: Density;
  variant?: Variant;
  fieldClass?: HTMLAttributes["class"];
  inputClass?: HTMLAttributes["class"];
  type?: HTMLInputElement["type"];
  maxLength?: number;
  showCounter?: boolean;
}

export function useTextField(props: UseTextFieldProps, emit: any) {
  const attrs = useAttrs();
  const slots = useSlots();
  const uid = useId();
  const inputEl = ref<HTMLInputElement | null>(null);
  const isFocused = ref(false);

  const modelValue = useVModel(props as any, "modelValue", emit, {
    passive: true,
    defaultValue: (props as any).defaultValue,
  });

  const hasLeading = computed(() => Boolean(slots.leading));
  const hasTrailing = computed(() => Boolean(slots.trailing));
  const hasSupportingSlot = computed(() => Boolean(slots.supporting));

  const isDisabled = computed(() => {
    const v = (attrs as any).disabled as string | boolean | undefined;
    return v === "" || v === "true" || v === true;
  });

  const isInvalid = computed(() => {
    if (props.error) return true;
    const v = (attrs as any)["aria-invalid"] as string | boolean | undefined;
    return v === "" || v === "true" || v === true;
  });

  const inputId = computed(() => ((attrs as any).id as string) || uid);
  const helperId = computed(() => `${inputId.value}-help`);
  const errorId = computed(() => `${inputId.value}-err`);

  const rawValue = computed(() => {
    const v = (modelValue as any).value ?? (attrs as any).value ?? (props as any).defaultValue;
    return v != null ? String(v) : "";
  });

  const describedBy = computed(() => {
    const ids: string[] = [];
    if (props.showCounter && props.maxLength) ids.push(`${inputId.value}-counter`);
    if (hasSupportingSlot.value || (props as any).supportingText) ids.push(helperId.value);
    return ids.length ? ids.join(" ") : undefined;
  });

  const densityTokens = computed(() => {
    switch (props.density) {
      case "comfortable":
        return { fieldH: "h-12", inputPad: "pt-4 pb-2", labelFloatTopVar: "0.5rem" };
      case "compact":
        return { fieldH: "h-10", inputPad: "pt-3 pb-1", labelFloatTopVar: "0.375rem" };
      default:
        return { fieldH: "h-14", inputPad: "pt-5 pb-2", labelFloatTopVar: "0.5rem" };
    }
  });

  const containerClasses = computed(() => "flex w-full flex-col gap-2");

  // Variant + state using Tailwind classes (no custom CSS)
  const outlinedClasses = "bg-transparent border border-[var(--border)] " + "hover:border-[color-mix(in_srbg,_var(--ring)_30%,_var(--border))] " + "focus-within:border-[var(--ring)] " + "focus-within:ring-[3px] focus-within:ring-[color-mix(in_srbg,_var(--ring)_25%,_transparent)]";

  const filledClasses =
    "border-b border-[var(--border)] " +
    "bg-[color-mix(in_srbg,_var(--secondary)_95%,_var(--background))] " +
    "hover:bg-[color-mix(in_srbg,_var(--secondary)_90%,_var(--background))] " +
    "focus-within:border-b-[var(--ring)] " +
    "focus-within:ring-[1px] focus-within:ring-[color-mix(in_srbg,_var(--ring)_20%,_transparent)]";

  const fieldClasses = computed(() =>
    [
      "relative flex w-full items-center gap-3 rounded-xl px-4 transition-all",
      densityTokens.value.fieldH,
      (props.variant ?? "filled") === "outlined" ? outlinedClasses : filledClasses,
      isDisabled.value ? "opacity-60 cursor-not-allowed" : "",
      isInvalid.value ? (props.variant === "outlined" ? "border-[var(--destructive)] focus-within:ring-[color-mix(in_srbg,_var(--destructive)_25%,_transparent)]" : "border-b-[var(--destructive)] focus-within:ring-[color-mix(in_srbg,_var(--destructive)_20%,_transparent)]") : "",
      props.fieldClass ?? "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const inputClasses = computed(() =>
    [
      "peer block w-full appearance-none border-0 bg-transparent px-0 text-base font-medium",
      "text-[var(--foreground)] caret-[var(--ring)] outline-none",
      "placeholder:text-transparent selection:bg-[var(--ring)]/90 selection:text-[var(--primary-foreground)]",
      "disabled:cursor-not-allowed disabled:opacity-70",
      densityTokens.value.inputPad,
      "autofill:surface",
      props.inputClass ?? "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const supportingClasses = computed(() => "text-xs font-medium text-[var(--muted-foreground)]");

  const inputAttrs = computed(() => {
    const { class: _c, id: _i, "aria-invalid": _ai, ...delegated } = attrs as any;
    return {
      ...delegated,
      id: inputId.value,
      type: (props.type as any) ?? "text",
      maxlength: props.maxLength,
      placeholder: " ",
      "aria-invalid": isInvalid.value || undefined,
      "aria-describedby": describedBy.value,
      disabled: isDisabled.value || undefined,
    };
  });

  return {
    // state
    modelValue,
    inputEl,
    isFocused,
    // computed
    hasLeading,
    hasTrailing,
    hasSupportingSlot,
    isDisabled,
    isInvalid,
    inputId,
    helperId,
    errorId,
    rawValue,
    densityTokens,
    containerClasses,
    fieldClasses,
    inputClasses,
    supportingClasses,
    inputAttrs,
  };
}
