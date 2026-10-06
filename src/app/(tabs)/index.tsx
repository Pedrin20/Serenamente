import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/ui/app-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { BottomTabInset, Brand, Radius, Spacing } from '@/constants/theme';
import { faixas, getFaixa, profissionais } from '@/constants/mock-data';

const filtros = [
  { id: 'psicologos', label: 'Psicólogos (CRP)' },
  { id: 'psiquiatras', label: 'Psiquiatras (CRM)' },
  { id: 'tcc', label: 'TCC' },
  { id: 'luto', label: 'Luto' },
];

type FiltroId = (typeof filtros)[number]['id'];

/** No web a barra de abas flutua no topo: reservamos espaço. */
const webContentOffset = Platform.select({ web: { paddingTop: Spacing.six }, default: {} });

export default function BuscaScreen() {
  const [faixaId, setFaixaId] = useState('apoio');
  const [filtro, setFiltro] = useState<FiltroId>('psicologos');
  const [busca, setBusca] = useState('');

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return profissionais.filter((p) => {
      const porCategoria =
        filtro === 'psicologos'
          ? p.categoria === 'psicologo'
          : filtro === 'psiquiatras'
            ? p.categoria === 'psiquiatra'
            : filtro === 'tcc'
              ? p.tags.includes('TCC')
              : p.tags.includes('Luto');
      const porBusca =
        termo.length === 0 ||
        p.nome.toLowerCase().includes(termo) ||
        p.titulo.toLowerCase().includes(termo) ||
        p.especialidades.some((e) => e.toLowerCase().includes(termo));
      return porCategoria && porBusca;
    });
  }, [filtro, busca]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={[styles.content, webContentOffset]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Saudação */}
        <View style={styles.greeting}>
          <View style={styles.greetingRow}>
            <Badge label="Refúgio Seguro" />
            <Text style={styles.date}>Terça-feira, 24 de Outubro</Text>
          </View>
          <Text style={styles.h1}>Olá, Mariana 🌿</Text>
          <Text style={styles.lead}>
            Encontre apoio emocional no seu tempo, com profissionais certificados e acolhimento
            ético.
          </Text>
        </View>

        {/* Programa de Preço Social */}
        <Card>
          <View style={styles.programHead}>
            <View style={styles.leafBox}>
              <Icon name="leaf" size={20} color={Brand.primary} />
            </View>
            <View style={styles.programTitle}>
              <Text style={styles.programName}>Programa de Preço Social</Text>
              <Badge label="Autodeterminação ética" tone="danger" />
            </View>
          </View>
          <Text style={styles.body}>
            Cuidar da mente é um direito fundamental, nunca um privilégio. Nossas consultas sociais
            contam com os mesmos terapeutas experientes e sigilo estrito, sem necessidade de
            comprovar renda ou passar por constrangimentos. Você escolhe a faixa de valor que cabe
            na sua realidade hoje.
          </Text>
          <Pressable style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
            <Text style={styles.link}>Como funciona</Text>
            <Icon name="chevronRight" size={14} color={Brand.primary} />
          </Pressable>
        </Card>

        {/* Faixas de preço social */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Valor da sessão que cabe no seu bolso</Text>
          <Text style={styles.sectionSub}>Valores sociais por consulta</Text>

          <View style={styles.grid}>
            {faixas.map((f) => {
              const selected = f.id === faixaId;
              return (
                <Pressable
                  key={f.id}
                  onPress={() => setFaixaId(f.id)}
                  style={({ pressed }) => [
                    styles.tier,
                    selected && styles.tierSelected,
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.tierHead}>
                    <Text style={[styles.tierNome, selected && styles.tierNomeSelected]}>
                      {f.nome}
                    </Text>
                    {selected && (
                      <View style={styles.tierCheck}>
                        <Icon name="check" size={11} color={Brand.onPrimary} />
                      </View>
                    )}
                  </View>
                  <Text style={[styles.tierValor, selected && styles.tierValorSelected]}>
                    {f.valor}
                  </Text>
                  <Text style={styles.tierNota}>{f.nota}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Busca + filtro */}
        <View style={styles.searchRow}>
          <View style={styles.inputWrap}>
            <Icon name="search" size={18} color={Brand.textFaint} />
            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Ansiedade, TCC, Luto..."
              placeholderTextColor={Brand.textFaint}
              style={styles.input}
              returnKeyType="search"
            />
          </View>
          <Pressable style={({ pressed }) => [styles.filterBtn, pressed && styles.pressed]}>
            <Icon name="filter" size={15} color={Brand.onPrimary} />
            <Text style={styles.filterLabel}>Filtrar</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}>
          {filtros.map((f) => (
            <Chip
              key={f.id}
              label={f.label}
              selected={filtro === f.id}
              onPress={() => setFiltro(f.id)}
            />
          ))}
        </ScrollView>

        {/* Lista de profissionais */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Profissionais Disponíveis</Text>
          <Pressable style={({ pressed }) => [styles.sortRow, pressed && styles.pressed]}>
            <Text style={styles.sortLabel}>Ordenar por</Text>
            <Text style={styles.sortValue}>Relevância</Text>
            <Icon name="chevronDown" size={13} color={Brand.primary} />
          </Pressable>
        </View>

        {lista.length === 0 ? (
          <Card tone="mint" style={styles.empty}>
            <Icon name="search" size={22} color={Brand.primary} />
            <Text style={styles.emptyTitle}>Nenhum profissional encontrado</Text>
            <Text style={styles.emptyText}>
              Tente outro termo ou toque em “Filtrar” para ampliar a busca.
            </Text>
          </Card>
        ) : (
          lista.map((p) => {
            const faixa = getFaixa(p.faixaId);
            const mesmaFaixa = p.faixaId === faixaId;
            return (
              <Pressable
                key={p.id}
                onPress={() => router.push({ pathname: '/perfil', params: { id: p.id } })}
                style={({ pressed }) => [styles.proWrap, pressed && styles.pressed]}>
                <Card>
                  <View style={styles.proTop}>
                    <Avatar name={p.nome} size={52} />
                    <View style={styles.proInfo}>
                      <Text style={styles.proName}>{p.nome}</Text>
                      <Text style={styles.proTitulo}>{p.titulo}</Text>
                      <View style={styles.proRegistroRow}>
                        <Icon name="verified" size={14} color={Brand.primary} />
                        <Text style={styles.proRegistro}>
                          {p.registro} · {p.experiencia} anos de experiência
                        </Text>
                      </View>
                    </View>
                    <Icon name="chevronRight" size={16} color={Brand.textFaint} />
                  </View>

                  <View style={styles.proBottom}>
                    <View style={styles.ratingRow}>
                      <Icon name="star" size={13} color={Brand.star} />
                      <Text style={styles.ratingValue}>{p.avaliacao.toFixed(1)}</Text>
                      <Text style={styles.ratingCount}>({p.avaliacoes} avaliações)</Text>
                    </View>
                    <View style={styles.proBadges}>
                      <Chip label={`${faixa.nome} · ${faixa.valor}`} soft />
                      {mesmaFaixa && <Badge label="Sua faixa" tone="brand" />}
                    </View>
                  </View>

                  <View style={styles.vagaRow}>
                    <Icon name="clock" size={13} color={Brand.textFaint} />
                    <Text style={styles.vagaText}>Próxima vaga: {p.proximaVaga}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })
        )}
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
  greeting: {
    gap: Spacing.one,
    paddingTop: Spacing.one,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 12,
    color: Brand.textFaint,
    fontWeight: '600',
  },
  h1: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
    color: Brand.text,
    letterSpacing: -0.5,
  },
  lead: {
    fontSize: 14,
    lineHeight: 21,
    color: Brand.textMuted,
  },
  programHead: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'flex-start',
  },
  leafBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Brand.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programTitle: {
    flex: 1,
    gap: Spacing.one,
  },
  programName: {
    fontSize: 17,
    fontWeight: '700',
    color: Brand.text,
  },
  body: {
    fontSize: 13.5,
    lineHeight: 21,
    color: Brand.textMuted,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-end',
    paddingVertical: Spacing.one,
  },
  link: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.primary,
  },
  block: {
    gap: Spacing.one,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Brand.text,
  },
  sectionSub: {
    fontSize: 13,
    color: Brand.textFaint,
    marginBottom: Spacing.one,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tier: {
    flexGrow: 1,
    flexBasis: '47%',
    backgroundColor: Brand.card,
    borderWidth: 1.5,
    borderColor: Brand.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: 2,
  },
  tierSelected: {
    borderColor: Brand.primary,
    backgroundColor: Brand.primaryMint,
  },
  tierHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.one,
  },
  tierNome: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: Brand.textFaint,
  },
  tierNomeSelected: {
    color: Brand.primary,
  },
  tierCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierValor: {
    fontSize: 16,
    fontWeight: '700',
    color: Brand.text,
  },
  tierValorSelected: {
    color: Brand.primaryStrong,
  },
  tierNota: {
    fontSize: 12,
    color: Brand.textFaint,
  },
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.three,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Brand.text,
    paddingVertical: 0,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    height: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.lg,
    backgroundColor: Brand.primaryStrong,
  },
  filterLabel: {
    color: Brand.onPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  chipsRow: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
    paddingRight: Spacing.three,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  sortLabel: {
    fontSize: 12,
    color: Brand.textFaint,
  },
  sortValue: {
    fontSize: 12,
    color: Brand.primary,
    fontWeight: '700',
  },
  proWrap: {
    borderRadius: Radius.xl,
  },
  proTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  proInfo: {
    flex: 1,
    gap: 2,
  },
  proName: {
    fontSize: 16,
    fontWeight: '700',
    color: Brand.text,
  },
  proTitulo: {
    fontSize: 12.5,
    color: Brand.textMuted,
  },
  proRegistroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: 2,
  },
  proRegistro: {
    fontSize: 12,
    color: Brand.primary,
    fontWeight: '600',
  },
  proBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Brand.text,
  },
  ratingCount: {
    fontSize: 12,
    color: Brand.textFaint,
  },
  proBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  vagaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    paddingTop: Spacing.two,
  },
  vagaText: {
    fontSize: 12.5,
    color: Brand.textMuted,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Brand.text,
  },
  emptyText: {
    fontSize: 13,
    color: Brand.textMuted,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
