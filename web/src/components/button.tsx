import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 py-2 font-medium disabled:pointer-events-none disabled:opacity-50",

  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, className })}>
      {children}
    </button>
  );
}
