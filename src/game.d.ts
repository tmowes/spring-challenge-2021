type Cell = {
  index: number
  richness: number
  neighbors: number[]
}

export type InitialInputs = {
  numberOfCells: number
  cells: Cell[]
}

type Tree = {
  cellIndex: number
  size: number
  isMine: boolean
  isDormant: boolean
}

export type TurnInput = {
  day: number
  nutrients: number
  sunPoints: number
  score: number
  oppSun: number
  oppScore: number
  oppIsWaiting: boolean
  myTrees: Tree[]
  possibleActions: string[]
}

type ActionType = 'GROW' | 'SEED' | 'COMPLETE' | 'WAIT'

// GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT
