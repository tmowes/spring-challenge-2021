/* eslint-disable radar/no-collapsible-if */
/* eslint-disable radar/cognitive-complexity */
import { CreateRankData } from './game'
import { calcSunCostToGrow, calcSunCostToSeed } from './utils/calculateSunCosts'
import {
  maxDaysDuration,
  maxTreeSize,
  minRequiredSun,
  minSunIncome,
  seedSize,
} from './utils/gameConstants'
import { countTreeSizes } from './utils/calculateSizesCount'

export const rankedActions = (props: CreateRankData) => {
  const {
    day,
    nutrients,
    sunPoints,
    myScore,
    oppScore,
    trees,
    possibleSeeds,
    possibleGrows,
    possibleCompletes,
  } = props

  const { seedCount, smTreeCount, mdTreeCount, lgTreeCount } = countTreeSizes({ trees })

  const diminishReturn = Math.ceil(day / 0.8)

  const optionsCount = {
    grow:
      possibleGrows.length +
      seedCount +
      smTreeCount +
      mdTreeCount +
      diminishReturn -
      lgTreeCount,
    seed:
      Math.min(possibleSeeds.length, maxDaysDuration - 2) - seedCount * 99 - diminishReturn,
    complete: 0,
  }

  console.error('######################################')
  console.error('possibleGrowsLen:+', possibleGrows.length)
  console.error('seedCount:+', seedCount)
  console.error('smTreeCount:+', smTreeCount)
  console.error('mdTreeCount:+', mdTreeCount)
  console.error('diminishReturn:+', diminishReturn)
  console.error('lgTreeCount:-', lgTreeCount)
  console.error('##Rank_Grow:=', optionsCount.grow)

  console.error('######################################')
  console.error('possibleSeedsLen:+', possibleSeeds.length)
  console.error('fixRate:+', maxDaysDuration - 2)
  console.error('seedCount:-', seedCount)
  console.error('diminishReturn:-', diminishReturn)
  console.error('##Rank_Seed:=', optionsCount.seed)
  console.error('######################################')

  const minCostToGrow = calcSunCostToGrow(possibleGrows[0], trees)

  const daysLeftToComplete = maxDaysDuration - lgTreeCount * 2 - mdTreeCount * 1.5 - 3

  console.error('minCostToGrow', minCostToGrow)

  if (sunPoints < minCostToGrow) optionsCount.grow = 0

  // if (seedCount >= 1 || lgTreeCount === 0) optionsCount.grow = 20 + seedCount + day

  if (day > daysLeftToComplete && lgTreeCount > 0) optionsCount.complete = 19

  // if (sunPoints >= calcSunCostToSeed(trees)) rank.seed += 1

  // if (seedCount > calcSunCostToSeed(trees)) rank.seed -= 1

  // if (sortedTrees.filter(tree => tree.size === 2).length) rank.grow += 1

  // if (seedCount < 2) rank.seed += 3

  // if (sortedTrees.filter(tree => tree.size >= 1).length <= seedCount) rank.grow += 1

  const bestActionType = Object.entries(optionsCount)
    .sort((a, b) => b[1] - a[1])
    .shift()[0]

  // console.error({
  //   sunPoints,
  //   minCostToGrow,
  //   minSunIncome,
  //   day,
  //   daysLeftToComplete,
  //   optionsCount,
  //   seedCount,
  //   smTreeCount,
  //   mdTreeCount,
  //   lgTreeCount,
  // })
  // console.error('SHOULD COMPLETE', day > daysLeftToComplete)
  console.error('optionsCount', optionsCount, day)
  console.error({ bestActionType })

  if (day === 0 || sunPoints < 3) {
    return 'wait'
  }

  return bestActionType
}
