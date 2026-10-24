// src/domain/tournamentEngine.ts
// Single-Elimination Tournament Bracket & Dynamic Elo Rating Engine for ELEMENTA
// Models 16-Player Competitive Chemistry Cups with IUPAC Scientist Personas

export type TournamentRound = 'ROUND_OF_16' | 'QUARTER_FINALS' | 'SEMI_FINALS' | 'GRAND_FINALS';

export interface TournamentCompetitor {
  id: string;
  name: string;
  titleVI: string;
  archetype: 'NITRO_LEGION' | 'SULFUR_FORGE' | 'ALKALI_HALOGEN' | 'ORGANIC_SYNTHESIS';
  seed: number; // 1 to 16
  rating: number; // Elo rating, baseline 1200
  provisionalMatchesRemaining: number; // starts at 10, uses K=32; once 0, uses K=16
  matchesWon: number;
  matchesLost: number;
  eliminatedInRound?: TournamentRound;
  isChampion?: boolean;
}

export interface TournamentMatch {
  matchId: string;
  round: TournamentRound;
  roundIndex: number; // 0, 1, 2, 3
  matchIndex: number;
  competitorA: TournamentCompetitor;
  competitorB: TournamentCompetitor;
  winner?: TournamentCompetitor;
  loser?: TournamentCompetitor;
  finalScoreA: number; // Final LP or points
  finalScoreB: number;
  turns: number;
  tieBreakerUsed?: boolean;
  eloChangeA: number;
  eloChangeB: number;
}

export interface EloCalculationResult {
  expectedScoreA: number;
  expectedScoreB: number;
  newRatingA: number;
  newRatingB: number;
  deltaA: number;
  deltaB: number;
}

/**
 * 16 Canonical IUPAC Chemistry Competitor Personas with Authentic Historical Context
 */
export const CANONICAL_CHEMIST_ROSTER: Omit<TournamentCompetitor, 'seed' | 'matchesWon' | 'matchesLost'>[] = [
  { id: 'c_mendeleev', name: 'Dmitri Mendeleev', titleVI: 'Cha Đẻ Bảng Tuần Hoàn', archetype: 'ALKALI_HALOGEN', rating: 1650, provisionalMatchesRemaining: 0 },
  { id: 'c_lavoisier', name: 'Antoine Lavoisier', titleVI: 'Định Luật Bảo Toàn Khối Lượng', archetype: 'NITRO_LEGION', rating: 1620, provisionalMatchesRemaining: 0 },
  { id: 'c_curie', name: 'Marie Curie', titleVI: 'Tiên Phong Phóng Xạ & Poloni', archetype: 'SULFUR_FORGE', rating: 1600, provisionalMatchesRemaining: 0 },
  { id: 'c_dalton', name: 'John Dalton', titleVI: 'Thuyết Nguyên Tử Cổ Điển', archetype: 'ORGANIC_SYNTHESIS', rating: 1560, provisionalMatchesRemaining: 0 },
  { id: 'c_bohr', name: 'Niels Bohr', titleVI: 'Mô Hình Quỹ Đạo Lượng Tử', archetype: 'ALKALI_HALOGEN', rating: 1540, provisionalMatchesRemaining: 0 },
  { id: 'c_rutherford', name: 'Ernest Rutherford', titleVI: 'Thí Nghiệm Lá Vàng Hạt Nhân', archetype: 'SULFUR_FORGE', rating: 1520, provisionalMatchesRemaining: 0 },
  { id: 'c_lewis', name: 'Gilbert N. Lewis', titleVI: 'Cấu Trúc Octet & Cặp Electron', archetype: 'ORGANIC_SYNTHESIS', rating: 1490, provisionalMatchesRemaining: 0 },
  { id: 'c_arrhenius', name: 'Svante Arrhenius', titleVI: 'Năng Lượng Hoạt Hóa & Điện Ly', archetype: 'NITRO_LEGION', rating: 1470, provisionalMatchesRemaining: 0 },
  { id: 'c_gibbs', name: 'Josiah Willard Gibbs', titleVI: 'Năng Lượng Tự Do Nhiệt Động', archetype: 'SULFUR_FORGE', rating: 1440, provisionalMatchesRemaining: 2 },
  { id: 'c_le_chatelier', name: 'Henri Le Chatelier', titleVI: 'Nguyên Lý Chuyển Dịch Cân Bằng', archetype: 'NITRO_LEGION', rating: 1410, provisionalMatchesRemaining: 4 },
  { id: 'c_nernst', name: 'Walther Nernst', titleVI: 'Thế Điện Cực Pin Galvanic', archetype: 'ALKALI_HALOGEN', rating: 1380, provisionalMatchesRemaining: 5 },
  { id: 'c_faraday', name: 'Michael Faraday', titleVI: 'Định Luật Điện Phân Định Lượng', archetype: 'SULFUR_FORGE', rating: 1350, provisionalMatchesRemaining: 6 },
  { id: 'c_avogadro', name: 'Amedeo Avogadro', titleVI: 'Số Hạt Khí Lý Tưởng (6.022×10²³)', archetype: 'ORGANIC_SYNTHESIS', rating: 1320, provisionalMatchesRemaining: 8 },
  { id: 'c_boyle', name: 'Robert Boyle', titleVI: 'Định Luật Khí & Hóa Học Thực Nghiệm', archetype: 'NITRO_LEGION', rating: 1290, provisionalMatchesRemaining: 8 },
  { id: 'c_pauling', name: 'Linus Pauling', titleVI: 'Thang Độ Âm Điện Pauling', archetype: 'ALKALI_HALOGEN', rating: 1260, provisionalMatchesRemaining: 10 },
  { id: 'c_moseley', name: 'Henry Moseley', titleVI: 'Số Hiệu Nguyên Tử Tia X', archetype: 'ORGANIC_SYNTHESIS', rating: 1200, provisionalMatchesRemaining: 10 }
];

