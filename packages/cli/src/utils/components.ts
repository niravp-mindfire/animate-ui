interface Component {
  name: string;
  content: string;
  dependencies?: string[];
}

export async function getAvailableComponents(): Promise<Component[]> {
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
      name: 'Button',
      content: `import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, MotionProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'link' | 'icon' | 'text' | 'tooltip';
  animated?: boolean;
  icon?: ReactNode;
  tooltipText?: string;
  href?: string;
  children?: ReactNode;
}

const buttonStyles: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400',
  link: 'text-blue-500 underline hover:text-blue-700',
  icon: 'p-2 rounded-full bg-gray-200 hover:bg-gray-300',
  text: 'bg-transparent text-gray-600 hover:text-gray-900',
  tooltip: 'p-2 rounded-full bg-gray-500 text-white hover:bg-gray-700'
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  animated = true,
  icon,
  tooltipText,
  href,
  children,
  ...props
}) => {
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };

  const buttonClass = \`px-4 py-2 rounded transition-all duration-300 \${buttonStyles[variant]}\`;

  if (variant === 'tooltip' && tooltipText) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              initial={animated ? 'hidden' : undefined}
              animate={animated ? 'visible' : undefined}
              variants={animationVariants}
              className={buttonClass}
              {...props}
            >
              {icon || children}
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              className="bg-black text-white text-sm px-3 py-1 rounded shadow-md"
            >
              {tooltipText}
              <Tooltip.Arrow className="fill-black" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  if (variant === 'link' && href) {
    return (
      <motion.a
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
        variants={animationVariants}
        href={href}
        className="underline text-blue-500 hover:text-blue-700"
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      initial={animated ? 'hidden' : undefined}
      animate={animated ? 'visible' : undefined}
      variants={animationVariants}
      className={buttonClass}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;`,
      dependencies: ['framer-motion', '@radix-ui/react-tooltip']
    }
  ];
}
