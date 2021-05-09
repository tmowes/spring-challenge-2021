import { countTreeSizes } from './utils/calculateSizesCount'
import { PossibleGrowData } from './game'
import { maxTreeSize, minSunIncome } from './utils/gameConstants'

export const possibleGrow = (props: PossibleGrowData) => {
  const { sunPoints, trees } = props

  const { seedCount, smTreeCount, mdTreeCount, lgTreeCount } = countTreeSizes({ trees })

  // const minSunRequiredToGrow = trees.filter(
  //   tree => tree.isMine && !tree.isDormant && tree.size === seedSize
  // ).length

  // if (sunPoints > minSunIncome) {
  return trees
    .filter(tree => tree.isMine && tree.size < maxTreeSize && !tree.isDormant)
    .sort((a, b) => a.cellIndex - b.cellIndex)
  // }

  // return []
}
