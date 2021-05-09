import { Cell } from '../game'

/* eslint-disable radix */
export const initialInput = () => {
  const cells = [] as Cell[]
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

  const usableCells = cells.filter(cell => cell.richness > 0)

  return {
    numberOfCells,
    cells,
    usableCells,
  }
}
