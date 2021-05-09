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

  const optionsCount = {
    grow: possibleGrows.length + seedCount + day,
    seed: Math.max(possibleSeeds.length, 3) - seedCount - day,
    complete: 0,
  }

  const minCostToGrow = calcSunCostToGrow(possibleGrows[0], trees)

  const daysLeftToComplete = maxDaysDuration - lgTreeCount - mdTreeCount - 1

  if (sunPoints < minCostToGrow) optionsCount.grow = 0

  if (seedCount >= 1 || lgTreeCount === 0) optionsCount.grow = 20 + seedCount + day

  if (day > daysLeftToComplete && lgTreeCount > 0) optionsCount.complete = 99

  // if (sunPoints >= calcSunCostToSeed(trees)) rank.seed += 1

  // if (seedCount > calcSunCostToSeed(trees)) rank.seed -= 1

  // if (sortedTrees.filter(tree => tree.size === 2).length) rank.grow += 1

  // if (seedCount < 2) rank.seed += 3

  // if (sortedTrees.filter(tree => tree.size >= 1).length <= seedCount) rank.grow += 1

  const bestActionType = Object.entries(optionsCount)
    .sort((a, b) => b[1] - a[1])
    .shift()[0]

  console.error({
    sunPoints,
    minCostToGrow,
    minSunIncome,
    day,
    daysLeftToComplete,
    optionsCount,
    seedCount,
    smTreeCount,
    mdTreeCount,
    lgTreeCount,
  })
  console.error('SHOULD COMPLETE', day > daysLeftToComplete)
  console.error({ bestActionType })

  if (sunPoints < 4) {
    return 'wait'
  }

  return bestActionType
}
