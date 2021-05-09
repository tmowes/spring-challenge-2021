import { PossibleSeedData } from './game'

export const possibleSeed = (props: PossibleSeedData) => {
  const { trees, cells, usableCells } = props
  return trees
    .filter(tree => tree.isMine && !tree.isDormant && tree.size >= 1)
    .map(tree => {
      const cellsAround = cells[tree.cellIndex].neighbors
      const emptyCells = usableCells.filter(
        cell => !trees.some(hasTree => hasTree.cellIndex === cell.index)
      )
      const possibleCells = emptyCells
        .filter(cell => cellsAround.indexOf(cell.index) > -1)
        .sort((a, b) => b.richness - a.richness)

      // console.error(JSON.stringify(possibleCells))

      return {
        srcID: tree.cellIndex,
        possibleCells,
      }
    })
}
