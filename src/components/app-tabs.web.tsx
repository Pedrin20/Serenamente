import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Logo } from '@/components/ui/logo';
import { Brand, MaxContentWidth, Radius, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="buscar" href="/" asChild>
            <TabButton>Buscar</TabButton>
          </TabTrigger>
          <TabTrigger name="painel" href="/painel" asChild>
            <TabButton>Painel</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.tabButton,
        isFocused && styles.tabButtonActive,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{children}</Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>
        <Logo size="sm" />

        <View style={styles.spacer} />

        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  spacer: {
    flex: 1,
  },
  tabButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    backgroundColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: Brand.primarySoft,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.textMuted,
  },
  tabLabelActive: {
    color: Brand.primaryStrong,
  },
  pressed: {
    opacity: 0.7,
  },
});
