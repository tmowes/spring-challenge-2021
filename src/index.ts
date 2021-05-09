import { rankedActions } from './rankingActions'
import { initialInput, turnInput } from './input'
import { possibleSeed } from './possibleSeed'
import { possibleGrow } from './possibleGrow'
import { possibleComplete } from './possibleComplete'
import { possibleSeed2 } from './possibleSeed2'

const { cells, usableCells } = initialInput()

while (true) {
  let turnAction = 'WAIT'
  const {
    trees,
    possibleActions,
    sunPoints,
    myScore,
    oppScore,
    nutrients,
    day,
  } = turnInput()

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
  })

  // const bestPossibleSeed = possibleSeed({ trees, cells, usableCells })
  const bestPossibleSeed2 = possibleSeed2({
    cells,
    usableCells,
    possibleActions,
  })
  const bestPossibleGrow = possibleGrow({ trees })
  const bestPossibleComplete = possibleComplete({ trees })

  // console.error('bestPossibleSeed2', JSON.stringify(bestPossibleSeed2))
  // console.error('bestPossibleGrow', JSON.stringify(bestPossibleGrow))
  // console.error('bestPossibleComplete', JSON.stringify(bestPossibleComplete))

  // console.error({ possibleActions })

  // console.error('rankedActions', JSON.stringify(bestActionsType))

  const bestActionType = bestActionsType.shift()

  // if (bestActionType[0] === 'seed' && bestPossibleSeed.length) {
  //   console.error(`SEED`)
  //   turnAction = `SEED ${bestPossibleSeed[0].srcID} ${bestPossibleSeed[0].possibleCells[0].index}`
  // }
  if (bestActionType[0] === 'seed' && bestPossibleSeed2.length) {
    turnAction = `SEED ${bestPossibleSeed2[0].srcID} ${bestPossibleSeed2[0].possibleCells[0]}`
  }

  if (bestActionType[0] === 'grow' && bestPossibleGrow.length) {
    turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`
  }

  if (bestActionType[0] === 'complete' && bestPossibleComplete.length) {
    turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `
  }

  console.log(turnAction, `${turnAction}`)
}
