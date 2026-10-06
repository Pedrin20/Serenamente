import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Brand } from '@/constants/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor="#FFFFFF"
      indicatorColor={Brand.primarySoft}
      labelStyle={{ selected: { color: Brand.primary } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Buscar</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="painel">
        <NativeTabs.Trigger.Label>Painel</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
