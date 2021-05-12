import { Tree } from '../game'
// import { countTreeSizes } from './calculateSizesCount'
import { costToGrowSizes, seedSize } from './gameConstants'

export const calcSunCostToGrow = (treeToGrow: Tree, myTrees: Tree[]) => {
  if (!treeToGrow) return 99
  const costToGrowThis =
    costToGrowSizes[treeToGrow.size] +
    myTrees.filter(tree => tree.isMine && tree.size === treeToGrow.size + 1).length

  console.error('calcSunCostToGrow', { costToGrowThis, treeToGrow })

  return costToGrowThis
}

export const calcSunCostToSeed = (myTrees: Tree[]) =>
  myTrees.filter(tree => tree.isMine && tree.size === seedSize).length
