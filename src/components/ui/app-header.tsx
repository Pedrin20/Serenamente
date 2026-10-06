import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { Brand, Spacing } from '@/constants/theme';

type AppHeaderProps = {
  /** Se fornecido, mostra o botão voltar à esquerda do logo. */
  onBack?: () => void;
  /** Substitui o sino de notificações à direita. */
  right?: ReactNode;
  hideBell?: boolean;
};

export function AppHeader({ onBack, right, hideBell = false }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBack && (
          <Pressable
            onPress={onBack}
            hitSlop={8}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <Icon name="arrowLeft" size={20} color={Brand.text} />
          </Pressable>
        )}
        <Logo />
      </View>

      {right ??
        (hideBell ? null : (
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.iconButton, styles.bell, pressed && styles.pressed]}>
            <Icon name="bell" size={19} color={Brand.text} />
            <View style={styles.dot} />
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: {
    // o ponto fica sobreposto ao canto do ícone
  },
  pressed: {
    opacity: 0.7,
  },
  dot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Brand.danger,
    borderWidth: 1.5,
    borderColor: Brand.card,
  },
});
