import { ButtonProps } from '../../types/button';

export const scaleVariants = {
  initial: (props: ButtonProps) => ({
    scale: 1,
    opacity: 0.8,
  }),
  animate: (props: ButtonProps) => ({
    scale: props.scale ?? 1.1, // Default scale if not provided
    opacity: 1,
    transition: {
      duration: props.duration,
      delay: props.delay,
      ease: props.easing,
    },
  }),
  exit: (props: ButtonProps) => ({
    scale: 1,
    opacity: 0,
    transition: {
      duration: props.duration,
      ease: props.easing,
    },
  }),
};
