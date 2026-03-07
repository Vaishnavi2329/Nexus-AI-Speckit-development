"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  scrollable?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-12',
  xl: 'p-12 sm:p-16'
};

export function Layout({
  children,
  className,
  maxWidth = '7xl',
  padding = 'md',
  centered = true,
  scrollable = true
}: LayoutProps) {
  return (
    <div
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centered && 'mx-auto',
        !scrollable && 'overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

// Section wrapper for page sections
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'none' | 'light' | 'dark' | 'gradient' | 'muted';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const backgroundClasses = {
  none: '',
  light: 'bg-background',
  dark: 'bg-gray-900 text-white',
  gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900',
  muted: 'bg-muted'
};

export function Section({
  children,
  className,
  id,
  background = 'none',
  padding = 'lg',
  fullWidth = false
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full',
        backgroundClasses[background],
        padding === 'sm' && 'py-12',
        padding === 'md' && 'py-16',
        padding === 'lg' && 'py-20',
        padding === 'xl' && 'py-24',
        padding === 'none' && '',
        !fullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </section>
  );
}

// Container wrapper for consistent spacing
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

const containerSizeClasses = {
  sm: 'max-w-4xl',
  md: 'max-w-6xl',
  lg: 'max-w-7xl',
  xl: 'max-w-full',
  full: 'max-w-full'
};

export function Container({
  children,
  className,
  size = 'lg',
  centered = true
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 sm:px-6 lg:px-8',
        containerSizeClasses[size],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

// Grid wrapper for responsive layouts
interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const gridColsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12'
};

const gridGapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
};

export function Grid({
  children,
  className,
  cols = 1,
  gap = 'md',
  responsive = true
}: GridProps) {
  const responsiveClasses = responsive
    ? {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-1 lg:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
        5: 'md:grid-cols-3 lg:grid-cols-5',
        6: 'md:grid-cols-3 lg:grid-cols-6',
        12: 'md:grid-cols-6 lg:grid-cols-12'
      }[cols] || ''
    : '';

  return (
    <div
      className={cn(
        'grid',
        gridColsClasses[cols],
        gridGapClasses[gap],
        responsiveClasses,
        className
      )}
    >
      {children}
    </div>
  );
}

// Flex wrapper for flexible layouts
interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const flexDirectionClasses = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse'
};

const flexAlignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline'
};

const flexJustifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
};

const flexWrapClasses = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse'
};

const flexGapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  none: ''
};

export function Flex({
  children,
  className,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 'md'
}: FlexProps) {
  return (
    <div
      className={cn(
        'flex',
        flexDirectionClasses[direction],
        flexAlignClasses[align],
        flexJustifyClasses[justify],
        flexWrapClasses[wrap],
        flexGapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

// Stack wrapper for vertical spacing
interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const stackSpacingClasses = {
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8'
};

const stackAlignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
};

export function Stack({
  children,
  className,
  spacing = 'md',
  align = 'start'
}: StackProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        stackSpacingClasses[spacing],
        stackAlignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}

// Spacer component for adding space
interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  vertical?: boolean;
}

const spacerSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-12 h-12'
};

export function Spacer({ size = 'md', vertical = false }: SpacerProps) {
  return (
    <div
      className={cn(
        spacerSizeClasses[size],
        vertical && 'w-full'
      )}
    />
  );
}
