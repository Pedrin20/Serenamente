import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/ui/app-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { Brand, Radius, Spacing } from '@/constants/theme';
import { getFaixa, getProfissional, horarios } from '@/constants/mock-data';

export default function PerfilScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const profissional = getProfissional(id);
  const faixa = getFaixa(profissional.faixaId);

  const [favorito, setFavorito] = useState(false);
  const [horarioId, setHorarioId] = useState('h2');
  const [confirmado, setConfirmado] = useState(false);

  const horario = horarios.find((h) => h.id === horarioId);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <AppHeader
        onBack={() => router.back()}
        right={
          <Pressable
            onPress={() => setFavorito((v) => !v)}
            hitSlop={8}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <Icon
              name={favorito ? 'heartFill' : 'heart'}
              size={19}
              color={favorito ? Brand.danger : Brand.text}
            />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Identidade */}
        <Card style={styles.identity}>
          <Avatar name={profissional.nome} size={96} />
          <Badge label={`Registro Ativo ${profissional.registro} · Verificado`} />
          <Text style={styles.nome}>{profissional.nome}</Text>
          <Text style={styles.titulo}>{profissional.titulo}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="star" size={14} color={Brand.star} />
              <Text style={styles.metaValue}>{profissional.avaliacao.toFixed(1)}</Text>
              <Text style={styles.metaLabel}>({profissional.avaliacoes} avaliações)</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Icon name="clock" size={14} color={Brand.primary} />
              <Text style={styles.metaValue}>{profissional.experiencia} anos</Text>
              <Text style={styles.metaLabel}>de experiência clínica</Text>
            </View>
          </View>
        </Card>

        {/* Especialidades */}
        <View style={styles.block}>
          <Text style={styles.overline}>Especialidades Clínicas</Text>
          <View style={styles.tags}>
            {profissional.especialidades.map((e) => (
              <Chip key={e} label={e} soft />
            ))}
          </View>
        </View>

        {/* Vídeo de apresentação (sem assets: bloco ilustrado) */}
        <Pressable style={({ pressed }) => [styles.pressed, pressed && { opacity: 0.85 }]}>
          <Card tone="mint" style={styles.videoCard}>
            <View style={styles.playCircle}>
              <Icon name="play" size={18} color={Brand.onPrimary} />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Vídeo de Apresentação · {profissional.video}</Text>
              <Text style={styles.videoSub}>
                Conheça o tom e o espaço acolhedor de {profissional.nome.replace('Dra. ', '').replace('Dr. ', '')}
              </Text>
            </View>
          </Card>
        </Pressable>

        {/* Sobre mim */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          {profissional.sobre.map((paragrafo) => (
            <Text key={paragrafo} style={styles.paragrafo}>
              {paragrafo}
            </Text>
          ))}
        </View>

        {/* Agendamento */}
        <Card style={styles.agenda}>
          <View style={styles.agendaHead}>
            <View style={styles.agendaTitleRow}>
              <Icon name="calendar" size={16} color={Brand.primary} />
              <Text style={styles.sectionTitle}>Escolha o horário</Text>
            </View>
            <Text style={styles.agendaHint}>Sessões de 50 min · online</Text>
          </View>

          <View style={styles.slots}>
            {horarios.map((h) => {
              const selected = h.id === horarioId;
              return (
                <Pressable
                  key={h.id}
                  onPress={() => {
                    setHorarioId(h.id);
                    setConfirmado(false);
                  }}
                  style={({ pressed }) => [
                    styles.slot,
                    selected && styles.slotSelected,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.slotDia, selected && styles.slotTextSelected]}>{h.dia}</Text>
                  <Text style={[styles.slotHora, selected && styles.slotTextSelected]}>
                    {h.hora}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.faixaRow}>
            <View style={styles.faixaInfo}>
              <Text style={styles.faixaNome}>Faixa {faixa.nome}</Text>
              <Text style={styles.faixaValor}>{faixa.valor} por sessão</Text>
            </View>
            <Chip
              label="Trocar faixa"
              soft
              onPress={() => router.back()}
              icon="sort"
            />
          </View>
          <Text style={styles.faixaNota}>
            Valor escalonado por renda, sem comprovação documental. {faixa.descricao}
          </Text>
        </Card>

        {confirmado && (
          <Card tone="mint" style={styles.confirmado}>
            <Icon name="check" size={18} color={Brand.primary} />
            <View style={styles.confirmadoInfo}>
              <Text style={styles.confirmadoTitle}>Sessão agendada</Text>
              <Text style={styles.confirmadoText}>
                {horario?.dia} às {horario?.hora} com {profissional.nome}
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>

      {/* Rodapé de ação */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerValor}>{faixa.valor}</Text>
          <Text style={styles.footerNota}>
            {horario ? `${horario.dia} · ${horario.hora}` : 'Escolha um horário'}
          </Text>
        </View>
        <Button
          label={confirmado ? 'Agendado ✓' : 'Agendar sessão'}
          onPress={() => setConfirmado(true)}
          disabled={!horario}
          style={styles.footerBtn}
        />
      </View>
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
    paddingBottom: Spacing.six,
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
  identity: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: Brand.text,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  titulo: {
    fontSize: 14,
    color: Brand.textMuted,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Brand.text,
  },
  metaLabel: {
    fontSize: 12.5,
    color: Brand.textFaint,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: Brand.border,
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    flex: 1,
    gap: 2,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Brand.text,
  },
  videoSub: {
    fontSize: 13,
    color: Brand.textMuted,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Brand.text,
  },
  paragrafo: {
    fontSize: 14,
    lineHeight: 22,
    color: Brand.textMuted,
  },
  agenda: {
    gap: Spacing.three,
  },
  agendaHead: {
    gap: 2,
  },
  agendaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  agendaHint: {
    fontSize: 12.5,
    color: Brand.textFaint,
  },
  slots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  slot: {
    flexGrow: 1,
    flexBasis: '28%',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Brand.border,
    backgroundColor: Brand.card,
    gap: 1,
  },
  slotSelected: {
    borderColor: Brand.primary,
    backgroundColor: Brand.primarySoft,
  },
  slotDia: {
    fontSize: 11.5,
    color: Brand.textFaint,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  slotHora: {
    fontSize: 15,
    fontWeight: '700',
    color: Brand.text,
  },
  slotTextSelected: {
    color: Brand.primaryStrong,
  },
  faixaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    backgroundColor: Brand.primaryMint,
    borderWidth: 1,
    borderColor: '#DCEBDF',
    borderRadius: Radius.md,
    padding: Spacing.two,
  },
  faixaInfo: {
    flex: 1,
    gap: 1,
  },
  faixaNome: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.primaryStrong,
  },
  faixaValor: {
    fontSize: 12.5,
    color: Brand.textMuted,
  },
  faixaNota: {
    fontSize: 12.5,
    lineHeight: 19,
    color: Brand.textFaint,
  },
  confirmado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  confirmadoInfo: {
    flex: 1,
    gap: 1,
  },
  confirmadoTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Brand.text,
  },
  confirmadoText: {
    fontSize: 13,
    color: Brand.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    backgroundColor: Brand.card,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
  },
  footerInfo: {
    flex: 1,
    gap: 1,
  },
  footerValor: {
    fontSize: 17,
    fontWeight: '800',
    color: Brand.primaryStrong,
  },
  footerNota: {
    fontSize: 12.5,
    color: Brand.textFaint,
  },
  footerBtn: {
    flexGrow: 1,
    flexShrink: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
