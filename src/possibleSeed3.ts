import { PossibleSeed, PossibleSeedData } from './game'
import { bestDiagonalForSeed } from './utils/bestDiagonalForSeed'

export const possibleSeed3 = (props: PossibleSeedData) => {
  const { trees, possibleActions, usableCells } = props

  const possibleSeeds = [] as PossibleSeed[]

  trees
    .filter(tree => tree.isMine && !tree.isDormant && tree.size >= 2)
    .map(tree => {
      const possibleCells = usableCells
        .filter(cell => !trees.some(hasTree => hasTree.cellIndex === cell.index))
        .filter(cell => bestDiagonalForSeed[tree.cellIndex].values.indexOf(cell.index) > -1)
        .sort((a, b) => b.richness - a.richness)
      console.error('possibleSeed3::possibleCells:::::::::', JSON.stringify(possibleCells))
      if (possibleCells.length > 0) {
        possibleSeeds.push({
          srcID: tree.cellIndex,
          trgID: possibleCells[0].index,
        })
      }
    })

  if (possibleSeeds.length > 0) {
    console.error('possibleSeed3::BestDiagonalForSeed:::::::::', JSON.stringify(possibleSeeds))
    return possibleSeeds
  }

  console.error('possibleSeed3::FALLBACK:::::::::')
  const sortedActionsSeeds = possibleActions
    .map(action => action.split(' '))
    .filter(item => item[0] === 'SEED')
    .sort((a, b) => Number(a[2]) - Number(b[2]))

  if (sortedActionsSeeds.length > 0) {
    sortedActionsSeeds.map(item => {
      possibleSeeds.push({
        srcID: Number(item[1]),
        trgID: Number(item[2]),
      })
    })
  }

  console.error('possibleSeed3::FALLBACK:::::::::', { possibleSeeds })

  return possibleSeeds
}
