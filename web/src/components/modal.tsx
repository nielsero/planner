import { X } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({
  base: "rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5",

  variants: {
    size: {
      default: "w-auto",
      lg: "w-[640px]",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

type ModalProps = {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
} & ComponentProps<"div"> &
  VariantProps<typeof modalVariants>;

export function Modal({
  title,
  description,
  onClose,
  children,
  size,
  className,
  ...props
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div {...props} className={modalVariants({ size, className })}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={onClose} />
            </button>
          </div>
          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
