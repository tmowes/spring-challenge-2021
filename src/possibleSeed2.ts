import { PossibleSeedData, SeedsActions } from './game'

export const possibleSeed2 = (props: PossibleSeedData) => {
  const { trees, cells, usableCells, possibleActions } = props
  const seedsActions = [] as SeedsActions

  const possibleSplit = possibleActions.map(action => action.split(' '))

  possibleSplit
    .filter(item => item[0] !== 'WAIT')
    .map(item => {
      if (item[0] === 'SEED') {
        seedsActions.push({
          action: item[0],
          cellID: Number(item[1]),
          targetID: Number(item[2]),
        })
      }
    })

  const sortedActionsSeeds = seedsActions.sort(
    (a, b) => a.targetID - b.targetID
  )

  // return sortedActionsSeeds.map(tree => {
  //   const cellsAround = cells[tree.cellID].neighbors
  //   const possibleCells = usableCells
  //     .filter(cell => cellsAround.indexOf(cell.index) > -1)
  //     .filter(cell => !seedsActions.some(({ cellID }) => cellID === cell.index))
  //     .sort((a, b) => b.richness - a.richness)

  //   console.error('possibleCells', JSON.stringify(possibleCells))
  return sortedActionsSeeds.map(item => ({
    srcID: item.cellID,
    possibleCells: [item.targetID],
  }))
}
