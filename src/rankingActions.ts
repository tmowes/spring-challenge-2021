/* eslint-disable radar/no-collapsible-if */
/* eslint-disable radar/cognitive-complexity */
import { CreateRankData } from './game'
import { possibleGrow } from './possibleGrow'
import { possibleSeed } from './possibleSeed'
import { calcSunCostToGrow, calcSunCostToSeed } from './utils/calculateSunCosts'
import {
  maxDaysDuration,
  minRequiredSun,
  minSunIncome,
} from './utils/gameConstants'

export const rankedActions = (props: CreateRankData) => {
  const {
    trees,
    possibleActions,
    myScore,
    nutrients,
    oppScore,
    day,
    numberOfTrees,
    sunPoints,
    cells,
    usableCells,
  } = props

  let seedCount = 0
  let smTreeCount = 0
  let mdTreeCount = 0
  let lgTreeCount = 0

  const rank = {
    grow: 1,
    seed: 1,
    complete: 1,
  }

  const sortedTrees = trees
    .filter(tree => tree.isMine)
    .sort((a, b) => a.cellIndex - b.cellIndex)

  trees.map(tree => {
    if (tree.size === 0) seedCount += 1
    if (tree.size === 1) smTreeCount += 1
    if (tree.size === 2) mdTreeCount += 1
    if (tree.size === 3) lgTreeCount += 1
  })

  const currSunIncome = sortedTrees.reduce((acc, curr) => acc + curr.size, 0)

  if (currSunIncome - minRequiredSun >= minSunIncome) rank.complete += 1
  if (day > maxDaysDuration - lgTreeCount) rank.complete += 99

  if (sunPoints >= calcSunCostToSeed(trees)) rank.seed += 1

  if (seedCount > calcSunCostToSeed(trees)) rank.seed -= 1

  if (sortedTrees.filter(tree => tree.size === 2).length) rank.grow += 1

  if (seedCount < 2) rank.seed += 3

  if (seedCount > 2) rank.grow += 1

  if (sortedTrees.filter(tree => tree.size >= 1).length <= seedCount)
    rank.grow += 1

  return Object.entries(rank).sort((a, b) => b[1] - a[1])
}
