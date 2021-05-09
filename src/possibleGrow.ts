import { PossibleGrowData } from './game'
import { maxTreeSize } from './utils/gameConstants'

export const possibleGrow = (props: PossibleGrowData) => {
  const { trees } = props
  return trees
    .filter(tree => tree.isMine && tree.size < maxTreeSize && !tree.isDormant)
    .sort((a, b) => a.cellIndex - b.cellIndex)
}
