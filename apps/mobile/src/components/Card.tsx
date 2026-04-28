import { View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
}

export function Card({ children, className = '', ...rest }: CardProps & { className?: string }) {
  return (
    <View
      {...rest}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-ink-100 ${className}`}
    >
      {children}
    </View>
  );
}
