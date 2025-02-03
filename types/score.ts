import { isSamePlayer, Player } from './player';
import { Point, points, Points, PointsData } from './point';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.


export type Deuce = {
  kind: 'DEUCE';
};

export type FortyData = {
  player: Player; // The player who have forty points
  otherPoint: Point; // Points of the other player
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type Game = {
  kind: 'GAME';
  player: Player;
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Score = Points | Forty | Deuce | Advantage | Game;

export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return '0';
    case 'FIFTEEN':
      return '15';
    case 'THIRTY':
      return '30';
  }
}



export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return `${pointToString(score.pointsData.PLAYER_ONE)} - ${pointToString(score.pointsData.PLAYER_TWO)}`;
    case 'DEUCE':
      return 'Deuce';
    case 'FORTY':
      return `${playerToString(score.fortyData.player)} - ${pointToString(score.fortyData.otherPoint)}`;
    case 'ADVANTAGE':
      return `Advantage ${playerToString(score.player)}`;
    case 'GAME':
      return `Game ${playerToString(score.player)}`;
  }
}

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const thirty = (): Point => ({
  kind: 'THIRTY',
});

export const fifteen = (): Point => ({
  kind: 'FIFTEEN',
});

export const love = (): Point => ({
  kind: 'LOVE',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});
export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);
export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};


export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenGame = (winner: Player): Score => game(winner);


export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  return pipe(
    incrementPoint(current[winner]),
    matchOpt(
      () => forty(winner, current[otherPlayer(winner)]),
      (newPoint) => ({
        kind: 'POINTS',
        pointsData: {
          ...current,
          [winner]: newPoint,
        },
      } as Score)
    )
  );

};
const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};