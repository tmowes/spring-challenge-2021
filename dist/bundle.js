const seedSize = 0;
const smallSize = 1;
const mediumSize = 2;
const maxTreeSize = 3;
const maxDaysDuration = 24;
const costToGrowSizes = [1, 3, 7];

// import { countTreeSizes } from './calculateSizesCount'
const calcSunCostToGrow = (treeToGrow, myTrees) => {
    if (!treeToGrow)
        return 99;
    const costToGrowThis = costToGrowSizes[treeToGrow.size] +
        myTrees.filter(tree => tree.isMine && tree.size === treeToGrow.size + 1).length;
    console.error('calcSunCostToGrow', { costToGrowThis, treeToGrow });
    return costToGrowThis;
};

const countTreeSizes = (props) => {
    const { trees } = props;
    const sortedTrees = trees
        .filter(tree => tree.isMine)
        .sort((a, b) => a.cellIndex - b.cellIndex);
    const seedCount = sortedTrees.filter(tree => tree.size === seedSize).length;
    const smTreeCount = sortedTrees.filter(tree => tree.size === smallSize).length;
    const mdTreeCount = sortedTrees.filter(tree => tree.size === mediumSize).length;
    const lgTreeCount = sortedTrees.filter(tree => tree.size === maxTreeSize).length;
    return {
        seedCount,
        smTreeCount,
        mdTreeCount,
        lgTreeCount,
    };
};

const rankedActions = (props) => {
    const { day, sunPoints, trees, possibleSeeds, possibleGrows } = props;
    const { seedCount, smTreeCount, mdTreeCount, lgTreeCount } = countTreeSizes({ trees });
    const minCostToGrow = calcSunCostToGrow(possibleGrows[0], trees);
    const optionsCount = {
        grow: possibleGrows.length > 0 && sunPoints <= minCostToGrow ? 98 : 0,
        seed: possibleSeeds.length > 0 && seedCount < 1 && day < 20 ? 97 : -1,
        complete: day > 15 && lgTreeCount > 0 ? 99 : -1,
    };
    console.error('######################################');
    console.error('possibleGrowsLen:+', possibleGrows.length);
    console.error('seedCount:', seedCount);
    console.error('smTreeCount:', smTreeCount);
    console.error('mdTreeCount:', mdTreeCount);
    console.error('lgTreeCount:', lgTreeCount);
    console.error('##Rank_Grow:', optionsCount.grow);
    console.error('######################################');
    console.error('possibleSeedsLen:', possibleSeeds.length);
    console.error('seedCount:', seedCount);
    console.error('##Rank_Seed:', optionsCount.seed);
    console.error('######################################');
    const daysLeftToComplete = maxDaysDuration - lgTreeCount * 2 - mdTreeCount * 1.5 - 2;
    console.error('minCostToGrow', minCostToGrow);
    if (sunPoints < minCostToGrow)
        optionsCount.grow = 0;
    if (day > daysLeftToComplete && lgTreeCount > 0)
        optionsCount.complete = 99;
    const bestActionType = Object.entries(optionsCount)
        .sort((a, b) => b[1] - a[1])
        .shift()[0];
    console.error('___SHOULD COMPLETE', day > 15, day > daysLeftToComplete);
    console.error({ optionsCount });
    console.error({ bestActionType });
    // if (day === 0 || sunPoints < 3) {
    if (day === 0) {
        return 'wait';
    }
    if (day === 1) {
        return 'grow';
    }
    if (day === 2) {
        return 'seed';
    }
    return bestActionType;
};

/* eslint-disable radix */
const initialInput = () => {
    const cells = [];
    const numberOfCells = parseInt(readline());
    for (let i = 0; i < numberOfCells; i++) {
        const inputs = readline().split(' ');
        const index = parseInt(inputs[0]);
        const richness = parseInt(inputs[1]);
        const neigh0 = parseInt(inputs[2]);
        const neigh1 = parseInt(inputs[3]);
        const neigh2 = parseInt(inputs[4]);
        const neigh3 = parseInt(inputs[5]);
        const neigh4 = parseInt(inputs[6]);
        const neigh5 = parseInt(inputs[7]);
        cells.push({
            index,
            richness,
            neighbors: [neigh0, neigh1, neigh2, neigh3, neigh4, neigh5],
        });
    }
    const usableCells = cells.filter(cell => cell.richness > 0);
    return {
        numberOfCells,
        cells,
        usableCells,
    };
};

