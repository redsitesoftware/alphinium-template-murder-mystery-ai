import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useMysteryStore, CHARACTERS } from '../store/mysteryStore';
import { colors, spacing, radius, voiceColors } from '../theme';

export default function LobbyScreen() {
  const { sessionCode, players, isHost, startGame, myCharacter } = useMysteryStore();
  const allJoined = players.length >= 5;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>🕯️ Midnight Manor</Text>
        <Text style={s.sub}>Waiting for the guests to arrive...</Text>

        <View style={s.codeBox}>
          <Text style={s.codeLabel}>ROOM CODE</Text>
          <Text style={s.code}>{sessionCode}</Text>
          <Text style={s.codeSub}>Share this with your fellow suspects</Text>
        </View>

        <Text style={s.sectionLabel}>Guests ({players.length}/5)</Text>
        <View style={s.playerList}>
          {players.map(p => {
            const char = CHARACTERS[p.charId];
            return (
              <View key={p.id} style={[s.playerRow, p.charId === myCharacter && s.playerRowMe]}>
                <Text style={s.playerEmoji}>{char.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.playerName}>{p.name} {p.id === 'p1' || p.charId === myCharacter ? '(You)' : ''}</Text>
                  <Text style={[s.playerChar, { color: voiceColors[char.voice] }]}>{char.name}</Text>
                </View>
                <View style={[s.roleBadge, char.role === 'investigator' && s.roleBadgeInv]}>
                  <Text style={s.roleText}>{char.role === 'investigator' ? '🔍 Investigator' : '🎭 Suspect'}</Text>
                </View>
              </View>
            );
          })}
          {Array.from({ length: Math.max(0, 5 - players.length) }).map((_, i) => (
            <View key={`empty-${i}`} style={[s.playerRow, s.playerRowEmpty]}>
              <Text style={s.playerEmoji}>⏳</Text>
              <Text style={[s.playerName, { color: colors.textMuted }]}>Waiting for guest...</Text>
            </View>
          ))}
        </View>

        {isHost && (
          <TouchableOpacity
            style={[s.startBtn, !allJoined && s.startBtnDim]}
            onPress={startGame}>
            <Text style={s.startBtnText}>{allJoined ? 'Begin the Investigation →' : `Waiting for ${5 - players.length} more...`}</Text>
          </TouchableOpacity>
        )}
        {!isHost && (
          <View style={s.waitBox}>
            <Text style={s.waitText}>Waiting for the host to begin the investigation...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: colors.bg },
  content:        { padding: spacing.lg, alignItems: 'center' },
  title:          { fontSize: 28, fontWeight: '900', color: colors.accent, marginBottom: spacing.sm },
  sub:            { fontSize: 14, color: colors.textMuted, marginBottom: spacing.xl, fontStyle: 'italic' },
  codeBox:        { backgroundColor: colors.card, borderRadius: radius.xl, padding: spacing.xl,
                    alignItems: 'center', width: '100%', marginBottom: spacing.xl,
                    borderWidth: 2, borderColor: colors.accent + '44' },
  codeLabel:      { fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 2 },
  code:           { fontSize: 56, fontWeight: '900', color: colors.accent, letterSpacing: 12, marginVertical: spacing.sm },
  codeSub:        { fontSize: 13, color: colors.textMuted },
  sectionLabel:   { fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5,
                    alignSelf: 'flex-start', marginBottom: spacing.sm },
  playerList:     { width: '100%', gap: spacing.sm, marginBottom: spacing.xl },
  playerRow:      { flexDirection: 'row', alignItems: 'center', gap: spacing.md,
                    backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md,
                    borderWidth: 1, borderColor: colors.cardBorder },
  playerRowMe:    { borderColor: colors.accent, borderWidth: 2 },
  playerRowEmpty: { opacity: 0.4 },
  playerEmoji:    { fontSize: 28 },
  playerName:     { fontSize: 15, fontWeight: '700', color: colors.text },
  playerChar:     { fontSize: 12, fontWeight: '600', marginTop: 2 },
  roleBadge:      { backgroundColor: colors.surface, borderRadius: radius.round,
                    paddingHorizontal: spacing.sm, paddingVertical: 4 },
  roleBadgeInv:   { backgroundColor: colors.primary + '22' },
  roleText:       { fontSize: 11, color: colors.textSub },
  startBtn:       { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md,
                    alignItems: 'center', width: '100%' },
  startBtnDim:    { opacity: 0.5 },
  startBtnText:   { color: colors.white, fontSize: 16, fontWeight: '800' },
  waitBox:        { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                    alignItems: 'center' },
  waitText:       { color: colors.textMuted, fontSize: 14, fontStyle: 'italic' },
});
