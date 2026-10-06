import { StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/theme';

type AvatarProps = {
  name: string;
  size?: number;
  tone?: 'brand' | 'night';
};

/** Avatar com iniciais — nenhum asset de imagem é usado. */
export function Avatar({ name, size = 48, tone = 'brand' }: AvatarProps) {
  const initials = getInitials(name);
  const isNight = tone === 'night';

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isNight ? '#28493A' : Brand.primarySoft,
        },
      ]}>
      <Text
        style={[
          styles.initials,
          { fontSize: Math.round(size * 0.36), color: isNight ? '#CFE7D8' : Brand.primary },
        ]}>
        {initials}
      </Text>
    </View>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(30, 107, 65, 0.14)',
  },
  initials: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
