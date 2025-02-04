import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../hooks/use-animation"; // Assuming you have a custom hook for animation state

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "link" | "icon" | "text";
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
}

const buttonStyles: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
  link: "text-blue-500 underline hover:text-blue-700",
  icon: "p-2 rounded-full bg-gray-200 hover:bg-gray-300",
  text: "bg-transparent text-gray-600 hover:text-gray-900",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  href,
  children,
  onClick,
  icon,
  className,
  ...props
}) => {
  const { isAnimating } = useAnimation({
    disabled,
  });

  const animationVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95 },
  };

  const buttonClass = `px-4 py-2 rounded transition-all duration-300 ${buttonStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        initial="initial"
        animate={isAnimating ? "animate" : "initial"}
        exit="exit"
        variants={animationVariants}
        className={buttonClass}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial="initial"
      animate={isAnimating ? "animate" : "initial"}
      exit="exit"
      variants={animationVariants}
      className={buttonClass}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
