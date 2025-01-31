import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  animation?: "fade" | "scale" | "bounce";
}

const buttonVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }
  },
  bounce: {
    hidden: { y: -5 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100 } }
  }
};

export const Button: React.FC<ButtonProps> = ({
  asChild = false,
  variant = "primary",
  size = "medium",
  isLoading = false,
  animation = "fade",
  className,
  children,
  ...props
}) => {
  const Component = asChild ? Slot : "button";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={buttonVariants[animation]}
    >
      <Component
        className={clsx(
          "rounded-lg font-medium focus:outline-none focus:ring-2",
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "secondary" && "bg-gray-600 text-white hover:bg-gray-700",
          variant === "outline" && "border border-gray-400 text-gray-800 hover:bg-gray-100",
          size === "small" && "px-2 py-1 text-sm",
          size === "medium" && "px-4 py-2 text-base",
          size === "large" && "px-6 py-3 text-lg",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </Component>
    </motion.div>
  );
};
