/**
 * Murder Mystery AI Store
 * Scenario: "Murder at Midnight Manor"
 */
import { create } from 'zustand';

export const CHARACTERS = {
  detective: {
    id: 'detective', name: 'Detective Hudson', emoji: '🔍', voice: 'detective',
    role: 'investigator',
    description: "Scotland Yard's finest. Sharp, methodical, doesn't miss a thing.",
    secretInfo: "You are leading the investigation. You have no motive — find the killer.",
    alibi: "N/A — called in from London.",
    speechStyle: 'Precise, authoritative, uses deductive reasoning aloud.',
  },
  lady: {
    id: 'lady', name: 'Lady Ashworth', emoji: '👸', voice: 'lady',
    role: 'suspect',
    description: "Lord Ashworth's wife. Regal, controlling, mourning — or is she?",
    secretInfo: "You are INNOCENT. You were in the garden at midnight. You despised your husband but did not kill him.",
    alibi: "I was walking in the east garden. The gardener's boy can confirm.",
    speechStyle: "Haughty, formal, occasionally defensive.",
  },
  professor: {
    id: 'professor', name: 'Prof. Vane', emoji: '🧙', voice: 'professor',
    role: 'suspect',
    description: "Oxford academic. Owes Lord Ashworth a fortune in unpaid debts.",
    secretInfo: "You are INNOCENT. You were in the billiards room. But Lord Ashworth threatened to expose your fraudulent research.",
    alibi: "I was playing billiards with Victor until at least 11:30. Ask him.",
    speechStyle: 'Nervous, academic, quotes Latin when stressed.',
  },
  victor: {
    id: 'victor', name: 'Victor Blackwell', emoji: '💰', voice: 'victor',
    role: 'murderer',
    description: "City financier. Lord Ashworth's business partner — and betrayer.",
    secretInfo: "You are THE MURDERER. You poisoned Lord Ashworth's brandy at 11:55pm. Motive: he was blocking your deal AND threatening to expose your fraudulent accounts.",
    alibi: "I was in the billiards room with Vane all evening. I merely stepped out briefly.",
    speechStyle: 'Smooth, confident, deflects suspicion onto others. Too calm.',
  },
  celeste: {
    id: 'celeste', name: 'Celeste Moreau', emoji: '🍷', voice: 'celeste',
    role: 'suspect',
    description: "French socialite. Knew Lord Ashworth rather too well.",
    secretInfo: "You are INNOCENT. You were having a secret liaison with Lord Ashworth's nephew. You have nothing to hide except the affair.",
    alibi: "I was... indisposed. In the east wing. I would rather not say with whom.",
    speechStyle: 'Charming, flirtatious, slight French phrasing. Deflects with wit.',
  },
};

const DEMO_PLAYERS = [
  { id: 'p2', name: 'Sophie', charId: 'lady' },
  { id: 'p3', name: 'Marcus', charId: 'professor' },
  { id: 'p4', name: 'Alex',   charId: 'victor' },
  { id: 'p5', name: 'Nina',   charId: 'celeste' },
];

export const CLUES = [
  { id: 1, round: 1, text: "A crystal tumbler was found near Lord Ashworth's body — traces of potassium cyanide detected by the attending physician." },
  { id: 2, round: 1, text: "The cyanide was dissolved in the private brandy decanter kept in the library. Only Lord Ashworth was known to drink from it." },
  { id: 3, round: 2, text: "A witness — the footman, Griggs — saw a figure leaving the library at approximately 11:58pm. Tall, male, in evening dress." },
  { id: 4, round: 2, text: "Lord Ashworth's solicitor confirms: a life insurance policy of £500,000 was taken out six months ago. Named beneficiary: Mr. Victor Blackwell." },
  { id: 5, round: 3, text: "Fingerprint analysis of the brandy bottle reveals a partial thumbprint matching Victor Blackwell's right hand." },
  { id: 6, round: 3, text: 'A telegram found in Lord Ashworth\'s study: "Blackwell — your accounts are fraudulent. I am going to the authorities. — R.A."' },
  { id: 7, round: 4, text: "Victor Blackwell's alibi has a gap: Vane confirms Victor left the billiards room at 11:45pm, not returning until after midnight." },
  { id: 8, round: 4, text: "A small bottle of potassium cyanide — pharmacy label reading 'Blackwell, V.' — discovered behind books in the library." },
];

