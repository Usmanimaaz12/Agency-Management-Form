import React from "react";
import { cn } from "../../libs/utils/common";

type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light";
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-900 rounded-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-100 rounded-lg",
    success: "bg-blue-500 text-white hover:bg-green-600 rounded-lg",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    info: "bg-cyan-500 text-white hover:bg-cyan-600",
    light: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
