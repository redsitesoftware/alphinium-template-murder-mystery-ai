import React from 'react';
import { useMysteryStore } from '../store/mysteryStore';
import HomeScreen from '../screens/HomeScreen';
import LobbyScreen from '../screens/LobbyScreen';
import CharacterScreen from '../screens/CharacterScreen';
import GameScreen from '../screens/GameScreen';
import WrongAccuseScreen from '../screens/WrongAccuseScreen';
import RevealScreen from '../screens/RevealScreen';

export default function AppNavigator() {
  const phase = useMysteryStore(s => s.phase);
  switch (phase) {
    case 'lobby':       return <LobbyScreen />;
    case 'character':   return <CharacterScreen />;
    case 'game':        return <GameScreen />;
    case 'wrongaccuse': return <WrongAccuseScreen />;
    case 'reveal':      return <RevealScreen />;
    default:            return <HomeScreen />;
  }
}
