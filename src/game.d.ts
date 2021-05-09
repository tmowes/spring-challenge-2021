type Cell = {
  index: number
  richness: number
  neighbors: number[]
}

export type InitialInputs = {
  numberOfCells: number
  cells: Cell[]
  usableCells: Cell[]
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
  myScore: number
  oppSun: number
  oppScore: number
  oppIsWaiting: boolean
  trees: Tree[]
  possibleActions: string[]
}

type ActionType = 'GROW' | 'SEED' | 'COMPLETE' | 'WAIT'

// GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT

export type CreateRankData = {
  day?: number
  nutrients?: number
  sunPoints?: number
  myScore?: number
  oppSun?: number
  oppScore?: number
  numberOfTrees?: number
  oppIsWaiting?: boolean
  trees?: Tree[]
  possibleActions?: string[]
  cells: Cell[]
  usableCells: Cell[]
  possibleSeeds: PossibleSeed[]
  possibleGrows: Tree[]
  possibleCompletes: Tree[]
}

export type PossibleSeed = {
  srcID: number
  trgID: number
}

export type PossibleSeedData = {
  day?: number
  nutrients?: number
  sunPoints?: number
  myScore?: number
  oppSun?: number
  oppScore?: number
  oppIsWaiting?: boolean
  trees?: Tree[]
  possibleActions?: string[]
  numberOfCells?: number
  cells?: Cell[]
  usableCells?: Cell[]
}
export type PossibleGrowData = {
  day?: number
  nutrients?: number
  sunPoints?: number
  myScore?: number
  oppSun?: number
  oppScore?: number
  oppIsWaiting?: boolean
  trees?: Tree[]
  possibleActions?: string[]
  numberOfCells?: number
  cells?: Cell[]
  usableCells?: Cell[]
}
export type PossibleComplete = {
  day?: number
  nutrients?: number
  sunPoints?: number
  myScore?: number
  oppSun?: number
  oppScore?: number
  oppIsWaiting?: boolean
  trees?: Tree[]
  possibleActions?: string[]
  numberOfCells?: number
  cells?: Cell[]
  usableCells?: Cell[]
}
export type CountTreeSizesProps = {
  day?: number
  nutrients?: number
  sunPoints?: number
  myScore?: number
  oppSun?: number
  oppScore?: number
  oppIsWaiting?: boolean
  trees?: Tree[]
  possibleActions?: string[]
  numberOfCells?: number
  cells?: Cell[]
  usableCells?: Cell[]
}

export type SeedsActions = {
  action: string
  cellID: number
  targetID: number
}[]
