import * as fc from 'fast-check';
import { Player } from '../types/player';
import {
  Forty,
  FortyData,
} from '../types/score';

import { Fifteen, Love, Point, Points, Thirty } from '../types/point';
export const playerOneArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_ONE');
export const playerTwoArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_TWO');
export const getPlayer = () => fc.oneof(playerOneArb(), playerTwoArb());
export const getPoint = (): fc.Arbitrary<Point> =>
  fc.oneof(getLove(), getFifteen(), getThirty());
export const getPoints = (): fc.Arbitrary<Points> =>
  fc.record({
    kind: fc.constant('POINTS'),
    pointsData: fc.record({
      playerOne: getPoint(),
      playerTwo: getPoint(),
    }),
  });
export const getFortyData = (): fc.Arbitrary<FortyData> =>
  fc.record({
    player: getPlayer(),
    otherPoint: getPoint(),
  });
export const getForty = (): fc.Arbitrary<Forty> =>
  fc.record({
    fortyData: getFortyData(),
    kind: fc.constant('FORTY'),
  });
export const getLove = (): fc.Arbitrary<Love> =>
  fc.record({
    kind: fc.constant('LOVE'),
  });

export const getThirty = (): fc.Arbitrary<Thirty> =>
  fc.record({
    kind: fc.constant('THIRTY'),
  });
export const getFifteen = (): fc.Arbitrary<Fifteen> =>
  fc.record({
    kind: fc.constant('FIFTEEN'),
  });
