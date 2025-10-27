import { cva, type VariantProps } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.22)] hover:bg-primary/92 hover:shadow-[0_3px_8px_rgba(0,0,0,0.24),0_6px_12px_rgba(0,0,0,0.22)] active:shadow-[0_1px_2px_rgba(0,0,0,0.22)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.18)] hover:bg-destructive/90 hover:shadow-[0_3px_8px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.18)] focus-visible:ring-destructive/40 active:shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
        outline: "border border-border/70 bg-background/80 text-primary shadow-none hover:border-primary/60 hover:bg-primary/10 dark:bg-input/40 dark:border-border/50 dark:hover:bg-primary/20",
        secondary: "bg-secondary/90 text-primary shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-secondary hover:shadow-[0_3px_8px_rgba(0,0,0,0.18)] dark:bg-secondary/70",
        ghost: "bg-transparent text-primary hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
        elevated: "bg-background text-primary shadow-[0_1px_2px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.18)] hover:bg-background/95 hover:shadow-[0_4px_10px_rgba(0,0,0,0.24)] dark:bg-input/60",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-5",
        sm: "h-9 rounded-full gap-1.5 px-5 py-2 has-[>svg]:px-4",
        lg: "h-12 rounded-full px-7 py-3 text-base has-[>svg]:px-5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
