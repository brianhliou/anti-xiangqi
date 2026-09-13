// Check every proof certificate in a proofs file against the rule kernel,
// independently of the search that produced it.
//
//   npx tsx verify.ts data/proofs-antichess-100k.json
//   npm run verify            # all four files
//
// A certificate is a tree of moves rooted at an ending of the opening chain:
// at an attacker node one move (the proving move), at a defender node every
// legal reply, each with its own subtree. It is valid when, from the ending,
// every move in it is legal, every defender node lists exactly the defender's
// legal moves, and every leaf is a finished game won by the attacker.
// Nothing here searches; it only replays and checks.

import { readFileSync } from 'node:fs';
import { ANTI_XIANGQI_RULES, flavourOf } from './kernel/anti-xiangqi-rules.js';
import { createXiangqiRuleKernel, type XiangqiRuleState } from './kernel/xiangqi-rule-kernel.js';

type ProofTree = { move: string; replies?: ProofTree[] };
type Certificate = { toMove: 'attacker' | 'defender'; children: ProofTree[] };
type Outcome = {
  leaf: number;
  opening: string;
  attacker: 'red' | 'black';
  result: string;
  proofSize?: number;
  proof?: Certificate;
};

function verify(file: string): boolean {
  const data = JSON.parse(readFileSync(file, 'utf8')) as { rules?: string[]; outcomes: Outcome[] };
  const flavour = flavourOf(data.rules);
  const kernel = createXiangqiRuleKernel(ANTI_XIANGQI_RULES[flavour]);
  const uci = (m: { from: string; to: string }) => `${m.from}${m.to}`;

  let valid = 0;
  let invalid = 0;
  let skipped = 0;
  for (const o of data.outcomes) {
    if (o.result !== 'proven') {
      skipped += 1;
      continue;
    }
    let state = kernel.initial(`v${o.leaf}`);
    for (const m of o.opening.split(' ')) {
      const mv = kernel.fromUci(state, m);
      if (!mv) throw new Error(`leaf ${o.leaf}: bad opening move ${m}`);
      state = kernel.apply(state, mv);
    }
    const problems: string[] = [];
    // `children` is what the certificate offers from `s`: one move when the
    // attacker is to move, every legal reply when the defender is.
    const check = (s: XiangqiRuleState, children: ProofTree[], depth: number) => {
      if (problems.length > 3) return;
      if (s.status.type === 'finished') {
        if (s.status.winner !== o.attacker)
          problems.push(`depth ${depth}: game finished for ${s.status.winner ?? 'nobody'}`);
        if (children.length > 0)
          problems.push(`depth ${depth}: certificate continues past the end of the game`);
        return;
      }
      const toMove = (s.status as { turn: 'red' | 'black' }).turn;
      const legal = kernel.legalMoves(s);
      if (toMove === o.attacker) {
        if (children.length !== 1) {
          problems.push(
            `depth ${depth}: attacker to move, expected one move, got ${children.length}`,
          );
          return;
        }
        const node = children[0]!;
        const mv = legal.find((m) => uci(m) === node.move);
        if (!mv) {
          problems.push(`depth ${depth}: attacker move ${node.move} is not legal`);
          return;
        }
        check(kernel.apply(s, mv), node.replies ?? [], depth + 1);
        return;
      }
      const legalReplies = legal.map(uci).sort();
      const listed = children.map((r) => r.move).sort();
      if (legalReplies.join(' ') !== listed.join(' ')) {
        problems.push(
          `depth ${depth}: defender replies listed [${listed.join(' ')}] but legal are [${legalReplies.join(' ')}]`,
        );
        return;
      }
      for (const r of children) {
        const rm = legal.find((m) => uci(m) === r.move)!;
        check(kernel.apply(s, rm), r.replies ?? [], depth + 1);
      }
    };
    if (!o.proof) {
      // Decided inside the chain: the ending itself must be a finished win.
      if (state.status.type === 'finished' && state.status.winner === o.attacker) {
        valid += 1;
        continue;
      }
      problems.push('no certificate and the ending is not a finished win');
    } else {
      const toMove = (state.status as { turn: 'red' | 'black' }).turn;
      const expected = toMove === o.attacker ? 'attacker' : 'defender';
      if (o.proof.toMove !== expected)
        problems.push(
          `certificate says ${o.proof.toMove} to move at the ending; the position has ${expected}`,
        );
      else check(state, o.proof.children, 0);
    }
    if (problems.length === 0) {
      valid += 1;
    } else {
      invalid += 1;
      console.log(`leaf ${o.leaf} (${o.opening}): INVALID\n  ${problems.slice(0, 3).join('\n  ')}`);
    }
  }
  console.log(
    `${file} (${flavour}): ${valid} valid, ${invalid} invalid, ${skipped} not proven (skipped)`,
  );
  return invalid === 0;
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: npx tsx verify.ts <proofs.json> [more.json ...]');
  process.exit(2);
}
let ok = true;
for (const f of files) ok = verify(f) && ok;
process.exit(ok ? 0 : 1);
