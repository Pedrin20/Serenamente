import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Brand, Spacing } from '@/constants/theme';

/** Wordmark do app: folha dentro de um quadradinho verde + nome. */
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const small = size === 'sm';
  return (
    <View style={styles.row}>
      <View style={[styles.mark, small && styles.markSmall]}>
        <Icon name="leaf" size={small ? 14 : 17} color={Brand.primary} />
      </View>
      <Text style={[styles.word, small && styles.wordSmall]}>Serenamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  mark: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Brand.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markSmall: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },
  word: {
    fontSize: 18,
    fontWeight: '700',
    color: Brand.primaryStrong,
    letterSpacing: -0.2,
  },
  wordSmall: {
    fontSize: 16,
  },
});
