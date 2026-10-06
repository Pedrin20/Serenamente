import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { Brand, Radius, Spacing } from '@/constants/theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'night';
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  style,
}: ButtonProps) {
  const palette = variants[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {icon && <Icon name={icon} size={18} color={palette.fg} />}
      <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
    </Pressable>
  );
}

const variants = {
  primary: { bg: Brand.primary, fg: Brand.onPrimary, border: Brand.primary },
  secondary: { bg: Brand.card, fg: Brand.primary, border: Brand.borderStrong },
  danger: { bg: Brand.danger, fg: '#FFFFFF', border: Brand.danger },
  night: { bg: 'rgba(255,255,255,0.12)', fg: Brand.nightText, border: 'rgba(255,255,255,0.16)' },
} as const;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
});
