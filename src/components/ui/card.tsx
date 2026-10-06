import { StyleSheet, View, type ViewProps } from 'react-native';

import { Brand, Radius, Spacing } from '@/constants/theme';

type CardProps = ViewProps & {
  /** Fundo alternativo (verde bem claro) para destacar blocos. */
  tone?: 'card' | 'mint';
};

export function Card({ style, tone = 'card', children, ...rest }: CardProps) {
  return (
    <View style={[styles.card, tone === 'mint' && styles.mint, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Brand.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Brand.border,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  mint: {
    backgroundColor: Brand.primaryMint,
    borderColor: '#DCEBDF',
  },
});
