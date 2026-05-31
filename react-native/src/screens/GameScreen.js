/**
 * GameScreen — main investigation: voice chat log + clues + accusation
 */
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { useMysteryStore, CHARACTERS, CLUES } from '../store/mysteryStore';
import { colors, spacing, radius, voiceColors, voiceEmojis, typography } from '../theme';

// Single voice bubble in the chat log
function VoiceBubble({ msg, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const isNarrator = msg.voice === 'narrator';
  const vc = voiceColors[msg.voice] || colors.textSub;
  const emoji = voiceEmojis[msg.voice] || '💬';
  const charName = msg.voice === 'narrator' ? 'Narrator' : (CHARACTERS[msg.voice]?.name || msg.voice);

  if (isNarrator) {
    return (
      <Animated.View style={[s.narratorBubble, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={s.narratorText}>{msg.text}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[s.bubble, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[s.bubbleHeader, { borderLeftColor: vc }]}>
        <Text style={s.bubbleEmoji}>{emoji}</Text>
        <Text style={[s.bubbleName, { color: vc }]}>{charName}</Text>
      </View>
      <Text style={s.bubbleText}>{msg.text}</Text>
    </Animated.View>
  );
}

// Clue card
function ClueCard({ clue }) {
  return (
    <View style={s.clueCard}>
      <Text style={s.clueIcon}>🔎</Text>
      <Text style={s.clueText}>{clue.text}</Text>
    </View>
  );
}

// Suspect accusation picker
function AccusationModal({ onAccuse, onCancel }) {
  const suspects = Object.values(CHARACTERS).filter(c => c.role !== 'investigator');
  return (
    <View style={s.modal}>
      <View style={s.modalCard}>
        <Text style={s.modalTitle}>Make Your Accusation</Text>
        <Text style={s.modalSub}>Choose carefully — a wrong accusation and they go free</Text>
        {suspects.map(s2 => (
          <TouchableOpacity key={s2.id} style={s.suspectBtn} onPress={() => onAccuse(s2.id)}>
            <Text style={s.suspectEmoji}>{s2.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.suspectName}>{s2.name}</Text>
              <Text style={s.suspectDesc} numberOfLines={1}>{s2.description}</Text>
            </View>
            <Text style={s.suspectArrow}>→</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.cancelBtn} onPress={onCancel}>
          <Text style={s.cancelBtnText}>Not yet — I need more clues</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function GameScreen() {
  const { round, revealedClues, voiceLog, isHost, nextRound, accuse, myCharacter, players } = useMysteryStore();
  const [showAccuse, setShowAccuse] = useState(false);
  const scrollRef = useRef(null);
  const char = CHARACTERS[myCharacter];
  const maxRound = 4;

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
  }, [voiceLog.length]);

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>🔪 Midnight Manor</Text>
          <Text style={s.headerSub}>Round {round} of {maxRound} · {players.length} investigators</Text>
        </View>
        <View style={[s.myRole, { borderColor: voiceColors[char?.voice] || colors.primary }]}>
          <Text style={s.myRoleText}>{char?.emoji} {char?.name.split(' ')[0]}</Text>
        </View>
      </View>

      {/* Main scroll area */}
      <ScrollView ref={scrollRef} style={s.scroll} contentContainerStyle={s.scrollContent}>
        {/* Clues section */}
        <View style={s.clueSection}>
          <Text style={s.clueSectionLabel}>EVIDENCE — Round {round}</Text>
          {revealedClues.map(c => <ClueCard key={c.id} clue={c} />)}
        </View>

        {/* Voice log */}
        <View style={s.voiceSection}>
          <Text style={s.clueSectionLabel}>STATEMENTS</Text>
          {voiceLog.map((msg, i) => <VoiceBubble key={msg.id} msg={msg} index={i} />)}
        </View>
      </ScrollView>

      {/* Bottom controls */}
      <View style={s.footer}>
        {/* Player count row */}
        <View style={s.playerRow}>
          {players.map(p => {
            const c = CHARACTERS[p.charId];
            return (
              <View key={p.id} style={[s.playerDot, { borderColor: voiceColors[c?.voice] || colors.textMuted }]}>
                <Text style={s.playerDotEmoji}>{c?.emoji}</Text>
              </View>
            );
          })}
          <Text style={s.playerCount}>{players.length} in room</Text>
        </View>

        <View style={s.actionRow}>
          {isHost && round < maxRound && (
            <TouchableOpacity style={s.nextBtn} onPress={nextRound}>
              <Text style={s.nextBtnText}>Reveal Next Clues →</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={s.accuseBtn} onPress={() => setShowAccuse(true)}>
            <Text style={s.accuseBtnText}>🔪 Make Accusation</Text>
          </TouchableOpacity>
        </View>

        {isHost && round === maxRound && (
          <Text style={s.allCluesText}>All evidence revealed — time to accuse!</Text>
        )}
      </View>

      {showAccuse && (
        <AccusationModal
          onAccuse={(id) => { setShowAccuse(false); accuse(id); }}
          onCancel={() => setShowAccuse(false)}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.bg },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                      padding: spacing.md, borderBottomWidth: 1, borderColor: colors.cardBorder },
  headerTitle:      { fontSize: 18, fontWeight: '900', color: colors.accent },
  headerSub:        { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  myRole:           { borderWidth: 2, borderRadius: radius.round, paddingHorizontal: spacing.md, paddingVertical: 6 },
  myRoleText:       { fontSize: 13, fontWeight: '700', color: colors.text },

  scroll:           { flex: 1 },
  scrollContent:    { padding: spacing.md, paddingBottom: spacing.xxl },

  clueSection:      { marginBottom: spacing.lg },
  clueSectionLabel: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase',
                      letterSpacing: 2, marginBottom: spacing.sm },
  clueCard:         { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
                      backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md,
                      marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.accent + '44',
                      borderLeftWidth: 3, borderLeftColor: colors.accent },
  clueIcon:         { fontSize: 16, marginTop: 1 },
  clueText:         { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },

  voiceSection:     { gap: spacing.sm },
  narratorBubble:   { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      borderWidth: 1, borderColor: colors.accent + '33', alignItems: 'center' },
  narratorText:     { fontSize: 14, color: colors.accent, fontStyle: 'italic', textAlign: 'center', lineHeight: 22 },
  bubble:           { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md,
                      borderWidth: 1, borderColor: colors.cardBorder },
  bubbleHeader:     { flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
                      marginBottom: spacing.sm, borderLeftWidth: 3, paddingLeft: spacing.sm },
  bubbleEmoji:      { fontSize: 16 },
  bubbleName:       { fontSize: 13, fontWeight: '800' },
  bubbleText:       { fontSize: 14, color: colors.text, lineHeight: 20 },

  footer:           { padding: spacing.md, borderTopWidth: 1, borderColor: colors.cardBorder,
                      backgroundColor: colors.surface },
  playerRow:        { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  playerDot:        { width: 32, height: 32, borderRadius: 16, borderWidth: 2,
                      backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  playerDotEmoji:   { fontSize: 14 },
  playerCount:      { fontSize: 12, color: colors.textMuted, marginLeft: spacing.sm },
  actionRow:        { flexDirection: 'row', gap: spacing.sm },
  nextBtn:          { flex: 1, backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1,
                      borderColor: colors.accent, padding: spacing.md, alignItems: 'center' },
  nextBtnText:      { color: colors.accent, fontWeight: '700', fontSize: 14 },
  accuseBtn:        { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md,
                      padding: spacing.md, alignItems: 'center' },
  accuseBtnText:    { color: colors.white, fontWeight: '800', fontSize: 14 },
  allCluesText:     { color: colors.textMuted, textAlign: 'center', fontSize: 13, marginTop: spacing.sm, fontStyle: 'italic' },

  modal:            { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalCard:        { backgroundColor: colors.card, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
                      padding: spacing.lg, borderTopWidth: 2, borderColor: colors.primary },
  modalTitle:       { fontSize: 22, fontWeight: '900', color: colors.primary, textAlign: 'center', marginBottom: 4 },
  modalSub:         { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.lg },
  suspectBtn:       { flexDirection: 'row', alignItems: 'center', gap: spacing.md,
                      backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  suspectEmoji:     { fontSize: 28 },
  suspectName:      { fontSize: 16, fontWeight: '800', color: colors.text },
  suspectDesc:      { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  suspectArrow:     { fontSize: 20, color: colors.primary },
  cancelBtn:        { alignItems: 'center', padding: spacing.md },
  cancelBtnText:    { color: colors.textMuted, fontSize: 14 },
});
