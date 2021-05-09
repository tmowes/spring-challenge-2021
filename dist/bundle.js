const seedSize = 0;
const smallSize = 1;
const mediumSize = 2;
const maxTreeSize = 3;
const maxDaysDuration = 24;
const costToGrowSizes = [1, 3, 7];
const minSunIncome = 7; // someGreedValue?

const calcSunCostToGrow = (treeToGrow, myTrees) => {
    if (!treeToGrow)
        return 99;
    return (costToGrowSizes[treeToGrow.size] +
        myTrees.filter(tree => tree.size === treeToGrow.size).length);
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
    const { day, nutrients, sunPoints, myScore, oppScore, trees, possibleSeeds, possibleGrows, possibleCompletes, } = props;
    const { seedCount, smTreeCount, mdTreeCount, lgTreeCount } = countTreeSizes({ trees });
    const optionsCount = {
        grow: possibleGrows.length + seedCount + day,
        seed: Math.max(possibleSeeds.length, 3) - seedCount - day,
        complete: 0,
    };
    const minCostToGrow = calcSunCostToGrow(possibleGrows[0], trees);
    const daysLeftToComplete = maxDaysDuration - lgTreeCount - mdTreeCount - 1;
    if (sunPoints < minCostToGrow)
        optionsCount.grow = 0;
    if (seedCount >= 1 || lgTreeCount === 0)
        optionsCount.grow = 20 + seedCount + day;
    if (day > daysLeftToComplete && lgTreeCount > 0)
        optionsCount.complete = 99;
    // if (sunPoints >= calcSunCostToSeed(trees)) rank.seed += 1
    // if (seedCount > calcSunCostToSeed(trees)) rank.seed -= 1
    // if (sortedTrees.filter(tree => tree.size === 2).length) rank.grow += 1
    // if (seedCount < 2) rank.seed += 3
    // if (sortedTrees.filter(tree => tree.size >= 1).length <= seedCount) rank.grow += 1
    const bestActionType = Object.entries(optionsCount)
        .sort((a, b) => b[1] - a[1])
        .shift()[0];
    console.error({
        sunPoints,
        minCostToGrow,
        minSunIncome,
        day,
        daysLeftToComplete,
        optionsCount,
        seedCount,
        smTreeCount,
        mdTreeCount,
        lgTreeCount,
    });
    console.error('SHOULD COMPLETE', day > daysLeftToComplete);
    console.error({ bestActionType });
    if (sunPoints < 4) {
        return 'wait';
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
    const { sunPoints, trees } = props;
    countTreeSizes({ trees });
    // const minSunRequiredToGrow = trees.filter(
    //   tree => tree.isMine && !tree.isDormant && tree.size === seedSize
    // ).length
    // if (sunPoints > minSunIncome) {
    return trees
        .filter(tree => tree.isMine && tree.size < maxTreeSize && !tree.isDormant)
        .sort((a, b) => a.cellIndex - b.cellIndex);
    // }
    // return []
};

const possibleComplete = (props) => {
    const { trees } = props;
    return trees
        .filter(tree => tree.isMine && tree.size === maxTreeSize && !tree.isDormant)
        .sort((a, b) => a.cellIndex - b.cellIndex);
};

const possibleSeed2 = (props) => {
    const { possibleActions } = props;
    const seedsActions = [];
    const possibleSplit = possibleActions.map(action => action.split(' '));
    possibleSplit
        .filter(item => item[0] !== 'WAIT')
        .map(item => {
        if (item[0] === 'SEED') {
            seedsActions.push({
                action: item[0],
                cellID: Number(item[1]),
                targetID: Number(item[2]),
            });
        }
    });
    const sortedActionsSeeds = seedsActions.sort((a, b) => a.targetID - b.targetID);
    return sortedActionsSeeds.map(item => ({
        srcID: item.cellID,
        trgID: item.targetID,
    }));
};

var _a, _b;
const { cells, usableCells } = initialInput();
while (true) {
    let turnAction = 'WAIT';
    const { trees, possibleActions, sunPoints, myScore, oppScore, nutrients, day } = turnInput();
    const bestPossibleSeed2 = possibleSeed2({
        cells,
        usableCells,
        possibleActions,
    });
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
        possibleSeeds: bestPossibleSeed2,
        possibleGrows: bestPossibleGrow,
        possibleCompletes: bestPossibleComplete,
    });
    console.error({ possibleActions });
    if (bestActionType === 'seed' && bestPossibleSeed2.length) {
        turnAction = `SEED ${bestPossibleSeed2[0].srcID} ${bestPossibleSeed2[0].trgID}`;
    }
    if (bestActionType === 'grow' && bestPossibleGrow.length) {
        turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`;
    }
    if (bestActionType === 'complete' && bestPossibleComplete.length) {
        turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `;
    }
    console.log(turnAction, `${turnAction} growID:${(_a = bestPossibleGrow[0]) === null || _a === void 0 ? void 0 : _a.cellIndex} seedID:${(_b = bestPossibleSeed2[0]) === null || _b === void 0 ? void 0 : _b.trgID}`);
}
