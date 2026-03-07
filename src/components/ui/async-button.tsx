"use client";

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useAsyncOperation } from '@/hooks/use-async-operation';
import { cn } from '@/lib/utils';

interface AsyncButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => Promise<void> | void;
  loadingText?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function AsyncButton({
  children,
  onClick,
  loadingText = 'Loading...',
  disabled = false,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: AsyncButtonProps) {
  const { isLoading, execute } = useAsyncOperation({
    loadingText,
  });

  const handleClick = async () => {
    if (onClick) {
      await execute(async () => {
        await onClick();
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'text-primary underline-offset-4 hover:underline': variant === 'link',
          'h-10 py-2 px-4': size === 'default',
          'h-9 px-3 rounded-md': size === 'sm',
          'h-11 px-8 rounded-md': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 mr-2">
            <ConcentricRingsLoader size={16} color="currentColor" showText={false} />
          </div>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

import ConcentricRingsLoader from './loading-animation-1';
