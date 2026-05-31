import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useMysteryStore } from '../store/mysteryStore';
import { colors, spacing, radius, typography } from '../theme';

export default function HomeScreen() {
  const { hostGame, joinGame } = useMysteryStore();
  const [mode, setMode] = useState(null); // null | 'host' | 'join'
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.hero}>
          <Text style={s.skull}>🔪</Text>
          <Text style={s.title}>Murder Mystery AI</Text>
          <Text style={s.sub}>AI generates the suspects, clues, and voices.{'\n'}You solve the crime.</Text>
        </View>

        <View style={s.scenarioCard}>
          <Text style={s.scenarioLabel}>TONIGHT'S CASE</Text>
          <Text style={s.scenarioTitle}>Murder at Midnight Manor</Text>
          <Text style={s.scenarioDesc}>Lord Reginald Ashworth is found dead in his library during a dinner party. Cyanide in the brandy. Five suspects. One murderer. Can you unmask them before they escape?</Text>
          <View style={s.scenarioMeta}>
            <Text style={s.metaItem}>👥 2–5 players</Text>
            <Text style={s.metaItem}>⏱ 20–30 min</Text>
            <Text style={s.metaItem}>🎭 5 characters</Text>
          </View>
        </View>

        {!mode && (
          <View style={s.buttons}>
            <TouchableOpacity style={s.hostBtn} onPress={() => setMode('host')}>
              <Text style={s.hostBtnText}>🎭 Host a Game</Text>
              <Text style={s.hostBtnSub}>Get a room code · Assign characters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.joinBtn} onPress={() => setMode('join')}>
              <Text style={s.joinBtnText}>🚪 Join a Game</Text>
              <Text style={s.joinBtnSub}>Enter room code from host</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'host' && (
          <View style={s.form}>
            <Text style={s.formTitle}>You'll play as Detective Hudson 🔍</Text>
            <TextInput style={s.input} placeholder="Your name" placeholderTextColor={colors.textMuted}
              value={name} onChangeText={setName} />
            <TouchableOpacity style={s.startBtn} onPress={() => name.trim() && hostGame(name.trim())} disabled={!name.trim()}>
              <Text style={s.startBtnText}>Open the Case →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode(null)} style={s.backLink}>
              <Text style={s.backLinkText}>← Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'join' && (
          <View style={s.form}>
            <TextInput style={s.input} placeholder="Your name" placeholderTextColor={colors.textMuted}
              value={name} onChangeText={setName} />
            <TextInput style={s.input} placeholder="Room code (e.g. X4T2)" placeholderTextColor={colors.textMuted}
              value={code} onChangeText={setCode} autoCapitalize="characters" maxLength={4} />
            <TouchableOpacity style={s.startBtn}
              onPress={() => name.trim() && code.trim() && joinGame(code.trim(), name.trim())}
              disabled={!name.trim() || !code.trim()}>
              <Text style={s.startBtnText}>Enter the Manor →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode(null)} style={s.backLink}>
              <Text style={s.backLinkText}>← Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.bg },
  content:      { padding: spacing.lg, alignItems: 'center' },
  hero:         { alignItems: 'center', paddingVertical: spacing.xl },
  skull:        { fontSize: 72, marginBottom: spacing.md },
  title:        { ...typography.hero, color: colors.primary, textAlign: 'center' },
  sub:          { ...typography.body, color: colors.textSub, textAlign: 'center', marginTop: spacing.sm },
  scenarioCard: { backgroundColor: colors.card, borderRadius: radius.xl, padding: spacing.lg,
                  width: '100%', borderWidth: 2, borderColor: colors.primary + '55',
                  marginBottom: spacing.xl },
  scenarioLabel:{ fontSize: 10, color: colors.primary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: spacing.sm },
  scenarioTitle:{ fontSize: 22, fontWeight: '900', color: colors.accent, marginBottom: spacing.sm },
  scenarioDesc: { fontSize: 14, color: colors.textSub, lineHeight: 22, marginBottom: spacing.md },
  scenarioMeta: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  metaItem:     { fontSize: 13, color: colors.textMuted },
  buttons:      { width: '100%', gap: spacing.md },
  hostBtn:      { backgroundColor: colors.primary, borderRadius: radius.lg,
                  padding: spacing.lg, alignItems: 'center' },
  hostBtnText:  { color: colors.white, fontSize: 20, fontWeight: '900' },
  hostBtnSub:   { color: colors.white + 'AA', fontSize: 13, marginTop: 4 },
  joinBtn:      { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg,
                  alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder },
  joinBtnText:  { color: colors.text, fontSize: 20, fontWeight: '800' },
  joinBtnSub:   { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  form:         { width: '100%', gap: spacing.md },
  formTitle:    { fontSize: 16, color: colors.accent, fontWeight: '700', textAlign: 'center' },
  input:        { backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1,
                  borderColor: colors.cardBorder, color: colors.text, fontSize: 16,
                  padding: spacing.md },
  startBtn:     { backgroundColor: colors.primary, borderRadius: radius.md,
                  padding: spacing.md, alignItems: 'center' },
  startBtnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  backLink:     { alignItems: 'center' },
  backLinkText: { color: colors.textMuted, fontSize: 14 },
});
