import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export function Input({ className, children, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      <input
        className={cn(
          "text-white border-0 h-9 outline-none mb-3 flex w-96 bg-amber-600 py-1 px-2 rounded-md pr-10",
          className
        )}
        {...props}
      />
      {children && (
        <div className="absolute right-0 cursor-pointer text-white size-7">
          {children}
        </div>
      )}
    </div>
  );
}
