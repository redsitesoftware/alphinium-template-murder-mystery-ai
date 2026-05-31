import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useMysteryStore } from '../store/mysteryStore';
import { colors, spacing, radius, voiceColors } from '../theme';

export default function WrongAccuseScreen() {
  const { wrongAccusation, continueAfterWrongAccuse } = useMysteryStore();
  if (!wrongAccusation) return null;
  const { suspect, responseText } = wrongAccusation;

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.content}>
        <Text style={s.emoji}>{suspect.emoji}</Text>
        <Text style={s.title}>Wrong Accusation!</Text>
        <Text style={s.suspectName}>{suspect.name} is innocent</Text>

        <View style={s.verdictCard}>
          <Text style={s.verdictLabel}>🔍 DETECTIVE HUDSON</Text>
          <Text style={s.verdictText}>{responseText}</Text>
        </View>

        <View style={s.alibiCard}>
          <Text style={s.alibiLabel}>Their alibi</Text>
          <Text style={s.alibiText}>"{suspect.alibi}"</Text>
        </View>

        <TouchableOpacity style={s.continueBtn} onPress={continueAfterWrongAccuse}>
          <Text style={s.continueBtnText}>Continue Investigating →</Text>
        </TouchableOpacity>
        <Text style={s.hint}>The real murderer is still out there...</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.bg },
  content:      { flex: 1, padding: spacing.xl, alignItems: 'center', justifyContent: 'center' },
  emoji:        { fontSize: 72, marginBottom: spacing.md },
  title:        { fontSize: 32, fontWeight: '900', color: colors.primary, marginBottom: spacing.sm },
  suspectName:  { fontSize: 20, color: colors.text, marginBottom: spacing.xl },
  verdictCard:  { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
                  width: '100%', borderWidth: 1, borderColor: voiceColors.detective + '55',
                  borderLeftWidth: 3, borderLeftColor: voiceColors.detective, marginBottom: spacing.md },
  verdictLabel: { fontSize: 11, color: voiceColors.detective, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  verdictText:  { fontSize: 15, color: colors.text, lineHeight: 22 },
  alibiCard:    { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                  width: '100%', marginBottom: spacing.xl },
  alibiLabel:   { fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  alibiText:    { fontSize: 14, color: colors.textSub, fontStyle: 'italic' },
  continueBtn:  { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md,
                  alignItems: 'center', width: '100%', marginBottom: spacing.md },
  continueBtnText: { color: colors.white, fontWeight: '800', fontSize: 16 },
  hint:         { color: colors.textMuted, fontSize: 13, fontStyle: 'italic' },
});
