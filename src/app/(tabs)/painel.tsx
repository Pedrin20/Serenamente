import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/ui/app-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { BottomTabInset, Brand, Radius, Spacing } from '@/constants/theme';
import { atendimentosPendentes, getProfissional } from '@/constants/mock-data';

const stats: { icon: IconName; label: string; valor: string; nota: string }[] = [
  {
    icon: 'people',
    label: 'Sessões realizadas',
    valor: '18',
    nota: '+3 em relação à semana passada',
  },
  {
    icon: 'star',
    label: 'Avaliação média',
    valor: '4,9',
    nota: 'Baseada em 42 feedbacks verificados',
  },
  {
    icon: 'wallet',
    label: 'Repasses este mês',
    valor: 'R$ 1.840',
    nota: 'Próximo fechamento: 10 de Junho',
  },
];

const VAGAS_TOTAIS = 8;
const VAGAS_PREENCHIDAS = 6;

/** No web a barra de abas flutua no topo: reservamos espaço. */
const webContentOffset = Platform.select({ web: { paddingTop: Spacing.six }, default: {} });

export default function PainelScreen() {
  const [plantao, setPlantao] = useState(true);
  const profissional = getProfissional('helena');
  const percentual = Math.round((VAGAS_PREENCHIDAS / VAGAS_TOTAIS) * 100);
  const vagasRestantes = VAGAS_TOTAIS - VAGAS_PREENCHIDAS;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <AppHeader />

      <ScrollView contentContainerStyle={[styles.content, webContentOffset]} showsVerticalScrollIndicator={false}>
        {/* Cartão do profissional */}
        <Card>
          <View style={styles.identity}>
            <Avatar name={profissional.nome} size={56} />
            <View style={styles.identityInfo}>
              <Text style={styles.nome}>{profissional.nome}</Text>
              <View style={styles.registroRow}>
                <Icon name="verified" size={14} color={Brand.primary} />
                <Text style={styles.registro}>{profissional.registro} (Verificado)</Text>
              </View>
              <Text style={styles.especialidades}>
                Especialista em Ansiedade, TCC e Acolhimento em Crises · {profissional.experiencia}{' '}
                anos de atuação clínica
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.plantaoRow}>
            <View style={styles.plantaoInfo}>
              <Text style={styles.plantaoTitulo}>Plantão Emergencial</Text>
              <Text style={styles.plantaoSub}>
                {plantao ? 'Pronto para acolhimento imediato' : 'Indisponível no momento'}
              </Text>
            </View>
            <Switch
              value={plantao}
              onValueChange={setPlantao}
              trackColor={{ false: Brand.track, true: Brand.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={Brand.track}
            />
          </View>
        </Card>

        {/* Indicadores */}
        <View style={styles.block}>
          <Text style={styles.overline}>Seu desempenho</Text>
          {stats.map((s) => (
            <Card key={s.label} style={styles.statCard}>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValor}>{s.valor}</Text>
                <Text style={styles.statNota}>{s.nota}</Text>
              </View>
              <View style={styles.statIcon}>
                <Icon name={s.icon} size={18} color={Brand.primary} />
              </View>
            </Card>
          ))}
        </View>

        {/* Vagas sociais */}
        <Card>
          <View style={styles.vagasHead}>
            <View style={styles.vagasTitle}>
              <Icon name="heartFill" size={16} color={Brand.primary} />
              <Text style={styles.sectionTitle}>Gestão de Vagas Sociais</Text>
            </View>
            <Badge label="Ativo na Rede Social" />
          </View>
          <Text style={styles.vagasTexto}>
            Democratização com acolhimento e sustentabilidade: você define quantas vagas sociais
            abre por semana.
          </Text>

          <View style={styles.metaHead}>
            <Text style={styles.metaLabel}>Progresso da Meta Semanal</Text>
            <Text style={styles.metaValor}>{percentual}% concluído</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${percentual}%` }]} />
          </View>

          <View style={styles.vagasRow}>
            <Text style={styles.vagasText}>
              {VAGAS_PREENCHIDAS} de {VAGAS_TOTAIS} vagas sociais preenchidas nesta semana
            </Text>
            <Badge label={`${vagasRestantes} disponíveis`} tone="neutral" />
          </View>
        </Card>

        {/* Agenda */}
        <View style={styles.block}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Próximos atendimentos</Text>
            <Badge label={`${atendimentosPendentes.length} hoje`} tone="neutral" />
          </View>

          {atendimentosPendentes.map((a) => (
            <Card key={a.id} style={styles.atendimento}>
              <Avatar name={a.paciente} size={44} />
              <View style={styles.atendimentoInfo}>
                <Text style={styles.paciente}>{a.paciente}</Text>
                <View style={styles.atendimentoMeta}>
                  <Icon name="clock" size={13} color={Brand.textFaint} />
                  <Text style={styles.atendimentoHora}>{a.hora}</Text>
                  <Text style={styles.ponto}>·</Text>
                  <Text style={styles.atendimentoFaixa}>{a.faixa}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => router.push('/sala')}
                style={({ pressed }) => [styles.salaBtn, pressed && styles.pressed]}>
                <Icon name="video" size={15} color={Brand.onPrimary} />
                <Text style={styles.salaLabel}>Entrar</Text>
              </Pressable>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.screen,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.five,
  },
  identity: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'flex-start',
  },
  identityInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: Brand.text,
  },
  registroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  registro: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Brand.primary,
  },
  especialidades: {
    fontSize: 13,
    lineHeight: 19,
    color: Brand.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Brand.border,
    marginTop: Spacing.two,
  },
  plantaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  plantaoInfo: {
    flex: 1,
    gap: 1,
  },
  plantaoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: Brand.text,
  },
  plantaoSub: {
    fontSize: 12.5,
    color: Brand.textMuted,
  },
  block: {
    gap: Spacing.two,
  },
  overline: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Brand.textFaint,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  statInfo: {
    flex: 1,
    gap: 1,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: Brand.textFaint,
  },
  statValor: {
    fontSize: 26,
    fontWeight: '800',
    color: Brand.text,
    letterSpacing: -0.5,
  },
  statNota: {
    fontSize: 12.5,
    color: Brand.textMuted,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Brand.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vagasHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  vagasTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Brand.text,
  },
  vagasTexto: {
    fontSize: 13.5,
    lineHeight: 20,
    color: Brand.textMuted,
  },
  metaHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Brand.text,
  },
  metaValor: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Brand.primary,
  },
  track: {
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Brand.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.pill,
    backgroundColor: Brand.primary,
  },
  vagasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  vagasText: {
    flex: 1,
    fontSize: 13,
    color: Brand.textMuted,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingRight: Spacing.one,
  },
  atendimento: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  atendimentoInfo: {
    flex: 1,
    gap: 2,
  },
  paciente: {
    fontSize: 15,
    fontWeight: '700',
    color: Brand.text,
  },
  atendimentoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  atendimentoHora: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Brand.text,
  },
  ponto: {
    fontSize: 12.5,
    color: Brand.textFaint,
  },
  atendimentoFaixa: {
    fontSize: 12.5,
    color: Brand.textMuted,
  },
  salaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: Brand.primary,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
  },
  salaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.onPrimary,
  },
  pressed: {
    opacity: 0.8,
  },
});
