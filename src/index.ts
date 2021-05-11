import { rankedActions } from './rankingActions'
import { initialInput, turnInput } from './input'
import { possibleGrow } from './possibleGrow'
import { possibleComplete } from './possibleComplete'
import { possibleSeed2 } from './possibleSeed2'

const { cells, usableCells } = initialInput()

while (true) {
  let turnAction = 'WAIT'
  const { trees, possibleActions, sunPoints, myScore, oppScore, nutrients, day } = turnInput()

  const bestPossibleSeed2 = possibleSeed2({
    cells,
    usableCells,
    possibleActions,
  })
  const bestPossibleGrow = possibleGrow({ trees })
  const bestPossibleComplete = possibleComplete({ trees })

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
  })

  console.error({ possibleActions })

  if (bestActionType === 'grow' && bestPossibleGrow.length) {
    turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`
  }

  if (bestActionType === 'seed' && bestPossibleSeed2.length) {
    turnAction = `SEED ${bestPossibleSeed2[0].srcID} ${bestPossibleSeed2[0].trgID}`
  }

  if (bestActionType === 'complete' && bestPossibleComplete.length) {
    turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `
  }

  console.log(
    turnAction,
    `${turnAction} growID:${bestPossibleGrow[0]?.cellIndex} seedID:${bestPossibleSeed2[0]?.trgID}`
  )
}