/* eslint-disable block-scoped-var */
/* eslint-disable radix */
const turnInput = () => {
    const day = parseInt(readline());
    const nutrients = parseInt(readline());
    var inputs = readline().split(' ');
    const sunPoints = parseInt(inputs[0]);
    const myScore = parseInt(inputs[1]);
    var inputs = readline().split(' ');
    const oppSun = parseInt(inputs[0]);
    const oppScore = parseInt(inputs[1]);
    const oppIsWaiting = inputs[2] !== '0';
    const numberOfTrees = parseInt(readline());
    const trees = [];
    const possibleActions = [];
    for (let i = 0; i < numberOfTrees; i++) {
        var inputs = readline().split(' ');
        const cellIndex = parseInt(inputs[0]);
        const size = parseInt(inputs[1]);
        const isMine = inputs[2] !== '0';
        const isDormant = inputs[3] !== '0';
        trees.push({
            cellIndex,
            size,
            isMine,
            isDormant,
        });
    }
    const numberOfPossibleActions = parseInt(readline());
    for (let i = 0; i < numberOfPossibleActions; i++) {
        const possibleAction = readline();
        possibleActions.push(possibleAction);
    }
    return {
        day,
        nutrients,
        sunPoints,
        myScore,
        oppSun,
        oppScore,
        oppIsWaiting,
        numberOfTrees,
        trees,
        possibleActions,
    };
};

const possibleGrow = (props) => {
    const { trees } = props;
    return trees
        .filter(tree => tree.isMine && tree.size < maxTreeSize && !tree.isDormant)
        .sort((a, b) => a.cellIndex - b.cellIndex);
};

const possibleComplete = (props) => {
    const { trees } = props;
    return trees
        .filter(tree => tree.isMine && tree.size === maxTreeSize && !tree.isDormant)
        .sort((a, b) => a.cellIndex - b.cellIndex);
};

const bestDiagonalForSeed = [
    { id: 0, values: [8, 10, 12, 14, 16, 18] },
    { id: 1, values: [3, 5, 9, 17, 20, 36] },
    { id: 2, values: [4, 6, 7, 11, 21, 23] },
    { id: 3, values: [1, 5, 9, 13, 24, 26] },
    { id: 4, values: [2, 6, 11, 15, 27, 29] },
    { id: 5, values: [1, 3, 13, 17, 30, 32] },
    { id: 6, values: [2, 4, 7, 15, 33, 35] },
    { id: 7, values: [2, 6, 21, 35] },
    { id: 8, values: [0, 10, 18, 19, 22] },
    { id: 9, values: [1, 3, 20, 24] },
    { id: 10, values: [0, 8, 12, 22, 25] },
    { id: 11, values: [2, 4, 23, 27] },
    { id: 12, values: [0, 10, 14, 25] },
    { id: 13, values: [3, 5, 26, 30] },
    { id: 14, values: [0, 12, 16, 28] },
    { id: 15, values: [4, 6, 33, 29] },
    { id: 16, values: [0, 14, 18, 31, 34] },
    { id: 17, values: [1, 5, 32, 36] },
    { id: 18, values: [0, 8, 16, 19, 34] },
    { id: 19, values: [8, 18] },
    { id: 20, values: [1, 9, 36] },
    { id: 21, values: [2, 7, 23] },
    { id: 22, values: [8, 10] },
    { id: 23, values: [2, 11, 21] },
    { id: 24, values: [3, 9, 26] },
    { id: 25, values: [10, 12] },
    { id: 26, values: [3, 13, 24] },
    { id: 27, values: [4, 11, 29] },
    { id: 28, values: [12, 14] },
    { id: 29, values: [4, 15, 27] },
    { id: 30, values: [5, 13, 32] },
    { id: 31, values: [14, 16] },
    { id: 32, values: [5, 17, 30] },
    { id: 33, values: [6, 15, 35] },
    { id: 34, values: [16, 18] },
    { id: 35, values: [6, 7, 33] },
    { id: 36, values: [1, 17, 20] },
];

