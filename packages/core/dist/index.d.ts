import React$1 from 'react';

type AnimationDuration = 'fast' | 'normal' | 'slow';
type EasingFunction = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'springLight'
  | 'springMedium'
  | 'springHeavy';

interface BaseAnimationProps {
  duration?: AnimationDuration | number;
  delay?: number;
  easing?: EasingFunction;
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
}

interface FadeProps extends BaseAnimationProps {
  children?: ReactNode;
  opacity?: number;
}

interface SlideProps extends BaseAnimationProps {
  children?: React.ReactNode;
  duration?: number;
  delay?: number;
  easing?: "easeIn" | "easeOut" | "linear" | "easeInOut";
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

declare const Fade: React$1.FC<FadeProps>;

declare const Slide: React$1.FC<SlideProps>;

interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "medium" | "large";
    isLoading?: boolean;
    animation?: "fade" | "scale" | "bounce";
}
declare const Button: React$1.FC<ButtonProps>;

export { Button, type ButtonProps, Fade, Slide };
