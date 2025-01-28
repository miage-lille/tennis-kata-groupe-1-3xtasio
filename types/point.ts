export type Point = Love | Fifteen | Thirty;

export type Love = {
    kind: 'LOVE';
};

export type Fifteen = {
    kind: 'FIFTEEN';
};

export type Thirty = {
    kind: 'THIRTY';
};


export type PointsData = {
    playerOne: Point;
    playerTwo: Point;
};

export type Points = {
    kind: 'POINTS';
    pointsData: PointsData;
};


export const points = (
    playerOnePoints: Point,
    playerTwoPoints: Point
): Points => ({
    kind: 'POINTS',
    pointsData: {
        playerOne: playerOnePoints,
        playerTwo: playerTwoPoints,
    },
});