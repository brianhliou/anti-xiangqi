# Anti xiangqi

Antichess on the xiangqi board: if you can capture you must, you win by losing every piece, the general is an ordinary piece. Measured before it was designed, and it is a draw. The write-up is at [brianhliou.com/posts/anti-xiangqi](https://brianhliou.com/posts/anti-xiangqi/); this repository is everything the write-up rests on, in the form it was produced, so the claims can be checked without trusting the engine or the author.

The verdict in three lines. The opening is a chain of forced captures; Black has two moves to find in it (1...Cxh1, and 2...Kxd10 if Red plays 2. Cxd10) and Red cannot go wrong. Every other opening loses, and 63 of the 70 losing endings carry a proof a checker has replayed against the rules. After the chain the game is a draw in every engine game: the pieces you must lose sit in the palace, where nothing can reach them unless the opponent chooses to let it.

## Check the proofs, no engine needed

```
npm install
npm run verify
```

`verify.ts` replays every certificate in `data/proofs-*.json` against the rule kernel and does nothing else: every move must be legal, every defender node must list exactly the defender's legal moves, and every leaf must be a finished game won by the attacker. Expected output:

```
data/proofs-antichess-100k.json (antichess): 63 valid, 0 invalid, 7 not proven (skipped)
data/proofs-antichess-1m.json (antichess): 63 valid, 0 invalid, 13 not proven (skipped)
data/proofs-codrus-100k.json (codrus): 20 valid, 0 invalid, 5 not proven (skipped)
data/proofs-losers-100k.json (losers): 7 valid, 0 invalid, 6 not proven (skipped)
```

The kernel is `kernel/xiangqi-rule-kernel.ts`, the mistboard rule kernel unchanged apart from its import path (`kernel/xiangqi-types.ts` is the subset of board types it needs). `kernel/anti-xiangqi-rules.ts` is the three rule sets written out in full. If you have your own rules implementation, the certificate format below is small enough to check with it instead.

## What is here

| path | what it is |
|---|---|
| `rules/anti-xiangqi.ini` | the three Fairy-Stockfish stanzas, exactly as measured: `antixiangqi` (the stock point), `codrusxiangqi` (lose the general to win), `losersxiangqi` (royal general; being mated or reduced to the bare general wins). `stockfish load anti-xiangqi.ini`, then `setoption name UCI_Variant value antixiangqi`. Needs the largeboards build. |
| `data/opening-tree.md` | every ending of the chain of forced captures from the array, with the line to each: 166 for the non-royal general, 32 for the royal one. Enumerated by the kernel; nothing pruned. |
| `data/exits-antichess-100k.json` | one engine game from each of the 83 distinct endings (the half of the tree after 1. Cb3xb10; the other half is its mirror image), Fairy-Stockfish against itself at 100,000 nodes a move, the kernel refereeing, every move recorded. |
| `data/exits-antichess-1m.json` | the same at 1,000,000 nodes a move, verdicts only. This run was refereed with the fewer-pieces stall rule switched on, so its stalls carry a `winner`; every decisive ending is rule-independent, and under the rules as written every stall is a draw. |
| `data/exits-codrus-100k.json`, `data/exits-losers-100k.json` | the same sweep for the two siblings. |
| `data/proofs-*.json` | for each decisive ending, a proof-number search from the ending with the winner as attacker, budget one million positions, 60-ply bound counted as a loss for the attacker. `result` is `proven`, `unknown` (budget exhausted) or `refuted` (none was). A proven ending carries its certificate. |
| `games/index.html` | every engine game in a viewer, and the opening chain as a table with its values and evidence. Opens from the folder; no server needed. |

A row of an exits file: the ending's line (`opening`), its depth in plies (`exitPly`), how the game ended (`winner`, `reason`, `plies`), the piece count at the end (`red`, `black`), and in the 100k files the moves. A certificate:

```
{ "toMove": "attacker" | "defender", "children": [ { "move": "e2e3", "replies": [ ... ] }, ... ] }
```

rooted at the ending. Where the attacker is to move, `children` holds the one proving move; where the defender is to move, it holds every legal reply. Each move's `replies` is the same structure one ply deeper; a leaf is a finished game. An ending with `result: proven` and no `proof` was already finished at the ending (Codrus: a general fell inside the chain).

## Reproduce it with an engine

The sweep and the prover live in the [mistboard repository](https://github.com/brianhliou/mistboard) under `scripts/variant-lab/` (`anti-xiangqi-exits.ts`, `anti-xiangqi-prove.ts`, `anti-xiangqi-verify.ts`, the adapter `lab/variants/anti-xiangqi.ts`, and the kernel `packages/game/src/xiangqi-rule-kernel.ts`). From a checkout, with `MISTBOARD_FSF_PATH` pointing at a Fairy-Stockfish largeboards binary:

```
npx tsx scripts/variant-lab/anti-xiangqi-exits.ts sweep --nodes 100000 --out exits.json
npx tsx scripts/variant-lab/anti-xiangqi-exits.ts minimax exits.json
npx tsx scripts/variant-lab/anti-xiangqi-prove.ts --sweep exits.json --out proofs.json --budget 1000000 --rules flavour=antichess
npx tsx scripts/variant-lab/anti-xiangqi-verify.ts proofs.json
```

The sweep is deterministic for a given binary and budget (a re-run reproduced 82 of 83 games move for move; the 83rd differed only past a dead board). The siblings take `--rules flavour=codrus` and `--rules flavour=losers facing=file`. The kernel's move generation was compared with Fairy-Stockfish's on 209 positions before any game was played: zero disagreements, all three flavours.

## If you find a hole

A third surviving opening, a defence in any certificate, or a win for either side from the position after 1. Cxb10 Cxh1 2. Rxh1 Rxb10: open an issue here. The write-up will say so.

## License

Code (the kernel and the checker) is AGPL-3.0, as in the mistboard repository it comes from. The data files, the stanzas and the viewer are CC BY 4.0.