export const VOICE_MESSAGES = {
  1: [
    { voice: 'narrator',  text: "The grandfather clock strikes one. A hush falls over Midnight Manor as Detective Hudson examines the body. Lord Ashworth lies slumped in his leather chair, brandy glass at his side. His face carries the pallor of a man who had no warning." },
    { voice: 'detective', text: "Cyanide. Fast-acting. This was planned — not a crime of passion. I need everyone's whereabouts accounted for between eleven and midnight. Nobody leaves Midnight Manor." },
    { voice: 'lady',      text: "One simply cannot believe this is happening in one's own home. Reginald had enemies, of course — a man of his stature always does. But murder? One is quite beside oneself." },
    { voice: 'victor',    text: "Terrible business. Absolutely terrible. Reggie was like a brother to me. Whatever you need, Detective — full cooperation. I've nothing to hide." },
    { voice: 'professor', text: "Cyanide! Good God. Eheu fugaces — the fleeting years. I've been in the billiards room all evening, I assure you. Victor can confirm. Victor?" },
    { voice: 'celeste',   text: "Poison, Detective? How... theatrical. Lord Ashworth enjoyed his brandy — but someone knew his habits very well, non?" },
  ],
  2: [
    { voice: 'narrator',  text: "The investigation deepens. A figure was seen leaving the library at midnight — and the motive grows clearer with each passing minute." },
    { voice: 'detective', text: "A male figure leaving the library at 11:58. And an insurance policy naming Blackwell as beneficiary for half a million pounds? Victor — you'll want to explain that." },
    { voice: 'victor',    text: "A purely business arrangement! Reggie insisted on it — joint ventures, naturally there'd be cross-policies. Standard practice. I'm insulted by the implication." },
    { voice: 'lady',      text: "Victor was always too close to Reginald's money. One noticed it at every dinner. Always discussing figures, deals. One found it rather vulgar." },
    { voice: 'professor', text: "I can confirm Victor was with me until... he did step out at some point. For a cigarette, he said. Tempus fugit and all that." },
    { voice: 'celeste',   text: "A man seen leaving at midnight and a policy for half a million... Victor, cheri, you are not making this easy for yourself, non?" },
  ],
  3: [
    { voice: 'narrator',  text: "The net tightens. A fingerprint on the bottle. A damning telegram. The library's shadows close in around Victor Blackwell as the evidence mounts." },
    { voice: 'detective', text: "Mr. Blackwell — your fingerprint on the murder weapon, and a telegram proving Lord Ashworth was about to expose your fraud. Where exactly were you at 11:55pm?" },
    { voice: 'victor',    text: "I — that bottle was in the library for weeks. Anyone might have handled it. And that telegram is a misunderstanding. You're twisting things." },
    { voice: 'professor', text: "Fraudulent accounts? Victor? He once asked me to alter some data... I refused. Fortuna caeca est. I'm staying out of this." },
    { voice: 'celeste',   text: "Victor, mon ami — the detective has your fingerprint. Perhaps it is time to stop being so... smooth, non?" },
  ],
  4: [
    { voice: 'narrator',  text: "The case is all but closed. Victor left the billiards room at 11:45. A bottle of cyanide bearing his name was hidden in the library. Lord Ashworth knew of the fraud. The pieces fit with terrible precision." },
    { voice: 'detective', text: "Victor Blackwell. Your alibi is broken. Your fingerprint is on the weapon. Your name is on the poison. Lord Ashworth was going to the authorities — and you silenced him. I am arresting you for the murder of Lord Reginald Ashworth." },
    { voice: 'victor',    text: "...Fine. FINE. You want the truth? He was going to destroy everything I'd built. Twenty years of work! What choice did I have? WHAT CHOICE?" },
    { voice: 'lady',      text: "One knew. One always knew it was him. Reginald told me about the accounts weeks ago. One should have spoken sooner." },
    { voice: 'professor', text: "Victor... in nomine dei. I should have spoken sooner. I am so terribly sorry, Lady Ashworth." },
    { voice: 'celeste',   text: "Pauvre Reginald. He trusted the wrong man. They always do, the powerful ones." },
  ],
};