export class TournamentEngine {
  /**
   * Calculates zero-sum Elo rating changes adhering to standard FIDE / competitive esports rules.
   */
  public static calculateElo(
    ratingA: number,
    ratingB: number,
    scoreA: number, // 1 for win, 0.5 for draw, 0 for loss
    kFactorA: number = 32,
    kFactorB: number = 32
  ): EloCalculationResult {
    // Expected win probabilities
    const expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    const expectedScoreB = 1 - expectedScoreA;

    const scoreB = 1 - scoreA;
    const deltaA = Math.round(kFactorA * (scoreA - expectedScoreA));
    const deltaB = Math.round(kFactorB * (scoreB - expectedScoreB));

    const newRatingA = Math.max(100, ratingA + deltaA);
    const newRatingB = Math.max(100, ratingB + deltaB);

    return {
      expectedScoreA,
      expectedScoreB,
      newRatingA,
      newRatingB,
      deltaA,
      deltaB
    };
  }

  /**
   * Initializes a 16-player bracket with strict canonical seeding (Seed 1 vs 16, 8 vs 9, etc.)
   */
  public static generate16PlayerBracket(
    roster: Omit<TournamentCompetitor, 'seed' | 'matchesWon' | 'matchesLost'>[] = CANONICAL_CHEMIST_ROSTER
  ): { competitors: TournamentCompetitor[]; round1Matches: TournamentMatch[] } {
    if (roster.length !== 16) {
      throw new Error(`16-player bracket requires exactly 16 competitors, received ${roster.length}`);
    }

    // Sort by rating descending to assign seeds 1 to 16
    const sorted = [...roster].sort((a, b) => b.rating - a.rating);
    const competitors: TournamentCompetitor[] = sorted.map((c, idx) => ({
      ...c,
      seed: idx + 1,
      matchesWon: 0,
      matchesLost: 0
    }));

    // Canonical 16-seed bracket pairings:
    // Pair 0: 1 vs 16
    // Pair 1: 8 vs 9
    // Pair 2: 4 vs 13
    // Pair 3: 5 vs 12
    // Pair 4: 2 vs 15
    // Pair 5: 7 vs 10
    // Pair 6: 3 vs 14
    // Pair 7: 6 vs 11
    const seedPairings: [number, number][] = [
      [1, 16],
      [8, 9],
      [4, 13],
      [5, 12],
      [2, 15],
      [7, 10],
      [3, 14],
      [6, 11]
    ];

    const round1Matches: TournamentMatch[] = seedPairings.map(([seedA, seedB], mIdx) => {
      const compA = competitors.find(c => c.seed === seedA)!;
      const compB = competitors.find(c => c.seed === seedB)!;
      return {
        matchId: `R16_M${mIdx + 1}`,
        round: 'ROUND_OF_16',
        roundIndex: 0,
        matchIndex: mIdx,
        competitorA: compA,
        competitorB: compB,
        finalScoreA: 0,
        finalScoreB: 0,
        turns: 0,
        eloChangeA: 0,
        eloChangeB: 0
      };
    });

    return { competitors, round1Matches };
  }

