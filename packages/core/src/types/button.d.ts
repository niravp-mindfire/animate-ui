import { BaseAnimationProps } from './common';

export interface ButtonProps extends BaseAnimationProps {
  children?: React.ReactNode;
  scale?: number;
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
}
