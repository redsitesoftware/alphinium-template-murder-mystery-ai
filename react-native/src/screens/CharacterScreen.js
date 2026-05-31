import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { useMysteryStore, CHARACTERS } from '../store/mysteryStore';
import { colors, spacing, radius, voiceColors, voiceEmojis } from '../theme';

export default function CharacterScreen() {
  const { myCharacter, enterGame, playerName } = useMysteryStore();
  const char = CHARACTERS[myCharacter];
  const anim = useRef(new Animated.Value(0)).current;
  const [revealed, setRevealed] = React.useState(false);

  const reveal = () => {
    setRevealed(true);
    Animated.spring(anim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }).start();
  };

  const vc = voiceColors[char?.voice] || colors.primary;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Your Secret Role</Text>
        <Text style={s.welcome}>{playerName}</Text>

        {!revealed ? (
          <TouchableOpacity style={[s.envelope, { borderColor: vc }]} onPress={reveal}>
            <Text style={s.envelopeEmoji}>✉️</Text>
            <Text style={s.envelopeText}>Tap to reveal your character</Text>
            <Text style={s.envelopeSub}>Keep your role secret from other players!</Text>
          </TouchableOpacity>
        ) : (
          <Animated.View style={[s.charCard, { borderColor: vc, opacity: anim, transform: [{ scale: anim }] }]}>
            <Text style={s.charEmoji}>{char.emoji}</Text>
            <Text style={[s.charName, { color: vc }]}>{char.name}</Text>
            <Text style={s.charDesc}>{char.description}</Text>

            <View style={[s.roleBanner, char.role === 'murderer' && s.roleBannerMurderer]}>
              <Text style={s.roleBannerText}>
                {char.role === 'murderer' ? '🔪 YOU ARE THE MURDERER' :
                 char.role === 'investigator' ? '🔍 YOU ARE THE DETECTIVE' :
                 '🎭 YOU ARE A SUSPECT'}
              </Text>
            </View>

            <View style={s.section}>
              <Text style={s.sectionLabel}>Your secret</Text>
              <Text style={s.sectionText}>{char.secretInfo}</Text>
            </View>

            <View style={s.section}>
              <Text style={s.sectionLabel}>Your alibi</Text>
              <Text style={s.sectionText}>"{char.alibi}"</Text>
            </View>

            <View style={s.section}>
              <Text style={s.sectionLabel}>How to play your character</Text>
              <Text style={s.sectionText}>{char.speechStyle}</Text>
            </View>

            <TouchableOpacity style={[s.enterBtn, { backgroundColor: vc + 'CC' }]} onPress={enterGame}>
              <Text style={s.enterBtnText}>Enter Midnight Manor →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.bg },
  content:          { padding: spacing.lg, alignItems: 'center', paddingBottom: spacing.xxl },
  title:            { fontSize: 14, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: spacing.sm },
  welcome:          { fontSize: 28, fontWeight: '900', color: colors.accent, marginBottom: spacing.xl },
  envelope:         { backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 2,
                      padding: spacing.xxl, alignItems: 'center', width: '100%' },
  envelopeEmoji:    { fontSize: 72, marginBottom: spacing.md },
  envelopeText:     { fontSize: 20, fontWeight: '800', color: colors.text, textAlign: 'center' },
  envelopeSub:      { fontSize: 13, color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center' },
  charCard:         { backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 2,
                      padding: spacing.lg, width: '100%', alignItems: 'center' },
  charEmoji:        { fontSize: 72, marginBottom: spacing.sm },
  charName:         { fontSize: 28, fontWeight: '900', marginBottom: spacing.sm, textAlign: 'center' },
  charDesc:         { fontSize: 14, color: colors.textSub, textAlign: 'center', marginBottom: spacing.md, fontStyle: 'italic' },
  roleBanner:       { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      width: '100%', alignItems: 'center', marginBottom: spacing.md,
                      borderWidth: 1, borderColor: colors.cardBorder },
  roleBannerMurderer: { backgroundColor: colors.primary + '33', borderColor: colors.primary },
  roleBannerText:   { fontSize: 16, fontWeight: '900', color: colors.text },
  section:          { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                      width: '100%', marginBottom: spacing.sm },
  sectionLabel:     { fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  sectionText:      { fontSize: 14, color: colors.text, lineHeight: 20 },
  enterBtn:         { borderRadius: radius.md, padding: spacing.md, alignItems: 'center',
                      width: '100%', marginTop: spacing.md },
  enterBtnText:     { color: colors.white, fontSize: 16, fontWeight: '800' },
});
