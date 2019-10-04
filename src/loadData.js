import { 
  select, 
  csv 
} from 'd3';

let val = null;


export const loadData = () => 
  Promise.all([
    csv('../data/playerSeasonAvg.csv')  
  ]).then(([seasonAvgData]) => {

    let pos = 'PG';

    const handleChange = (e) => {
      e.preventDefault();
      seasonAvgData.forEach(d => {
        if (d.Pos === e.target.value) {
          pos = d.Pos
          return pos;
        }
      });
    };

    const val = document.getElementById('options')
      .addEventListener('change', handleChange)

    
    const filtered = seasonAvgData
      .sort((a, b) => b.PTS - a.PTS)
      .filter(d => d.Tm !== 'TOT' && d.PTS > 10 && d.MP > 10 && d.Pos === pos)

    filtered
      .forEach(d => {
        d.Player = d.Player;
        d.PTS = +d.PTS;
        // d.Age;
        // d.G;
        // d.MP;
        // d.FG;
        // d.FGpct;
        // d.threeP;
        // d.threePpct;
        // d.twoP;
        // d.twoPpct;
        // d.eFGpct;
        // d.FT;
        // d.FTpct;
        // d.TRB;
        // d.AST;
        // d.STL;
        // d.BLK;
        // d.TOV;
        // d.PF;
      });
    return filtered;
  });