  /**
   * Resolves a tournament match between competitorA and competitorB.
   * Updates competitor wins/losses, computes Elo, and marks elimination.
   */
  public static resolveMatch(
    match: TournamentMatch,
    finalLpA: number,
    finalLpB: number,
    turns: number,
    tieBreakerFieldTotalAtkA: number = 0,
    tieBreakerFieldTotalAtkB: number = 0
  ): TournamentMatch {
    let scoreA = 0;
    let tieBreakerUsed = false;

    if (finalLpA > finalLpB) {
      scoreA = 1;
    } else if (finalLpB > finalLpA) {
      scoreA = 0;
    } else {
      // Tie-breaker: Highest total attack on field wins
      tieBreakerUsed = true;
      scoreA = tieBreakerFieldTotalAtkA >= tieBreakerFieldTotalAtkB ? 1 : 0;
    }

    const winner = scoreA === 1 ? match.competitorA : match.competitorB;
    const loser = scoreA === 1 ? match.competitorB : match.competitorA;

    winner.matchesWon++;
    loser.matchesLost++;
    loser.eliminatedInRound = match.round;

    // Determine K-factors
    const kA = match.competitorA.provisionalMatchesRemaining > 0 ? 32 : 16;
    const kB = match.competitorB.provisionalMatchesRemaining > 0 ? 32 : 16;

    const elo = this.calculateElo(
      match.competitorA.rating,
      match.competitorB.rating,
      scoreA,
      kA,
      kB
    );

    match.competitorA.rating = elo.newRatingA;
    match.competitorB.rating = elo.newRatingB;

    if (match.competitorA.provisionalMatchesRemaining > 0) {
      match.competitorA.provisionalMatchesRemaining--;
    }
    if (match.competitorB.provisionalMatchesRemaining > 0) {
      match.competitorB.provisionalMatchesRemaining--;
    }

    match.winner = winner;
    match.loser = loser;
    match.finalScoreA = finalLpA;
    match.finalScoreB = finalLpB;
    match.turns = turns;
    match.tieBreakerUsed = tieBreakerUsed;
    match.eloChangeA = elo.deltaA;
    match.eloChangeB = elo.deltaB;

    return match;
  }

  /**
   * Advances completed matches from round N to round N+1.
   * 8 R16 matches -> 4 QF matches.
   * 4 QF matches -> 2 SF matches.
   * 2 SF matches -> 1 GF match.
   */
  public static advanceRound(
    completedMatches: TournamentMatch[],
    nextRound: TournamentRound
  ): TournamentMatch[] {
    if (completedMatches.some(m => !m.winner)) {
      throw new Error(`Cannot advance round: All matches in current round must be completed`);
    }

    const nextMatches: TournamentMatch[] = [];
    const count = completedMatches.length;

    for (let i = 0; i < count; i += 2) {
      const winnerA = completedMatches[i].winner!;
      const winnerB = completedMatches[i + 1].winner!;
      const matchIdx = i / 2;
      const roundPrefix = nextRound === 'QUARTER_FINALS' ? 'QF' : nextRound === 'SEMI_FINALS' ? 'SF' : 'GF';

      nextMatches.push({
        matchId: `${roundPrefix}_M${matchIdx + 1}`,
        round: nextRound,
        roundIndex: completedMatches[0].roundIndex + 1,
        matchIndex: matchIdx,
        competitorA: winnerA,
        competitorB: winnerB,
        finalScoreA: 0,
        finalScoreB: 0,
        turns: 0,
        eloChangeA: 0,
        eloChangeB: 0
      });
    }

    return nextMatches;
  }
}
