import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function Modal({ children, className, ...props }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div
        {...props}
        className={twMerge(
          "w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
