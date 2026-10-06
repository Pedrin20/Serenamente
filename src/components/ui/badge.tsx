import { StyleSheet, Text, View } from 'react-native';

import { Brand, Radius, Spacing } from '@/constants/theme';

type BadgeTone = 'success' | 'brand' | 'neutral' | 'danger' | 'night';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  uppercase?: boolean;
};

const tones: Record<BadgeTone, { bg: string; fg: string }> = {
  success: { bg: Brand.primarySoft, fg: Brand.primary },
  brand: { bg: Brand.primary, fg: Brand.onPrimary },
  neutral: { bg: '#EEF2EE', fg: Brand.textMuted },
  danger: { bg: Brand.dangerSoft, fg: Brand.danger },
  night: { bg: 'rgba(255,255,255,0.14)', fg: '#E7F1EA' },
};

export function Badge({ label, tone = 'success', uppercase = false }: BadgeProps) {
  const palette = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.label, { color: palette.fg }, uppercase && styles.upper]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  upper: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontSize: 10,
  },
});
