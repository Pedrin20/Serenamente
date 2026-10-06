import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { Brand, Radius, Spacing } from '@/constants/theme';

type ChipProps = {
  label: string;
  selected?: boolean;
  /** Visual suave (verde claro), para tags de exibição. */
  soft?: boolean;
  icon?: IconName;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, selected = false, soft = false, icon, onPress, style }: ChipProps) {
  const foreground = selected ? Brand.onPrimary : soft ? Brand.primary : Brand.textMuted;
  const container = [styles.chip, soft && styles.soft, selected && styles.selected, style];
  const content = (
    <>
      {icon && <Icon name={icon} size={14} color={foreground} />}
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
    </>
  );

  if (!onPress) {
    return <View style={container}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [container, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Brand.borderStrong,
    backgroundColor: Brand.card,
  },
  soft: {
    backgroundColor: Brand.primarySoft,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.two,
    paddingVertical: 5,
  },
  selected: {
    backgroundColor: Brand.primary,
    borderColor: Brand.primary,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
  },
});
