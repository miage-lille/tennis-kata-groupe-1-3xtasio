import { Player } from './types/player';
import { Point, points, PointsData } from './types/point';
import { love, Score } from './types/score';
// import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
// import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

// Exercice 1 :




// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
const launchGame = () => {
  const newGame: Score = points(love(), love());
  console.log(newGame);
}

launchGame();