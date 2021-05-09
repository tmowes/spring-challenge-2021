import { Tree } from '../game'
import { costToGrowSizes, seedSize } from './gameConstants'

export const calcSunCostToGrow = (treeToGrow: Tree, myTrees: Tree[]) =>
  costToGrowSizes[treeToGrow.size] +
  myTrees.filter(tree => tree.size === treeToGrow.size).length

export const calcSunCostToSeed = (myTrees: Tree[]) =>
  myTrees.filter(tree => tree.isMine && tree.size === seedSize).length
