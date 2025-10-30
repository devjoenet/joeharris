import { computed, useAttrs, useId } from "vue";

type Density = "default" | "comfortable" | "compact";

export function useCheckbox(props: { density?: Density; class?: string; label?: string; supportingText?: string }) {
  const attrs = useAttrs();
  const uid = useId();

  // size variable, consumed by Tailwind arbitrary size classes
  const sizeVar = computed(() => {
    switch (props.density) {
      case "comfortable":
        return "20px";
      case "compact":
        return "16px";
      default:
        return "18px"; // MD3 default
    }
  });

  // field (wrapper label) layout via Tailwind
  const fieldClasses = computed(() => ["inline-flex gap-3 text-[var(--foreground)]", props.supportingText ? "items-start" : "items-center"].filter(Boolean).join(" "));

  // checkbox root styling via Tailwind (uses only base tokens)
  const rootClasses = computed(() =>
    [
      "inline-flex shrink-0 items-center justify-center rounded",
      "w-[var(--cb-size)] h-[var(--cb-size)]",
      "border-[1.5px] border-[var(--border)] bg-[var(--background)]",
      "shadow-sm transition-shadow outline-none",
      "hover:border-[color-mix(in_srbg,_var(--ring)_30%,_var(--border))]",
      "focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srbg,_var(--ring)_40%,_transparent)] focus-visible:border-[var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // checked / indeterminate states
      "data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)]",
      "data-[state=indeterminate]:bg-[var(--primary)] data-[state=indeterminate]:border-[var(--primary)] data-[state=indeterminate]:text-[var(--primary-foreground)]",
      // error
      "aria-invalid:border-[var(--destructive)] aria-invalid:focus-visible:ring-[color-mix(in_srbg,_var(--destructive)_25%,_transparent)]",
      props.class ?? "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const indicatorClasses = "flex items-center justify-center w-full h-full text-current";

  const styleVars = computed(() => ({ "--cb-size": sizeVar.value }));

  // ids / aria
  const baseId = (attrs.id as string) || uid;
  const labelId = `${baseId}-label`;
  const helpId = `${baseId}-help`;

  const describedBy = computed(() => {
    const ids: string[] = [];
    if (props.supportingText) ids.push(helpId);
    return ids.length ? ids.join(" ") : undefined;
  });

  const ariaInvalid = (attrs["aria-invalid"] as any) ?? undefined;

  return {
    baseId,
    labelId,
    helpId,
    describedBy,
    ariaInvalid,
    fieldClasses,
    rootClasses,
    indicatorClasses,
    styleVars,
  };
}
