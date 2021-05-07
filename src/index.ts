import { initialInputs, turnInputs } from './input'

initialInputs()

while (true) {
  const { possibleActions, sunPoints, myTrees } = turnInputs()

  console.error(possibleActions)

  if (sunPoints > 4) {
    const mostValuableTreeID = myTrees[0]
    if (mostValuableTreeID.size < 3) {
      console.log(`GROW ${mostValuableTreeID.cellIndex}`)
    } else {
      console.log(`COMPLETE ${mostValuableTreeID.cellIndex}`)
    }
  } else {
    console.log(`WAIT`)
  }
}
