const minSunIncome = 7; // someGreedValue?
const minRequiredSun = 4;
const seedSize = 0;
const maxTreeSize = 3;
const maxDaysDuration = 24;

const calcSunCostToSeed = (myTrees) => myTrees.filter(tree => tree.isMine && tree.size === seedSize).length;

const rankedActions = (props) => {
  const { trees, possibleActions, myScore, nutrients, oppScore, day, numberOfTrees, sunPoints, cells, usableCells, } = props;
  let seedCount = 0;
  let lgTreeCount = 0;
  const rank = {
    grow: 1,
    seed: 1,
    complete: 1,
  };
  const sortedTrees = trees
    .filter(tree => tree.isMine)
    .sort((a, b) => a.cellIndex - b.cellIndex);
  trees.map(tree => {
    if (tree.size === 0)
      seedCount += 1;
    if (tree.size === 1)
      ;
    if (tree.size === 2)
      ;
    if (tree.size === 3)
      lgTreeCount += 1;
  });
  const currSunIncome = sortedTrees.reduce((acc, curr) => acc + curr.size, 0);
  if (currSunIncome - minRequiredSun >= minSunIncome)
    rank.complete += 1;
  if (day > maxDaysDuration - lgTreeCount)
    rank.complete += 99;
  if (sunPoints >= calcSunCostToSeed(trees))
    rank.seed += 1;
  if (seedCount > calcSunCostToSeed(trees))
    rank.seed -= 1;
  if (sortedTrees.filter(tree => tree.size === 2).length)
    rank.grow += 1;
  if (seedCount < 2)
    rank.seed += 3;
  if (seedCount > 2)
    rank.grow += 1;
  if (sortedTrees.filter(tree => tree.size >= 1).length <= seedCount)
    rank.grow += 1;
  return Object.entries(rank).sort((a, b) => b[1] - a[1]);
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

const possibleSeed2 = (props) => {
  const { trees, cells, usableCells, possibleActions } = props;
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
  // return sortedActionsSeeds.map(tree => {
  //   const cellsAround = cells[tree.cellID].neighbors
  //   const possibleCells = usableCells
  //     .filter(cell => cellsAround.indexOf(cell.index) > -1)
  //     .filter(cell => !seedsActions.some(({ cellID }) => cellID === cell.index))
  //     .sort((a, b) => b.richness - a.richness)
  //   console.error('possibleCells', JSON.stringify(possibleCells))
  return sortedActionsSeeds.map(item => ({
    srcID: item.cellID,
    possibleCells: [item.targetID],
  }));
};

const { cells, usableCells } = initialInput();
while (true) {
  let turnAction = 'WAIT';
  const { trees, possibleActions, sunPoints, myScore, oppScore, nutrients, day, } = turnInput();
  const bestActionsType = rankedActions({
    trees,
    possibleActions,
    sunPoints,
    myScore,
    oppScore,
    nutrients,
    day,
    cells,
    usableCells,
  });
  // const bestPossibleSeed = possibleSeed({ trees, cells, usableCells })
  const bestPossibleSeed2 = possibleSeed2({
    cells,
    usableCells,
    possibleActions,
  });
  const bestPossibleGrow = possibleGrow({ trees });
  const bestPossibleComplete = possibleComplete({ trees });
  console.error('bestPossibleSeed2', JSON.stringify(bestPossibleSeed2))
  // console.error('bestPossibleGrow', JSON.stringify(bestPossibleGrow))
  // console.error('bestPossibleComplete', JSON.stringify(bestPossibleComplete))
  console.error({ possibleActions })
  console.error('rankedActions', JSON.stringify(bestActionsType))
  const bestActionType = bestActionsType.shift();
  // if (bestActionType[0] === 'seed' && bestPossibleSeed.length) {
  //   console.error(`SEED`)
  //   turnAction = `SEED ${bestPossibleSeed[0].srcID} ${bestPossibleSeed[0].possibleCells[0].index}`
  // }
  if (bestActionType[0] === 'seed' && bestPossibleSeed2.length) {
    turnAction = `SEED ${bestPossibleSeed2[0].srcID} ${bestPossibleSeed2[0].possibleCells[0]}`;
  }
  if (bestActionType[0] === 'grow' && bestPossibleGrow.length) {
    turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`;
  }
  if (bestActionType[0] === 'complete' && bestPossibleComplete.length) {
    turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `;
  }
  console.log(turnAction, `${turnAction}`);
}
