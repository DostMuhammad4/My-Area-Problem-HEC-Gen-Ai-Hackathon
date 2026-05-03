import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover, padding = 'md' }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border shadow-sm',
        paddings[padding],
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary/20',
        className
      )}
    >
      {children}
    </div>
  );
}
