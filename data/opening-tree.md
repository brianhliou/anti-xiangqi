# Anti xiangqi: the opening tree under compulsory capture

Generated 2026-09-11 by the rule kernel (`packages/game/src/xiangqi-rule-kernel.ts`,
`mustCapture: true`, extinction wins, stalemate win) from the xiangqi array, for
the series.md issue 10 redo. A node is *constrained* when the mover has at
least one capture (so only captures are legal) and a *leaf* is the first
position on a line where the mover has none: the first free move of the game.
Every line from the array is followed to its leaf; nothing is pruned. Every
soldier is still on the board at every leaf (soldiers are never targets in
the cascade, and never capture in it), so the material column omits them.

The sheet's original claim (four forced plies to one position `P`) is wrong:
after 1. Cb3xb10 Black has two captures, and the second one, 1...Ch8xh1,
starts a cannon cascade along both back ranks that the chariots end only
when a cannon lands on a point a chariot can reach. The two first moves
(Cb3xb10, Ch3xh10) are mirror images, so each table below is two reflected
halves.

## D1 `generalRoyal = false` (the default: antichess flavour)

- leaves (first position where the mover has no capture): **166**
- depth of the leaves in plies: 4: 4, 5: 2, 6: 2, 7: 4, 8: 6, 9: 6, 10: 6, 11: 2, 12: 2, 14: 72, 15: 10, 16: 30, 17: 12, 18: 8
- constrained nodes (mover must capture): 439; of them decision nodes (2+ captures): 155; most captures on offer at one node: 3
- leaves with a general already captured: 130 (both generals: 82)
- non-soldier pieces left, red v black, at the leaves (the array has 11 a side): 9v9: 4, 9v8: 2, 8v8: 2, 8v7: 4, 7v7: 6, 7v6: 6, 6v6: 6, 6v5: 2, 5v5: 2, 4v4: 72, 4v3: 10, 3v3: 30, 3v2: 12, 2v2: 8

The D2 `facing` rule never arises inside the tree (the e-file soldiers never
move, so the generals never face): the same 166 leaves under `off` and
`file`.

## D1 `generalRoyal = true` (losers flavour)

- leaves (first position where the mover has no capture): **32**
- depth of the leaves in plies: 4: 4, 5: 4, 6: 6, 8: 2, 9: 2, 10: 4, 11: 4, 12: 2, 14: 2, 18: 2
- constrained nodes (mover must capture): 63; of them decision nodes (2+ captures): 23; most captures on offer at one node: 3
- leaves with a general already captured: 0 (both generals: 0)
- non-soldier pieces left, red v black, at the leaves (the array has 11 a side): 9v9: 4, 9v8: 4, 8v8: 6, 7v7: 2, 7v6: 2, 6v6: 4, 6v5: 4, 5v5: 2, 4v4: 2, 2v2: 2

Check evasion outranks the capture obligation, so a cannon that gives check
from the back rank ends the cascade instead of extending it, and the general
is never a target.

## The leaves, `generalRoyal = false`

