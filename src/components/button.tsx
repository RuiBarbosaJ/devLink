import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

// Define a interface para as props do componente
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // O children pode ser uma string, um ícone (ReactNode) ou outros elementos
  children: ReactNode;
  className?: string;
}

export function Button({ className, children }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-9 bg-amber-700 rounded-md text-white cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
