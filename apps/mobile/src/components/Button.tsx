import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  fullWidth?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const baseByVariant: Record<Variant, string> = {
  primary: 'bg-brand-600 active:bg-brand-700',
  secondary: 'bg-brand-50 active:bg-brand-100',
  outline: 'bg-white border border-ink-200',
  ghost: 'bg-transparent',
  danger: 'bg-danger active:opacity-90',
};

const textByVariant: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-brand-700',
  outline: 'text-ink-700',
  ghost: 'text-brand-600',
  danger: 'text-white',
};

const padBySize = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = true,
  leading,
  trailing,
  size = 'lg',
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center rounded-2xl ${padBySize[size]} ${baseByVariant[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50' : ''}`}
    >
      {leading ? <View className="mr-2">{leading}</View> : null}
      <Text className={`font-semibold text-base ${textByVariant[variant]}`}>{label}</Text>
      {trailing ? <View className="ml-2">{trailing}</View> : null}
    </Pressable>
  );
}
