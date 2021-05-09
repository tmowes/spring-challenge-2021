/* eslint-disable block-scoped-var */
/* eslint-disable radix */
export const turnInput = () => {
  const day: number = parseInt(readline())
  const nutrients: number = parseInt(readline())
  var inputs: string[] = readline().split(' ')
  const sunPoints: number = parseInt(inputs[0])
  const myScore: number = parseInt(inputs[1])
  var inputs: string[] = readline().split(' ')
  const oppSun: number = parseInt(inputs[0])
  const oppScore: number = parseInt(inputs[1])
  const oppIsWaiting: boolean = inputs[2] !== '0'
  const numberOfTrees: number = parseInt(readline())
  const trees = []
  const possibleActions = []
  for (let i = 0; i < numberOfTrees; i++) {
    var inputs: string[] = readline().split(' ')
    const cellIndex: number = parseInt(inputs[0])
    const size: number = parseInt(inputs[1])
    const isMine: boolean = inputs[2] !== '0'
    const isDormant: boolean = inputs[3] !== '0'
    trees.push({
      cellIndex,
      size,
      isMine,
      isDormant,
    })
  }
  const numberOfPossibleActions: number = parseInt(readline())
  for (let i = 0; i < numberOfPossibleActions; i++) {
    const possibleAction: string = readline()
    possibleActions.push(possibleAction)
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
  }
}
