// components/input/index.ts
import Input from "./Input.vue";
import InputRoot from "./InputRoot.vue";
import InputField from "./InputField.vue";
import InputLabel from "./InputLabel.vue";
import InputDescription from "./InputDescription.vue";
import InputTextarea from "./InputTextarea.vue";
import type { InjectionKey, Ref } from "vue";

export interface InputContext {
  props: {
    modelValue?: string | number;
    variant?: "filled" | "outlined";
    density?: "default" | "comfortable" | "compact";
    error?: boolean;
    disabled?: boolean;
    label?: string;
    supportingText?: string;
    id?: string;
    autoGrow?: boolean;
  };
  emit: (e: "update:modelValue", value: string | number) => void;
  isFocused: Ref<boolean>;
  inputId: string;
}

export const inputInjectionKey: InjectionKey<InputContext> = Symbol("InputContext");

export { Input, InputRoot, InputField, InputLabel, InputDescription, InputTextarea };
export default Input;
