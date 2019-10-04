import { 
  select, 
  csv 
} from 'd3';

let val = null;


export const loadAvg = (playerData) => 
  Promise.all([
    csv('../data/playerSeasonAvg.csv')  
  ]).then(([seasonAvgData]) => {

    const filtered = seasonAvgData
      .sort((a, b) => b.PTS - a.PTS)
      .filter(d => d.Tm !== 'TOT' && d.PTS > 10 && d.MP > 10 && d.Pos === playerData.Pos)

    filtered
      .forEach(d => {
        d.Player = d.Player;
        d.PTS = +d.PTS;
        d.Tm = d.Tm;
        // d.Age;
        // d.G;
        // d.MP;
        d.FG = +d.FG;
        // d.FGpct;
        // d.threeP;
        // d.threePpct;
        // d.twoP;
        // d.twoPpct;
        // d.eFGpct;
        d.FT = +d.FT;
        // d.FTpct;
        d.TRB = +d.TRB;
        d.AST = +d.AST;
        d.STL = +d.STL;
        d.BLK = +d.BLK;
        // d.TOV;
        // d.PF;
      });
    return filtered;
  });

export const loadPer100 = (pos) =>
  Promise.all([
    csv('../data/playerPer100Pos.csv')
  ]).then(([per100PosData]) => {


  });