const possibleSeed3 = (props) => {
    const { trees, possibleActions, usableCells } = props;
    const possibleSeeds = [];
    trees
        .filter(tree => tree.isMine && !tree.isDormant && tree.size >= 2)
        .map(tree => {
        const possibleCells = usableCells
            .filter(cell => !trees.some(hasTree => hasTree.cellIndex === cell.index))
            .filter(cell => bestDiagonalForSeed[tree.cellIndex].values.indexOf(cell.index) > -1)
            .sort((a, b) => b.richness - a.richness);
        console.error('possibleSeed3::possibleCells:::::::::', JSON.stringify(possibleCells));
        if (possibleCells.length > 0) {
            possibleSeeds.push({
                srcID: tree.cellIndex,
                trgID: possibleCells[0].index,
            });
        }
    });
    if (possibleSeeds.length > 0) {
        console.error('possibleSeed3::BestDiagonalForSeed:::::::::', JSON.stringify(possibleSeeds));
        return possibleSeeds;
    }
    console.error('possibleSeed3::FALLBACK:::::::::');
    const sortedActionsSeeds = possibleActions
        .map(action => action.split(' '))
        .filter(item => item[0] === 'SEED')
        .sort((a, b) => Number(a[2]) - Number(b[2]));
    if (sortedActionsSeeds.length > 0) {
        sortedActionsSeeds.map(item => {
            possibleSeeds.push({
                srcID: Number(item[1]),
                trgID: Number(item[2]),
            });
        });
    }
    console.error('possibleSeed3::FALLBACK:::::::::', { possibleSeeds });
    return possibleSeeds;
};

var _a, _b;
const { cells, usableCells } = initialInput();
let onlyOneSeed = 1;
while (true) {
    let turnAction = 'WAIT';
    const { trees, possibleActions, sunPoints, myScore, oppScore, nutrients, day } = turnInput();
    console.error('___DAY:', day);
    // const bestPossibleSeed2 = possibleSeed2({
    //   cells,
    //   usableCells,
    //   possibleActions,
    // })
    const bestPossibleSeed3 = possibleSeed3({ trees, possibleActions, usableCells });
    const bestPossibleGrow = possibleGrow({ trees });
    const bestPossibleComplete = possibleComplete({ trees });
    const bestActionType = rankedActions({
        trees,
        possibleActions,
        sunPoints,
        myScore,
        oppScore,
        nutrients,
        day,
        cells,
        usableCells,
        possibleSeeds: bestPossibleSeed3,
        possibleGrows: bestPossibleGrow,
        possibleCompletes: bestPossibleComplete,
    });
    console.error({ possibleActions });
    // console.error({ bestPossibleSeed3 })
    if (bestActionType === 'grow' && bestPossibleGrow.length) {
        turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`;
    }
    if (bestActionType === 'seed' &&
        bestPossibleSeed3.length &&
        onlyOneSeed !== day &&
        day < 19) {
        onlyOneSeed = day;
        turnAction = `SEED ${bestPossibleSeed3[0].srcID} ${bestPossibleSeed3[0].trgID}`;
    }
    if (bestActionType === 'complete' && bestPossibleComplete.length) {
        turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `;
    }
    if (bestActionType !== 'wait' && day > 15 && bestPossibleComplete.length) {
        turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `;
    }
    console.log(turnAction, `${turnAction} growID:${(_a = bestPossibleGrow[0]) === null || _a === void 0 ? void 0 : _a.cellIndex} seedID:${(_b = bestPossibleSeed3[0]) === null || _b === void 0 ? void 0 : _b.trgID}`);
}
