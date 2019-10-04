export const STAT_TYPE_ARR = [
  'PTS',
  'FG',
  'FT',
  'TRB',
  'AST',
  'STL',
  'BLK'
]

export const STAT_TYPE_OBJ = {
  'x0Value': d => d.PTS,
  'x1Value': d => d.FG,
  'x2Value': d => d.FT,
  'x3Value': d => d.TRB,
  'x4Value': d => d.AST,
  'x5Value': d => d.STL,
  'x6Value': d => d.BLK
}