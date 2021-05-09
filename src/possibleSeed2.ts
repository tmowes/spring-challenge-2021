import { PossibleSeedData, SeedsActions } from './game'

export const possibleSeed2 = (props: PossibleSeedData) => {
  const { possibleActions } = props
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

  const sortedActionsSeeds = seedsActions.sort((a, b) => a.targetID - b.targetID)

  return sortedActionsSeeds.map(item => ({
    srcID: item.cellID,
    trgID: item.targetID,
  }))
}
