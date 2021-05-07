const initialInputs = () => {
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
  return {
    numberOfCells,
    cells,
  };
};
const turnInputs = () => {
  const day = parseInt(readline());
  const nutrients = parseInt(readline());
  var inputs = readline().split(' ');
  const sun = parseInt(inputs[0]);
  const score = parseInt(inputs[1]);
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
  const sortedTrees = trees.sort((a, b) => a.cellIndex - b.cellIndex);
  const myTrees = sortedTrees.filter(tree => tree.isMine);
  return {
    day,
    nutrients,
    sunPoints: sun,
    score,
    oppSun,
    oppScore,
    oppIsWaiting,
    myTrees,
    possibleActions,
  };
};

initialInputs();
while (true) {
  const { sunPoints, myTrees } = turnInputs();
  if (sunPoints > 4) {
    const mostValuableTreeID = myTrees[0];
    if (mostValuableTreeID.size < 3) {
      console.log(`GROW ${mostValuableTreeID.cellIndex}`);
    }
    else {
      console.log(`COMPLETE ${mostValuableTreeID.cellIndex}`);
    }
  }
  else {
    console.log(`WAIT`);
  }
}
