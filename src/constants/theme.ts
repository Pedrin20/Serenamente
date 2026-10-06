/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/**
 * Paleta do Serenamente: verde "refúgio", fundos suaves e cartões brancos.
 * As telas iniciais usam esta paleta diretamente (design light-first).
 */
export const Brand = {
  screen: '#F3F7F3',
  card: '#FFFFFF',
  border: '#E2EAE3',
  borderStrong: '#CFDCD2',
  primary: '#1E6B41',
  primaryStrong: '#14512F',
  primarySoft: '#E6F4EB',
  primaryMint: '#F1F8F3',
  text: '#14231B',
  textMuted: '#5D6E64',
  textFaint: '#93A199',
  onPrimary: '#FFFFFF',
  star: '#EBA13A',
  danger: '#E5484D',
  dangerSoft: '#FDECEC',
  night: '#0D1A13',
  nightSurface: '#16241C',
  nightBorder: '#273E31',
  nightText: '#E7F1EA',
  nightMuted: '#9BB1A4',
  track: '#DFE9E1',
} as const;

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
