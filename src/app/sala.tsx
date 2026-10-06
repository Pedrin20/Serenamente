import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Brand, Radius, Spacing } from '@/constants/theme';
import { getProfissional } from '@/constants/mock-data';

const DURACAO_MIN = 50;

export default function SalaScreen() {
  const profissional = getProfissional('helena');

  const [segundos, setSegundos] = useState(0);
  const [microfone, setMicrofone] = useState(true);
  const [camera, setCamera] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSegundos = DURACAO_MIN * 60;
  const excedeu = segundos > totalSegundos;
  const tempo = formatar(segundos);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      {/* Cabeçalho da sala */}
      <View style={styles.topBar}>
        <View style={styles.pill}>
          <Icon name="shield" size={13} color="#8FE3B0" />
          <Text style={styles.pillText}>Sala segura</Text>
        </View>

        <View style={[styles.pill, excedeu && styles.pillAlerta]}>
          <Icon name="clock" size={13} color={excedeu ? '#FFD9D9' : '#8FE3B0'} />
          <Text style={[styles.pillText, excedeu && styles.pillTextAlerta]}>
            {tempo} / {DURACAO_MIN} min
          </Text>
        </View>

        <Pressable hitSlop={8} style={({ pressed }) => [styles.roundSm, pressed && styles.pressed]}>
          <Icon name="help" size={17} color={Brand.nightText} />
        </Pressable>
      </View>

      {/* Vídeo */}
      <View style={styles.videoArea}>
        <View style={styles.videoBox}>
          <View style={styles.center}>
            <Avatar name={profissional.nome} size={120} tone="night" />
            <Text style={styles.aguardando}>Conectado · imagem em simulação</Text>
          </View>

          {/* Autoimagem */}
          <View style={styles.selfie}>
            <Avatar name="Mariana Souza" size={44} tone="night" />
            <Text style={styles.selfieLabel}>Você</Text>
          </View>

          {/* Identificação */}
          <View style={styles.identificacao}>
            <Text style={styles.videoNome}>{profissional.nome}</Text>
            <View style={styles.crpRow}>
              <Icon name="verified" size={13} color="#8FE3B0" />
              <Text style={styles.videoCrp}>{profissional.registro}</Text>
            </View>
          </View>
        </View>

        {/* Faixa de abordagem */}
        <View style={styles.abordagem}>
          <Text style={styles.abordagemLabel}>Abordagem</Text>
          <Text style={styles.abordagemTexto}>{profissional.abordagem}</Text>
        </View>
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        <Control
          ativo={microfone}
          icon={microfone ? 'mic' : 'micOff'}
          label={microfone ? 'Mudo' : 'Som ligado'}
          onPress={() => setMicrofone((v) => !v)}
        />
        <Control
          ativo={camera}
          icon={camera ? 'video' : 'videoOff'}
          label={camera ? 'Câmera' : 'Câmera off'}
          onPress={() => setCamera((v) => !v)}
        />
        <View style={styles.controlWrap}>
          <View style={styles.control}>
            <Icon name="chat" size={20} color={Brand.nightText} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.controlLabel}>Chat</Text>
        </View>
        <View style={styles.controlWrap}>
          <View style={styles.control}>
            <Icon name="more" size={20} color={Brand.nightText} />
          </View>
          <Text style={styles.controlLabel}>Mais</Text>
        </View>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.hangup, pressed && styles.pressed]}>
          <Icon name="hangUp" size={22} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Control({
  ativo,
  icon,
  label,
  onPress,
}: {
  ativo: boolean;
  icon: 'mic' | 'micOff' | 'video' | 'videoOff';
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.controlWrap}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.control,
          !ativo && styles.controlOff,
          pressed && styles.pressed,
        ]}>
        <Icon name={icon} size={20} color={ativo ? Brand.nightText : '#FF9B9B'} />
      </Pressable>
      <Text style={styles.controlLabel}>{label}</Text>
    </View>
  );
}

function formatar(total: number) {
  const minutos = Math.floor(total / 60);
  const segundos = total % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.night,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  pillAlerta: {
    backgroundColor: 'rgba(229, 72, 77, 0.22)',
    borderColor: 'rgba(229, 72, 77, 0.45)',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.nightText,
    fontVariant: ['tabular-nums'],
  },
  pillTextAlerta: {
    color: '#FFD9D9',
  },
  roundSm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  videoBox: {
    flex: 1,
    borderRadius: Radius.xl,
    backgroundColor: Brand.nightSurface,
    borderWidth: 1,
    borderColor: Brand.nightBorder,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  aguardando: {
    fontSize: 12.5,
    color: Brand.nightMuted,
  },
  selfie: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    width: 92,
    height: 124,
    borderRadius: Radius.md,
    backgroundColor: '#0B1710',
    borderWidth: 1,
    borderColor: Brand.nightBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  selfieLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Brand.nightText,
  },
  identificacao: {
    position: 'absolute',
    left: Spacing.three,
    bottom: Spacing.three,
    gap: 2,
  },
  videoNome: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  crpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  videoCrp: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#B9D9C6',
  },
  abordagem: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Brand.nightBorder,
    padding: Spacing.two,
    gap: 1,
  },
  abordagemLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: Brand.nightMuted,
  },
  abordagemTexto: {
    fontSize: 13.5,
    color: Brand.nightText,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  controlWrap: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  control: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOff: {
    backgroundColor: 'rgba(229, 72, 77, 0.16)',
    borderColor: 'rgba(229, 72, 77, 0.35)',
  },
  controlLabel: {
    fontSize: 11,
    color: Brand.nightMuted,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: Brand.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  hangup: {
    width: 64,
    height: 52,
    borderRadius: 26,
    backgroundColor: Brand.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.one,
  },
  pressed: {
    opacity: 0.75,
  },
});
