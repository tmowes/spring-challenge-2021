/* eslint-disable radar/no-collapsible-if */
/* eslint-disable radar/cognitive-complexity */
import { CreateRankData } from './game'
import { calcSunCostToGrow } from './utils/calculateSunCosts'
import { maxDaysDuration } from './utils/gameConstants'
import { countTreeSizes } from './utils/calculateSizesCount'

export const rankedActions = (props: CreateRankData) => {
  const { day, sunPoints, trees, possibleSeeds, possibleGrows } = props

  const { seedCount, smTreeCount, mdTreeCount, lgTreeCount } = countTreeSizes({ trees })

  const minCostToGrow = calcSunCostToGrow(possibleGrows[0], trees)

  const optionsCount = {
    grow: possibleGrows.length > 0 && sunPoints <= minCostToGrow ? 98 : 0,
    seed: possibleSeeds.length > 0 && seedCount < 1 && day < 20 ? 97 : -1,
    complete: day > 15 && lgTreeCount > 0 ? 99 : -1,
  }

  console.error('######################################')
  console.error('possibleGrowsLen:+', possibleGrows.length)
  console.error('seedCount:', seedCount)
  console.error('smTreeCount:', smTreeCount)
  console.error('mdTreeCount:', mdTreeCount)
  console.error('lgTreeCount:', lgTreeCount)
  console.error('##Rank_Grow:', optionsCount.grow)
  console.error('######################################')
  console.error('possibleSeedsLen:', possibleSeeds.length)
  console.error('seedCount:', seedCount)
  console.error('##Rank_Seed:', optionsCount.seed)
  console.error('######################################')

  const daysLeftToComplete = maxDaysDuration - lgTreeCount * 2 - mdTreeCount * 1.5 - 2

  console.error('minCostToGrow', minCostToGrow)

  if (sunPoints < minCostToGrow) optionsCount.grow = 0

  if (day > daysLeftToComplete && lgTreeCount > 0) optionsCount.complete = 99

  const bestActionType = Object.entries(optionsCount)
    .sort((a, b) => b[1] - a[1])
    .shift()[0]

  console.error('___SHOULD COMPLETE', day > 15, day > daysLeftToComplete)
  console.error({ optionsCount })
  console.error({ bestActionType })

  // if (day === 0 || sunPoints < 3) {

  if (day === 0) {
    return 'wait'
  }

  if (day === 1) {
    return 'grow'
  }

  if (day === 2) {
    return 'seed'
  }

  return bestActionType
}