const WRONG_ACCUSATION = {
  lady:      "Lady Ashworth's alibi has been confirmed by three witnesses in the garden. She is eliminated from suspicion.",
  professor: "Professor Vane had motive but no opportunity. His presence in the billiards room is verified. He is not our killer.",
  celeste:   "Mademoiselle Moreau was otherwise engaged in the east wing. Confirmed. She is innocent of this particular crime.",
};

export const useMysteryStore = create((set, get) => ({
  phase: 'home',
  sessionCode: '',
  isHost: false,
  playerName: '',
  myCharacter: null,
  players: [],
  round: 0,
  revealedClues: [],
  voiceLog: [],
  wrongAccusation: null,
  myAccusation: null,

  hostGame: (name) => {
    const code = Math.random().toString(36).substring(2,6).toUpperCase();
    set({
      phase: 'lobby', isHost: true, playerName: name,
      sessionCode: code, myCharacter: 'detective',
      players: [{ id: 'p1', name, charId: 'detective' }],
    });
    let i = 0;
    const tick = setInterval(() => {
      if (i >= DEMO_PLAYERS.length) { clearInterval(tick); return; }
      const p = DEMO_PLAYERS[i++];
      set(s => ({ players: [...s.players, p] }));
    }, 1500);
  },

  joinGame: (code, name) => {
    set({
      phase: 'lobby', isHost: false, playerName: name,
      sessionCode: code.toUpperCase() || 'DEMO', myCharacter: 'celeste',
      players: [
        { id: 'p1', name: 'Host', charId: 'detective' },
        { id: 'p_me', name, charId: 'celeste' },
        { id: 'p2', name: 'Sophie', charId: 'lady' },
        { id: 'p3', name: 'Marcus', charId: 'professor' },
        { id: 'p4', name: 'Alex',   charId: 'victor' },
      ],
    });
  },

  startGame: () => set({ phase: 'character' }),

  enterGame: () => {
    const clues = CLUES.filter(c => c.round === 1);
    const messages = VOICE_MESSAGES[1].map((m, i) => ({ ...m, id: `r1-${i}` }));
    set({ phase: 'game', round: 1, revealedClues: clues, voiceLog: messages });
  },

  nextRound: () => {
    const { round } = get();
    const next = round + 1;
    if (next > 4) return;
    const newClues = CLUES.filter(c => c.round === next);
    const newMsgs = (VOICE_MESSAGES[next] || []).map((m, i) => ({ ...m, id: `r${next}-${i}` }));
    set(s => ({
      round: next,
      revealedClues: [...s.revealedClues, ...newClues],
      voiceLog: [...s.voiceLog, ...newMsgs],
    }));
  },

  accuse: (suspectId) => {
    if (suspectId === 'victor') {
      set({ phase: 'reveal', myAccusation: suspectId });
    } else {
      set({
        phase: 'wrongaccuse',
        wrongAccusation: {
          suspect: CHARACTERS[suspectId],
          responseText: WRONG_ACCUSATION[suspectId] || 'That suspect has been cleared.',
        },
        myAccusation: suspectId,
      });
    }
  },

  continueAfterWrongAccuse: () => set({ phase: 'game', wrongAccusation: null }),
  resetGame: () => set({ phase: 'home', sessionCode: '', isHost: false, playerName: '', myCharacter: null, players: [], round: 0, revealedClues: [], voiceLog: [], wrongAccusation: null, myAccusation: null }),
}));
