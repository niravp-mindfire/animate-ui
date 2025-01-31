interface Component {
    name: string;
    content: string;
    dependencies?: string[];
  }
  
  export async function getAvailableComponents(): Promise<Component[]> {
    // This would typically load from a registry or local templates
    return [
      {
        name: 'slide',
        content: `import { motion } from 'framer-motion';
  import { cn } from '@/utils/cn';
  
  interface SlideProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    className?: string;
  }
  
  export const Slide = ({
    children,
    direction = 'up',
    duration = 0.4,
    className
  }: SlideProps) => {
    const slideVariants = {
      initial: {
        opacity: 0,
        x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
        y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0
      },
      exit: {
        opacity: 0,
        x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
        y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0
      }
    };
  
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        transition={{ duration }}
        className={cn('', className)}
      >
        {children}
      </motion.div>
    );
  };`,
        dependencies: ['framer-motion']
      },
      {
        name: 'fade',
        content: `import { motion } from 'framer-motion';
  import { cn } from '@/utils/cn';
  
  interface FadeProps {
    children: React.ReactNode;
    duration?: number;
    className?: string;
  }
  
  export const Fade = ({
    children,
    duration = 0.4,
    className
  }: FadeProps) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        className={cn('', className)}
      >
        {children}
      </motion.div>
    );
  };`,
        dependencies: ['framer-motion']
      },
      {
        name: "Button",
        content: `import React from "react";
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
  };`,
        dependencies: ["framer-motion", "@radix-ui/react-slot", "clsx"],
      },
    ];
  }
  