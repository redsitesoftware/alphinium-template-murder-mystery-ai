import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { useMysteryStore, CHARACTERS } from '../store/mysteryStore';
import { colors, spacing, radius, voiceColors } from '../theme';

export default function RevealScreen() {
  const { resetGame, players, playerName } = useMysteryStore();
  const victor = CHARACTERS.victor;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, { toValue: 1, tension: 40, friction: 6, useNativeDriver: true }).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <Animated.View style={[s.card, { transform: [{ scale: bounceAnim }], opacity: bounceAnim }]}>
          <Text style={s.crimeSceneText}>🚔  CASE CLOSED  🚔</Text>
          <Text style={s.emoji}>{victor.emoji}</Text>
          <Text style={s.murdererLabel}>THE MURDERER IS</Text>
          <Text style={s.murdererName}>{victor.name}</Text>
          <Text style={s.murdererDesc}>{victor.description}</Text>

          <View style={s.confession}>
            <Text style={s.confessionLabel}>His confession</Text>
            <Text style={s.confessionText}>"He was going to destroy everything I'd built. Twenty years of work! What choice did I have?"</Text>
          </View>

          <View style={s.motive}>
            <Text style={s.motiveLabel}>MOTIVE</Text>
            <Text style={s.motiveText}>Lord Ashworth discovered Victor's fraudulent accounts and was going to the authorities. Victor also stood to collect £500,000 in life insurance.</Text>
          </View>

          <View style={s.method}>
            <Text style={s.motiveLabel}>METHOD</Text>
            <Text style={s.motiveText}>Potassium cyanide dissolved in Lord Ashworth's private brandy decanter at 11:55pm. Victor slipped away from the billiards room for 15 minutes — exactly enough time.</Text>
          </View>
        </Animated.View>

        {/* Innocent suspects revealed */}
        <Text style={s.sectionLabel}>The innocents — their secrets revealed</Text>
        {[CHARACTERS.lady, CHARACTERS.professor, CHARACTERS.celeste].map(c => (
          <View key={c.id} style={[s.innocentCard, { borderColor: voiceColors[c.voice] + '55' }]}>
            <Text style={s.innocentEmoji}>{c.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[s.innocentName, { color: voiceColors[c.voice] }]}>{c.name}</Text>
              <Text style={s.innocentSecret}>{c.secretInfo}</Text>
            </View>
          </View>
        ))}

        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statNum}>{players.length}</Text>
            <Text style={s.statLabel}>Investigators</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statNum}>4</Text>
            <Text style={s.statLabel}>Rounds</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statNum}>8</Text>
            <Text style={s.statLabel}>Clues found</Text>
          </View>
        </View>

        <TouchableOpacity style={s.resetBtn} onPress={resetGame}>
          <Text style={s.resetBtnText}>Play Another Mystery 🔪</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.bg },
  content:          { padding: spacing.lg, alignItems: 'center' },
  card:             { backgroundColor: colors.card, borderRadius: radius.xl, padding: spacing.lg,
                      width: '100%', borderWidth: 2, borderColor: colors.primary,
                      alignItems: 'center', marginBottom: spacing.lg },
  crimeSceneText:   { fontSize: 13, color: colors.primary, letterSpacing: 3, marginBottom: spacing.md },
  emoji:            { fontSize: 80, marginBottom: spacing.md },
  murdererLabel:    { fontSize: 12, color: colors.primary, textTransform: 'uppercase', letterSpacing: 3 },
  murdererName:     { fontSize: 32, fontWeight: '900', color: colors.accent, textAlign: 'center' },
  murdererDesc:     { fontSize: 14, color: colors.textSub, textAlign: 'center', fontStyle: 'italic',
                      marginTop: spacing.sm, marginBottom: spacing.lg },
  confession:       { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      width: '100%', marginBottom: spacing.sm,
                      borderLeftWidth: 3, borderLeftColor: colors.primary },
  confessionLabel:  { fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  confessionText:   { fontSize: 14, color: colors.text, fontStyle: 'italic', lineHeight: 22 },
  motive:           { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      width: '100%', marginBottom: spacing.sm },
  method:           { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, width: '100%' },
  motiveLabel:      { fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  motiveText:       { fontSize: 14, color: colors.textSub, lineHeight: 22 },
  sectionLabel:     { fontSize: 12, color: colors.textMuted, textTransform: 'uppercase',
                      letterSpacing: 1.5, alignSelf: 'flex-start', marginVertical: spacing.md },
  innocentCard:     { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
                      backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md,
                      width: '100%', marginBottom: spacing.sm, borderWidth: 1 },
  innocentEmoji:    { fontSize: 28, marginTop: 2 },
  innocentName:     { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  innocentSecret:   { fontSize: 13, color: colors.textSub, lineHeight: 18 },
  statsRow:         { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.lg },
  statBox:          { flex: 1, backgroundColor: colors.card, borderRadius: radius.md,
                      padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder },
  statNum:          { fontSize: 32, fontWeight: '900', color: colors.primary },
  statLabel:        { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  resetBtn:         { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md,
                      alignItems: 'center', width: '100%', marginBottom: spacing.xxl },
  resetBtnText:     { color: colors.white, fontWeight: '800', fontSize: 16 },
});
