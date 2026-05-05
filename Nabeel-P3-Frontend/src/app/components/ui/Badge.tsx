import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'processing' | 'info' | 'destructive';
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}

export function Badge({ variant = 'default', children, className, pulse }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    processing: 'bg-processing/10 text-processing border border-processing/20',
    info: 'bg-info/10 text-info border border-info/20',
    destructive: 'bg-destructive/10 text-destructive border border-destructive/20'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        variants[variant],
        pulse && 'animate-pulse',
        className
      )}
    >
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
      {children}
    </span>
  );
}
