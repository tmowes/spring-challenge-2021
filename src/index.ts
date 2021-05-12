import { rankedActions } from './rankingActions'
import { initialInput, turnInput } from './input'
import { possibleGrow } from './possibleGrow'
import { possibleComplete } from './possibleComplete'
// import { possibleSeed2 } from './possibleSeed2'
import { possibleSeed3 } from './possibleSeed3'

const { cells, usableCells } = initialInput()

let onlyOneSeed = 1

while (true) {
  let turnAction = 'WAIT'
  const { trees, possibleActions, sunPoints, myScore, oppScore, nutrients, day } = turnInput()
  console.error('___DAY:', day)

  // const bestPossibleSeed2 = possibleSeed2({
  //   cells,
  //   usableCells,
  //   possibleActions,
  // })
  const bestPossibleSeed3 = possibleSeed3({ trees, possibleActions, usableCells })
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
    possibleSeeds: bestPossibleSeed3,
    possibleGrows: bestPossibleGrow,
    possibleCompletes: bestPossibleComplete,
  })

  console.error({ possibleActions })
  // console.error({ bestPossibleSeed3 })

  if (bestActionType === 'grow' && bestPossibleGrow.length) {
    turnAction = `GROW ${bestPossibleGrow[0].cellIndex}`
  }

  if (
    bestActionType === 'seed' &&
    bestPossibleSeed3.length &&
    onlyOneSeed !== day &&
    day < 19
  ) {
    onlyOneSeed = day
    turnAction = `SEED ${bestPossibleSeed3[0].srcID} ${bestPossibleSeed3[0].trgID}`
  }

  if (bestActionType === 'complete' && bestPossibleComplete.length) {
    turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `
  }

  if (bestActionType !== 'wait' && day > 15 && bestPossibleComplete.length) {
    turnAction = `COMPLETE ${bestPossibleComplete[0].cellIndex} `
  }

  console.log(
    turnAction,
    `${turnAction} growID:${bestPossibleGrow[0]?.cellIndex} seedID:${bestPossibleSeed3[0]?.trgID}`
  )
}
