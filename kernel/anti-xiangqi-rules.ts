// The three rule sets, exactly as the kernel was configured for every game,
// sweep and proof in data/. In the mistboard repository these are produced
// by scripts/variant-lab/lab/variants/anti-xiangqi.ts from the rule keys the
// runs were launched with; here they are written out in full so that the
// checker depends on nothing but the kernel and this file.
//
// Common to all three: compulsory capture; the progress clock (60 plies
// without a capture) and threefold repetition are draws; a stalemated player
// wins (the antichess convention, and the natural one: a player with no
// pieces has no moves); a dead board (no chariot, horse, cannon or soldier
// left on either side) plays on to one of those draws, as in xiangqi.

import type { XiangqiRuleConfig } from './xiangqi-rule-kernel.js';

export type Flavour = 'antichess' | 'codrus' | 'losers';

const common = {
  stalemate: 'win',
  progressClock: 60,
  repetition: 'draw',
  mustCapture: true,
  stall: 'draw',
  deadPosition: false,
} as const;

export const ANTI_XIANGQI_RULES: Record<Flavour, XiangqiRuleConfig> = {
  // The stock point: the general is an ordinary piece (no check, no facing
  // rule), and you win by losing every piece you have.
  antichess: {
    ...common,
    facing: 'off',
    royal: { red: false, black: false },
    check: 'none',
    extinction: { red: 'wins', black: 'wins' },
    checkmate: 'loss',
    bareGeneral: 'none',
    generalLost: 'none',
  },
  // Codrus (1844): the general is an ordinary piece, and you win the moment
  // it is captured; nothing else ends the game.
  codrus: {
    ...common,
    facing: 'off',
    royal: { red: false, black: false },
    check: 'none',
    extinction: { red: 'none', black: 'none' },
    checkmate: 'loss',
    bareGeneral: 'none',
    generalLost: 'wins',
  },
  // Losers (ICC): the general stays royal, with check, checkmate and the
  // flying-general rule; you win by being checkmated or reduced to the bare
  // general.
  losers: {
    ...common,
    facing: 'file',
    royal: { red: true, black: true },
    check: 'standard',
    extinction: { red: 'wins', black: 'wins' },
    checkmate: 'win',
    bareGeneral: 'wins',
    generalLost: 'none',
  },
};

/** The flavour a data file was produced under, from its `rules` header. */
export function flavourOf(rules: readonly string[] | undefined): Flavour {
  for (const r of rules ?? []) {
    const m = /^flavour=(antichess|codrus|losers)$/.exec(r);
    if (m) return m[1] as Flavour;
  }
  return 'antichess';
}
