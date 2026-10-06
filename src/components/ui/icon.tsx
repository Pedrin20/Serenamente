import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

/**
 * Chave amigável -> nome da symbol em cada plataforma.
 * iOS usa SF Symbols, Android/web usam Material Symbols (expo-symbols).
 */
const icons = {
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  leaf: { ios: 'leaf', android: 'eco', web: 'eco' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  filter: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  chevronDown: { ios: 'chevron.down', android: 'expand_more', web: 'expand_more' },
  arrowLeft: { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  arrowUpRight: { ios: 'arrow.up.right', android: 'trending_up', web: 'trending_up' },
  sort: { ios: 'arrow.up.arrow.down', android: 'swap_vert', web: 'swap_vert' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  heartFill: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  verified: { ios: 'checkmark.shield.fill', android: 'verified', web: 'verified' },
  shield: { ios: 'shield', android: 'shield', web: 'shield' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  person: { ios: 'person.fill', android: 'person', web: 'person' },
  people: { ios: 'person.2.fill', android: 'group', web: 'group' },
  chart: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  wallet: { ios: 'creditcard.fill', android: 'account_balance_wallet', web: 'account_balance_wallet' },
  smiley: { ios: 'face.smiling', android: 'sentiment_satisfied', web: 'sentiment_satisfied' },
  mic: { ios: 'mic.fill', android: 'mic', web: 'mic' },
  micOff: { ios: 'mic.slash.fill', android: 'mic_off', web: 'mic_off' },
  video: { ios: 'video.fill', android: 'videocam', web: 'videocam' },
  videoOff: { ios: 'video.slash.fill', android: 'videocam_off', web: 'videocam_off' },
  chat: { ios: 'message.fill', android: 'chat_bubble', web: 'chat_bubble' },
  more: { ios: 'ellipsis', android: 'more_horiz', web: 'more_horiz' },
  hangUp: { ios: 'phone.down.fill', android: 'call_end', web: 'call_end' },
  sparkles: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  help: { ios: 'questionmark.circle', android: 'help', web: 'help' },
} as const satisfies Record<string, SymbolViewProps['name']>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={icons[name]}
      size={size}
      tintColor={color}
      style={[styles.icon, { width: size, height: size }, style]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