| plies | line | material at the leaf (non-soldiers) | FEN |
|---|---|---|---|
| 4 | Cb3xb10 Ch8xh1 Ri1xh1 Ra10xb10 | K1 A2 B2 N1 R2 C1 v K1 A2 B2 N1 R2 C1 | `1rbakabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKABR1 w - - 0 3` |
| 4 | Cb3xb10 Ra10xb10 Ch3xh10 Ri10xh10 | K1 A2 B2 N2 R2 v K1 A2 B2 R2 C2 | `1rbakabr1/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/9/9/RNBAKABNR w - - 0 3` |
| 4 | Ch3xh10 Cb8xb1 Ra1xb1 Ri10xh10 | K1 A2 B2 N1 R2 C1 v K1 A2 B2 N1 R2 C1 | `rnbakabr1/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/1RBAKABNR w - - 0 3` |
| 4 | Ch3xh10 Ri10xh10 Cb3xb10 Ra10xb10 | K1 A2 B2 N2 R2 v K1 A2 B2 R2 C2 | `1rbakabr1/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/9/9/RNBAKABNR w - - 0 3` |
| 5 | Cb3xb10 Ch8xh1 Cb10xd10 Ke10xd10 Ri1xh1 | K1 A2 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `r1bk1abnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKABR1 b - - 0 3` |
| 5 | Ch3xh10 Cb8xb1 Ch10xf10 Ke10xf10 Ra1xb1 | K1 A2 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `rnba1kb1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/1RBAKABNR b - - 0 3` |
| 6 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Ke1xf1 Ke10xd10 | K1 A1 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `r1bk1abnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBA1KB1R w - - 0 4` |
| 6 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Ke1xd1 Ke10xf10 | K1 A1 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `rnba1kb1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1BK1ABNR w - - 0 4` |
| 7 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ke1xd1 | K1 B2 N1 R2 C2 v K1 A1 B2 N1 R1 C1 | `C1b1kabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBK2B1R b - - 0 4` |
| 7 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Ke10xf10 Ke1xf1 | K1 A1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `r1b2kbnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBA1KB1R b - - 0 4` |
| 7 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Ke10xd10 Ke1xd1 | K1 A1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `rnbk2b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1BK1ABNR b - - 0 4` |
| 7 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ke1xf1 | K1 B2 N1 R2 C2 v K1 A1 B2 N1 R1 C1 | `rnbak1b1C/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B2KBNR b - - 0 4` |
| 8 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Ke1xd1 Ke10xf10 | K1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `r1b2kbnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBK2B1R w - - 0 5` |
| 8 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ra10xc10 | K1 A1 B2 N1 R1 C1 v K1 B1 N1 R2 C2 | `2r1k1bnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAK1B1c w - - 0 5` |
| 8 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ri10xh10 | K1 A1 B2 N1 R1 C1 v K1 B2 R2 C2 | `r1b1k1br1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAK1B1c w - - 0 5` |
| 8 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ra10xb10 | K1 A1 B2 N1 R1 C1 v K1 B2 R2 C2 | `1rb1k1b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B1KABNR w - - 0 5` |
| 8 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ri10xg10 | K1 A1 B2 N1 R1 C1 v K1 B1 N1 R2 C2 | `rnb1k1r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B1KABNR w - - 0 5` |
| 8 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Ke1xf1 Ke10xd10 | K1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `rnbk2b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B2KBNR w - - 0 5` |
| 9 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ra1xb1 | K1 B2 R2 C2 v A1 B2 N1 R1 C1 | `2b1Cabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1RB1K1B1R b - - 0 5` |
| 9 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ri1xg1 | K1 B1 N1 R2 C2 v A1 B2 N1 R1 C1 | `2b1Cabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNB1K1R2 b - - 0 5` |
| 9 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Ra10xc10 Ke1xd1 | K1 B2 N1 R2 C1 v K1 B1 N1 R2 C1 | `2r1k1bnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBK2B1R b - - 0 5` |
| 9 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Ri10xg10 Ke1xf1 | K1 B2 N1 R2 C1 v K1 B1 N1 R2 C1 | `rnb1k1r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B2KBNR b - - 0 5` |
| 9 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ra1xc1 | K1 B1 N1 R2 C2 v A1 B2 N1 R1 C1 | `rnbaC1b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R1K1BNR b - - 0 5` |
| 9 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ri1xh1 | K1 B2 R2 C2 v A1 B2 N1 R1 C1 | `rnbaC1b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B1K1BR1 b - - 0 5` |
| 10 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Ri1xg1 Ra10xc10 | K1 B1 N1 R2 C1 v K1 B1 N1 R2 C1 | `2r1k1bnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNB1K1R2 w - - 0 6` |
| 10 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ri1xg1 Ri10xh10 | K1 B1 N1 R2 C1 v K1 B2 R2 C1 | `r1b1k1br1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNB1K1R2 w - - 0 6` |
| 10 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Ri10xh10 Ke1xd1 Rh10xh3 | K1 B2 N1 R2 v K1 B2 R2 C1 | `r1b1k1b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/RNBK2B1R w - - 0 6` |
| 10 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Ra1xc1 Ra10xb10 | K1 B1 N1 R2 C1 v K1 B2 R2 C1 | `1rb1k1b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R1K1BNR w - - 0 6` |
| 10 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Ra10xb10 Ke1xf1 Rb10xb3 | K1 B2 N1 R2 v K1 B2 R2 C1 | `2b1k1b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/R1B2KBNR w - - 0 6` |
| 10 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Ra1xc1 Ri10xg10 | K1 B1 N1 R2 C1 v K1 B1 N1 R2 C1 | `rnb1k1r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R1K1BNR w - - 0 6` |
| 11 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Ra1xb1 Ra10xc10 Rb1xb8 | K1 B2 R2 C1 v K1 B1 N1 R2 | `2r1k1bnr/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B1K1B1R b - - 0 6` |
| 11 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Ri1xh1 Ri10xg10 Rh1xh8 | K1 B2 R2 C1 v K1 B1 N1 R2 | `rnb1k1r2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B1K1B2 b - - 0 6` |
| 12 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | K1 B2 R2 v K1 B2 R2 | `r1b1k1b2/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/2B1K1B1R w - - 0 7` |
| 12 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | K1 B2 R2 v K1 B2 R2 | `2b1k1b1r/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/R1B1K1B2 w - - 0 7` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xc10 Ce1xa1 Cc10xh10 Ri10xh10 | B2 R1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/c1B3B1R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xc10 Ce1xi1 Cc10xh10 Ri10xh10 | B2 R1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/R1B3B1c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xc10 Cc1xa1 Cc10xh10 Ri10xh10 | K1 N1 R1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xc10 Cc1xi1 Cc10xh10 Ri10xh10 | K1 N1 R1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xc10 Cc1xa1 Cc10xh10 Ca1xd1 | B1 N1 C2 v A1 R1 C2 | `5a1Cr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xc10 Cc1xa1 Cc10xh10 Ri10xh10 | A1 B1 N1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN1A2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xc10 Cc1xg1 Cc10xh10 Ri10xh10 | A1 N1 R1 C1 v A1 R1 C2 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN1A2c2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xi10 Cc1xa1 Ci10xf10 Ca1xd1 | B1 N1 C2 v B1 N1 C2 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xa10 Ce1xa1 Ca10xh10 Ri10xh10 | B2 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/c1B3B1R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xa10 Ce1xi1 Ca10xh10 Ri10xh10 | B2 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/R1B3B1c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xi10 Ce1xa1 Ci10xe10 Ra10xe10 | B2 R1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/c1B3B1R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xi10 Ce1xi1 Ci10xe10 Ra10xe10 | B2 R1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/R1B3B1c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xa1 Ca10xh10 Ri10xh10 | K1 N1 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xi1 Ca10xh10 Ri10xh10 | K1 N1 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xi10 Cc1xa1 Ci10xe10 Ra10xe10 | K1 N1 R1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xi10 Cc1xi1 Ci10xe10 Ra10xe10 | K1 N1 R1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xa10 Ce1xa1 Ca10xg10 Ri10xg10 | B2 R1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/c1B3B1R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xa10 Ce1xi1 Ca10xg10 Ri10xg10 | B2 R1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/R1B3B1c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xi10 Ce1xa1 Ci10xc10 Ra10xc10 | B2 R1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/c1B3B1R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xi10 Ce1xi1 Ci10xc10 Ra10xc10 | B2 R1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/R1B3B1c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xa10 Cc1xa1 Ca10xg10 Ri10xg10 | K1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xa10 Cc1xi1 Ca10xg10 Ri10xg10 | K1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xi10 Cc1xa1 Ci10xc10 Ra10xc10 | K1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xi10 Cc1xi1 Ci10xc10 Ra10xc10 | K1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xa10 Cc1xa1 Ca10xh10 Ca1xd1 | B1 N1 C2 v K1 R1 C2 | `4k2Cr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xa10 Cc1xa1 Ca10xh10 Ri10xh10 | A1 B1 N1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN1A2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xa10 Cc1xg1 Ca10xh10 Ri10xh10 | A1 N1 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN1A2c2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xi10 Cc1xa1 Ci10xe10 Ca1xd1 | B1 N1 C2 v N1 R1 C2 | `r3C2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xi10 Cc1xa1 Ci10xe10 Ra10xe10 | A1 B1 N1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN1A2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xi10 Cc1xg1 Ci10xe10 Ra10xe10 | A1 N1 R1 C1 v N1 R1 C2 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN1A2c2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xa10 Cc1xa1 Ca10xg10 Ca1xd1 | B1 N1 C2 v B1 R1 C2 | `2b3C1r/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xa10 Cc1xa1 Ca10xg10 Ri10xg10 | A1 B1 N1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN1A2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xa10 Cc1xg1 Ca10xg10 Ri10xg10 | A1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN1A2c2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xi10 Cc1xa1 Ci10xc10 Ca1xd1 | B1 N1 C2 v B1 R1 C2 | `r1C3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N1c2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xi10 Cc1xa1 Ci10xc10 Ra10xc10 | A1 B1 N1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN1A2B2 w - - 0 8` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xi10 Cc1xg1 Ci10xc10 Ra10xc10 | A1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN1A2c2 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xa10 Cg1xc1 Ca10xg10 Ri10xg10 | A1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2c2A1NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xa10 Cg1xi1 Ca10xg10 Ci1xf1 | B1 N1 C2 v B1 R1 C2 | `2b3C1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xa10 Cg1xi1 Ca10xg10 Ri10xg10 | A1 B1 N1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2A1Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xi10 Cg1xc1 Ci10xc10 Ra10xc10 | A1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2c2A1NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xi10 Cg1xi1 Ci10xc10 Ci1xf1 | B1 N1 C2 v B1 R1 C2 | `r1C3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xi10 Cg1xi1 Ci10xc10 Ra10xc10 | A1 B1 N1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2A1Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xa10 Cg1xc1 Ca10xe10 Ri10xe10 | A1 N1 R1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2c2A1NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xa10 Cg1xi1 Ca10xe10 Ci1xf1 | B1 N1 C2 v N1 R1 C2 | `1n2C3r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xa10 Cg1xi1 Ca10xe10 Ri10xe10 | A1 B1 N1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2A1Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xi10 Cg1xc1 Ci10xb10 Ra10xb10 | A1 N1 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2c2A1NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xi10 Cg1xi1 Ci10xb10 Ci1xf1 | B1 N1 C2 v K1 R1 C2 | `rC2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xi10 Cg1xi1 Ci10xb10 Ra10xb10 | A1 B1 N1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2A1Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xa10 Cg1xa1 Ca10xg10 Ri10xg10 | K1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xa10 Cg1xi1 Ca10xg10 Ri10xg10 | K1 N1 R1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xi10 Cg1xa1 Ci10xc10 Ra10xc10 | K1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xi10 Cg1xi1 Ci10xc10 Ra10xc10 | K1 N1 R1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xa10 Ce1xa1 Ca10xg10 Ri10xg10 | B2 R1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B3B1R w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xa10 Ce1xi1 Ca10xg10 Ri10xg10 | B2 R1 C1 v B1 R1 C2 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B3B1c w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xi10 Ce1xa1 Ci10xc10 Ra10xc10 | B2 R1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B3B1R w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xi10 Ce1xi1 Ci10xc10 Ra10xc10 | B2 R1 C1 v B1 R1 C2 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B3B1c w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xa10 Cg1xa1 Ca10xe10 Ri10xe10 | K1 N1 R1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xa10 Cg1xi1 Ca10xe10 Ri10xe10 | K1 N1 R1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xa1 Ci10xb10 Ra10xb10 | K1 N1 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xi1 Ci10xb10 Ra10xb10 | K1 N1 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xa10 Ce1xa1 Ca10xe10 Ri10xe10 | B2 R1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B3B1R w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xa10 Ce1xi1 Ca10xe10 Ri10xe10 | B2 R1 C1 v N1 R1 C2 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B3B1c w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xi10 Ce1xa1 Ci10xb10 Ra10xb10 | B2 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B3B1R w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xi10 Ce1xi1 Ci10xb10 Ra10xb10 | B2 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B3B1c w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xa10 Cg1xi1 Ca10xd10 Ci1xf1 | B1 N1 C2 v B1 N1 C2 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xg10 Cg1xc1 Cg10xb10 Ra10xb10 | A1 N1 R1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2c2A1NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xg10 Cg1xi1 Cg10xb10 Ci1xf1 | B1 N1 C2 v A1 R1 C2 | `rC1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2c1N1 w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xg10 Cg1xi1 Cg10xb10 Ra10xb10 | A1 B1 N1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B2A1Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xg10 Cg1xa1 Cg10xb10 Ra10xb10 | K1 N1 R1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xg10 Cg1xi1 Cg10xb10 Ra10xb10 | K1 N1 R1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xg10 Ce1xa1 Cg10xb10 Ra10xb10 | B2 R1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B3B1R w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xg10 Ce1xi1 Cg10xb10 Ra10xb10 | B2 R1 C1 v A1 R1 C2 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B3B1c w - - 0 8` |
| 15 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xi10 Ce1xa1 Ci10xf10 Ca1xg1 Ri1xg1 | B1 R1 C2 v B1 N1 C1 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 b - - 0 8` |
| 15 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xi10 Ce1xi1 Ci10xf10 Ci1xc1 Ra1xc1 | B1 R1 C2 v B1 N1 C1 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 b - - 0 8` |
| 15 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xi10 Cc1xa1 Ci10xf10 Ca1xe1 Ri1xe1 | N1 R1 C2 v B1 N1 C1 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 b - - 0 8` |
| 15 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xi10 Cc1xi1 Ci10xf10 Ci1xb1 Ra1xb1 | K1 R1 C2 v B1 N1 C1 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1R2K4 b - - 0 8` |
| 15 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xi10 Cc1xg1 Ci10xf10 Cg1xb1 Ra1xb1 | A1 R1 C2 v B1 N1 C1 | `2b2C1n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1R1A5 b - - 0 8` |
| 15 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xa10 Cg1xc1 Ca10xd10 Cc1xh1 Ri1xh1 | A1 R1 C2 v B1 N1 C1 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/5A1R1 b - - 0 8` |
| 15 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xa10 Cg1xa1 Ca10xd10 Ca1xh1 Ri1xh1 | K1 R1 C2 v B1 N1 C1 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4K2R1 b - - 0 8` |
| 15 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xa10 Cg1xi1 Ca10xd10 Ci1xe1 Ra1xe1 | N1 R1 C2 v B1 N1 C1 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 b - - 0 8` |
| 15 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xa10 Ce1xa1 Ca10xd10 Ca1xg1 Ri1xg1 | B1 R1 C2 v B1 N1 C1 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 b - - 0 8` |
| 15 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xa10 Ce1xi1 Ca10xd10 Ci1xc1 Ra1xc1 | B1 R1 C2 v B1 N1 C1 | `1n1C2b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 b - - 0 8` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xc10 Ce1xa1 Cc10xh10 Ca1xg1 Ri1xg1 Ri10xh10 | B1 R1 C1 v A1 R1 C1 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xb1 Ce10xg10 Cb1xe1 Cg10xc10 Ce1xi1 Cc10xh10 Ci1xc1 Ra1xc1 Ri10xh10 | B1 R1 C1 v A1 R1 C1 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xc10 Cc1xa1 Cc10xh10 Ca1xe1 Ri1xe1 Ri10xh10 | N1 R1 C1 v A1 R1 C1 | `5a1r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xa10 Ce1xa1 Ca10xh10 Ca1xg1 Ri1xg1 Ri10xh10 | B1 R1 C1 v K1 R1 C1 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xa10 Ce1xi1 Ca10xh10 Ci1xc1 Ra1xc1 Ri10xh10 | B1 R1 C1 v K1 R1 C1 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xi10 Ce1xa1 Ci10xe10 Ca1xg1 Ri1xg1 Ra10xe10 | B1 R1 C1 v N1 R1 C1 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Cc10xg10 Cb1xe1 Cg10xi10 Ce1xi1 Ci10xe10 Ci1xc1 Ra1xc1 Ra10xe10 | B1 R1 C1 v N1 R1 C1 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xa1 Ca10xh10 Ca1xe1 Ri1xe1 Ri10xh10 | N1 R1 C1 v K1 R1 C1 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xi10 Cc1xa1 Ci10xe10 Ca1xe1 Ri1xe1 Ra10xe10 | N1 R1 C1 v N1 R1 C1 | `4r2n1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xa10 Ce1xa1 Ca10xg10 Ca1xg1 Ri1xg1 Ri10xg10 | B1 R1 C1 v B1 R1 C1 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xa10 Ce1xi1 Ca10xg10 Ci1xc1 Ra1xc1 Ri10xg10 | B1 R1 C1 v B1 R1 C1 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xi10 Ce1xa1 Ci10xc10 Ca1xg1 Ri1xg1 Ra10xc10 | B1 R1 C1 v B1 R1 C1 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B3R2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xb1 Ch10xe10 Cb1xe1 Ce10xi10 Ce1xi1 Ci10xc10 Ci1xc1 Ra1xc1 Ra10xc10 | B1 R1 C1 v B1 R1 C1 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2R3B2 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xa10 Cc1xa1 Ca10xg10 Ca1xe1 Ri1xe1 Ri10xg10 | N1 R1 C1 v B1 R1 C1 | `2b3r2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 w - - 0 9` |
| 16 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xi10 Cc1xa1 Ci10xc10 Ca1xe1 Ri1xe1 Ra10xc10 | N1 R1 C1 v B1 R1 C1 | `2r3b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/1N2R4 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xa10 Cg1xi1 Ca10xg10 Ci1xe1 Ra1xe1 Ri10xg10 | N1 R1 C1 v B1 R1 C1 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xi10 Cg1xi1 Ci10xc10 Ci1xe1 Ra1xe1 Ra10xc10 | N1 R1 C1 v B1 R1 C1 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xa10 Ce1xa1 Ca10xg10 Ca1xg1 Ri1xg1 Ri10xg10 | B1 R1 C1 v B1 R1 C1 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xa10 Ce1xi1 Ca10xg10 Ci1xc1 Ra1xc1 Ri10xg10 | B1 R1 C1 v B1 R1 C1 | `2b3r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xi10 Ce1xa1 Ci10xc10 Ca1xg1 Ri1xg1 Ra10xc10 | B1 R1 C1 v B1 R1 C1 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xh1 Cb10xe10 Ch1xe1 Ce10xi10 Ce1xi1 Ci10xc10 Ci1xc1 Ra1xc1 Ra10xc10 | B1 R1 C1 v B1 R1 C1 | `2r3b2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xa10 Cg1xi1 Ca10xe10 Ci1xe1 Ra1xe1 Ri10xe10 | N1 R1 C1 v N1 R1 C1 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xi1 Ci10xb10 Ci1xe1 Ra1xe1 Ra10xb10 | N1 R1 C1 v K1 R1 C1 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xa10 Ce1xa1 Ca10xe10 Ca1xg1 Ri1xg1 Ri10xe10 | B1 R1 C1 v N1 R1 C1 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xa10 Ce1xi1 Ca10xe10 Ci1xc1 Ra1xc1 Ri10xe10 | B1 R1 C1 v N1 R1 C1 | `1n2r4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xi10 Ce1xa1 Ci10xb10 Ca1xg1 Ri1xg1 Ra10xb10 | B1 R1 C1 v K1 R1 C1 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Cg10xc10 Ch1xe1 Cc10xi10 Ce1xi1 Ci10xb10 Ci1xc1 Ra1xc1 Ra10xb10 | B1 R1 C1 v K1 R1 C1 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xg10 Cg1xi1 Cg10xb10 Ci1xe1 Ra1xe1 Ra10xb10 | N1 R1 C1 v A1 R1 C1 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4R2N1 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xg10 Ce1xa1 Cg10xb10 Ca1xg1 Ri1xg1 Ra10xb10 | B1 R1 C1 v A1 R1 C1 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2B3R2 w - - 0 9` |
| 16 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xh1 Ce10xc10 Ch1xe1 Cc10xg10 Ce1xi1 Cg10xb10 Ci1xc1 Ra1xc1 Ra10xb10 | B1 R1 C1 v A1 R1 C1 | `1r1a5/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R3B2 w - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xi10 Cc1xi1 Ci10xe10 Ci1xb1 Ra1xb1 Ra10xe10 Rb1xb8 | K1 R1 C1 v N1 R1 | `4r2n1/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/4K4 b - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xa10 Cc1xi1 Ca10xg10 Ci1xb1 Ra1xb1 Ri10xg10 Rb1xb8 | K1 R1 C1 v B1 R1 | `2b3r2/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/4K4 b - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Cd1xg1 Ch10xe10 Cg1xc1 Ce10xi10 Cc1xi1 Ci10xc10 Ci1xb1 Ra1xb1 Ra10xc10 Rb1xb8 | K1 R1 C1 v B1 R1 | `2r3b2/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/4K4 b - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xi10 Cc1xg1 Ci10xe10 Cg1xb1 Ra1xb1 Ra10xe10 Rb1xb8 | A1 R1 C1 v N1 R1 | `4r2n1/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/3A5 b - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xa10 Cc1xg1 Ca10xg10 Cg1xb1 Ra1xb1 Ri10xg10 Rb1xb8 | A1 R1 C1 v B1 R1 | `2b3r2/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/3A5 b - - 0 9` |
| 17 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xh10 Ci1xe1 Ch10xe10 Ce1xc1 Ce10xi10 Cc1xg1 Ci10xc10 Cg1xb1 Ra1xb1 Ra10xc10 Rb1xb8 | A1 R1 C1 v B1 R1 | `2r3b2/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/3A5 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xa10 Cg1xc1 Ca10xg10 Cc1xh1 Ri1xh1 Ri10xg10 Rh1xh8 | A1 R1 C1 v B1 R1 | `2b3r2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/5A3 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xb10 Ca1xe1 Cb10xe10 Ce1xg1 Ce10xi10 Cg1xc1 Ci10xc10 Cc1xh1 Ri1xh1 Ra10xc10 Rh1xh8 | A1 R1 C1 v B1 R1 | `2r3b2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/5A3 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xa10 Cg1xc1 Ca10xe10 Cc1xh1 Ri1xh1 Ri10xe10 Rh1xh8 | A1 R1 C1 v N1 R1 | `1n2r4/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/5A3 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xa10 Cg1xa1 Ca10xg10 Ca1xh1 Ri1xh1 Ri10xg10 Rh1xh8 | K1 R1 C1 v B1 R1 | `2b3r2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4K4 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Cf1xc1 Cb10xe10 Cc1xg1 Ce10xi10 Cg1xa1 Ci10xc10 Ca1xh1 Ri1xh1 Ra10xc10 Rh1xh8 | K1 R1 C1 v B1 R1 | `2r3b2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4K4 b - - 0 9` |
| 17 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xa10 Cg1xa1 Ca10xe10 Ca1xh1 Ri1xh1 Ri10xe10 Rh1xh8 | K1 R1 C1 v N1 R1 | `1n2r4/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/4K4 b - - 0 9` |
| 18 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xd1 Ca10xe10 Cd1xg1 Ce10xg10 Cg1xc1 Cg10xc10 Cc1xi1 Cc10xh10 Ci1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | K1 R1 v A1 R1 | `5a3/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/4K4 w - - 0 10` |
| 18 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 Cf1xi1 Ca10xe10 Ci1xe1 Ce10xg10 Ce1xc1 Cg10xc10 Cc1xg1 Cc10xh10 Cg1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | A1 R1 v A1 R1 | `5a3/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/3A5 w - - 0 10` |
| 18 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xi1 Ca10xh10 Ci1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | K1 R1 v K1 R1 | `4k4/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/4K4 w - - 0 10` |
| 18 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 Cf10xc10 Ci1xe1 Cc10xg10 Ce1xc1 Cg10xa10 Cc1xg1 Ca10xh10 Cg1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | A1 R1 v K1 R1 | `4k4/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/3A5 w - - 0 10` |
| 18 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 Cd10xg10 Ca1xe1 Cg10xc10 Ce1xg1 Cc10xi10 Cg1xc1 Ci10xb10 Cc1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | A1 R1 v K1 R1 | `4k4/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/5A3 w - - 0 10` |
| 18 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xa1 Ci10xb10 Ca1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | K1 R1 v K1 R1 | `4k4/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/4K4 w - - 0 10` |
| 18 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xa1 Ci10xe10 Ca1xe1 Ce10xc10 Ce1xg1 Cc10xg10 Cg1xc1 Cg10xb10 Cc1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | A1 R1 v A1 R1 | `3a5/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/5A3 w - - 0 10` |
| 18 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 Cd1xf1 Ci10xe10 Cf1xc1 Ce10xc10 Cc1xg1 Cc10xg10 Cg1xa1 Cg10xb10 Ca1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | K1 R1 v A1 R1 | `3a5/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/4K4 w - - 0 10` |

## The leaves, `generalRoyal = true`

| plies | line | material at the leaf (non-soldiers) | FEN |
|---|---|---|---|
| 4 | Cb3xb10 Ch8xh1 Ri1xh1 Ra10xb10 | K1 A2 B2 N1 R2 C1 v K1 A2 B2 N1 R2 C1 | `1rbakabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKABR1 w - - 0 3` |
| 4 | Cb3xb10 Ra10xb10 Ch3xh10 Ri10xh10 | K1 A2 B2 N2 R2 v K1 A2 B2 R2 C2 | `1rbakabr1/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/9/9/RNBAKABNR w - - 0 3` |
| 4 | Ch3xh10 Cb8xb1 Ra1xb1 Ri10xh10 | K1 A2 B2 N1 R2 C1 v K1 A2 B2 N1 R2 C1 | `rnbakabr1/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/1RBAKABNR w - - 0 3` |
| 4 | Ch3xh10 Ri10xh10 Cb3xb10 Ra10xb10 | K1 A2 B2 N2 R2 v K1 A2 B2 R2 C2 | `1rbakabr1/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/9/9/RNBAKABNR w - - 0 3` |
| 5 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xa10 | K1 A1 B2 N1 R2 C2 v K1 A1 B2 N1 R1 C2 | `C1b1kabnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKcB1R b - - 0 3` |
| 5 | Cb3xb10 Ch8xh1 Cb10xd10 Ke10xd10 Ri1xh1 | K1 A2 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `r1bk1abnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKABR1 b - - 0 3` |
| 5 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xi10 | K1 A1 B2 N1 R2 C2 v K1 A1 B2 N1 R1 C2 | `rnbak1b1C/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1BcKABNR b - - 0 3` |
| 5 | Ch3xh10 Cb8xb1 Ch10xf10 Ke10xf10 Ra1xb1 | K1 A2 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `rnba1kb1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/1RBAKABNR b - - 0 3` |
| 6 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xi1 | K1 A1 B2 N1 R1 C2 v K1 B2 N1 R2 C2 | `r1b1kCbnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAK1B1c w - - 0 4` |
| 6 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Ke10xf10 | K1 A1 B2 N1 R2 C1 v K1 B2 N1 R2 C2 | `r1b2kbnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBAKcB1R w - - 0 4` |
| 6 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Ke1xf1 Ke10xd10 | K1 A1 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `r1bk1abnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBA1KB1R w - - 0 4` |
| 6 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xa1 | K1 A1 B2 N1 R1 C2 v K1 B2 N1 R2 C2 | `rnbCk1b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c1B1KABNR w - - 0 4` |
| 6 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Ke10xd10 | K1 A1 B2 N1 R2 C1 v K1 B2 N1 R2 C2 | `rnbk2b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1BcKABNR w - - 0 4` |
| 6 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Ke1xd1 Ke10xf10 | K1 A1 B2 N1 R2 C1 v K1 A1 B2 N1 R2 C1 | `rnba1kb1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1BK1ABNR w - - 0 4` |
| 8 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Ke1xd1 Ke10xf10 | K1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `r1b2kbnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBK2B1R w - - 0 5` |
| 8 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Ke1xf1 Ke10xd10 | K1 B2 N1 R2 C1 v K1 B2 N1 R2 C1 | `rnbk2b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B2KBNR w - - 0 5` |
| 9 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Ra10xc10 Ke1xd1 | K1 B2 N1 R2 C1 v K1 B1 N1 R2 C1 | `2r1k1bnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNBK2B1R b - - 0 5` |
| 9 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Ri10xg10 Ke1xf1 | K1 B2 N1 R2 C1 v K1 B1 N1 R2 C1 | `rnb1k1r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B2KBNR b - - 0 5` |
| 10 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Ri1xg1 Ra10xc10 | K1 B1 N1 R2 C1 v K1 B1 N1 R2 C1 | `2r1k1bnr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNB1K1R2 w - - 0 6` |
| 10 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xh10 Ri10xh10 Ke1xd1 Rh10xh3 | K1 B2 N1 R2 v K1 B2 R2 C1 | `r1b1k1b2/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/RNBK2B1R w - - 0 6` |
| 10 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xb10 Ra10xb10 Ke1xf1 Rb10xb3 | K1 B2 N1 R2 v K1 B2 R2 C1 | `2b1k1b1r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/R1B2KBNR w - - 0 6` |
| 10 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Ra1xc1 Ri10xg10 | K1 B1 N1 R2 C1 v K1 B1 N1 R2 C1 | `rnb1k1r2/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/2R1K1BNR w - - 0 6` |
| 11 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xb1 Ra1xb1 Ra10xc10 Rb1xb8 | K1 B2 R2 C1 v K1 B1 N1 R2 | `2r1k1bnr/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/2B1K1B1R b - - 0 6` |
| 11 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xi10 | K1 N1 R2 C2 v K1 N1 R1 C2 | `r3k2nC/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RNc1K3R b - - 0 6` |
| 11 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xa10 | K1 N1 R2 C2 v K1 N1 R1 C2 | `Cn2k3r/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K1cNR b - - 0 6` |
| 11 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xh1 Ri1xh1 Ri10xg10 Rh1xh8 | K1 B2 R2 C1 v K1 B1 N1 R2 | `rnb1k1r2/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R1B1K1B2 b - - 0 6` |
| 12 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xa1 | K1 N1 R1 C2 v K1 N1 R1 C2 | `C3k2nr/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/cN2K3R w - - 0 7` |
| 12 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xi1 | K1 N1 R1 C2 v K1 N1 R1 C2 | `rn2k3C/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/R3K2Nc w - - 0 7` |
| 14 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xi1 Ca10xh10 Ri10xh10 | K1 N1 R1 C1 v K1 R1 C2 | `4k2r1/9/1c7/p1p1p1p1p/9/9/P1P1P1P1P/7C1/9/RN2K3c w - - 0 8` |
| 14 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xa1 Ci10xb10 Ra10xb10 | K1 N1 R1 C1 v K1 R1 C2 | `1r2k4/9/7c1/p1p1p1p1p/9/9/P1P1P1P1P/1C7/9/c3K2NR w - - 0 8` |
| 18 | Cb3xb10 Ch8xh1 Cb10xd10 Ch1xf1 Cd10xf10 Cf1xd1 Cf10xc10 Cd1xg1 Cc10xg10 Cg1xc1 Cg10xa10 Cc1xi1 Ca10xh10 Ci1xb1 Ra1xb1 Ri10xh10 Rb1xb8 Rh10xh3 | K1 R1 v K1 R1 | `4k4/9/1R7/p1p1p1p1p/9/9/P1P1P1P1P/7r1/9/4K4 w - - 0 10` |
| 18 | Ch3xh10 Cb8xb1 Ch10xf10 Cb1xd1 Cf10xd10 Cd1xf1 Cd10xg10 Cf1xc1 Cg10xc10 Cc1xg1 Cc10xi10 Cg1xa1 Ci10xb10 Ca1xh1 Ri1xh1 Ra10xb10 Rh1xh8 Rb10xb3 | K1 R1 v K1 R1 | `4k4/9/7R1/p1p1p1p1p/9/9/P1P1P1P1P/1r7/9/4K4 w - - 0 10` |
