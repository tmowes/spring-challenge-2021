/* eslint-disable */
import { TurnInput } from './game'

export const initialInputs = () => {
  const cells = []
  const numberOfCells: number = parseInt(readline())
  for (let i = 0; i < numberOfCells; i++) {
    const inputs: string[] = readline().split(' ')
    const index: number = parseInt(inputs[0])
    const richness: number = parseInt(inputs[1])
    const neigh0: number = parseInt(inputs[2])
    const neigh1: number = parseInt(inputs[3])
    const neigh2: number = parseInt(inputs[4])
    const neigh3: number = parseInt(inputs[5])
    const neigh4: number = parseInt(inputs[6])
    const neigh5: number = parseInt(inputs[7])
    cells.push({
      index,
      richness,
      neighbors: [neigh0, neigh1, neigh2, neigh3, neigh4, neigh5],
    })
  }
  return {
    numberOfCells,
    cells,
  }
}

export const turnInputs = (): TurnInput => {
  const day: number = parseInt(readline())
  const nutrients: number = parseInt(readline())
  var inputs: string[] = readline().split(' ')
  const sun: number = parseInt(inputs[0])
  const score: number = parseInt(inputs[1])
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

  const sortedTrees = trees.sort((a, b) => a.cellIndex - b.cellIndex)
  const myTrees = sortedTrees.filter(tree => tree.isMine)




  const actions = possibleActions.map(item => item.split(' '))


  actions[0].sort((a, b) => Number(a[3]) - Number(b[3]))

  console.error(actions)


  // actions[0].map(item => {
  //   if (item[0] === 'SEED') {
  //     const sortedSeeds = actions.sort((a, b) => a[3] - b[3])
  //   }
  // })

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
  }
}
