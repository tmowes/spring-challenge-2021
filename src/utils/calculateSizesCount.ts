import { CountTreeSizesProps } from '../game'
import { maxTreeSize, mediumSize, seedSize, smallSize } from './gameConstants'

export const countTreeSizes = (props: CountTreeSizesProps) => {
  const { trees } = props
  const sortedTrees = trees
    .filter(tree => tree.isMine)
    .sort((a, b) => a.cellIndex - b.cellIndex)

  const seedCount = sortedTrees.filter(tree => tree.size === seedSize).length
  const smTreeCount = sortedTrees.filter(tree => tree.size === smallSize).length
  const mdTreeCount = sortedTrees.filter(tree => tree.size === mediumSize).length
  const lgTreeCount = sortedTrees.filter(tree => tree.size === maxTreeSize).length

  return {
    seedCount,
    smTreeCount,
    mdTreeCount,
    lgTreeCount,
  }
}
