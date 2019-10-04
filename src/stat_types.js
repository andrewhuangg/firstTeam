export const STAT_TYPE_ARR = [
  'PTS',
  'FT',
  'TRB',
  'AST',
  'STL',
  'BLK'
]

export const STAT_TYPE_OBJ = {
  'z0Value': d => d.PTS,
  'z1Value': d => d.FT,
  'z2Value': d => d.TRB,
  'z3Value': d => d.AST,
  'z4Value': d => d.STL,
  'z5Value': d => d.BLK
};