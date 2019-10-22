import { 
  select,
   csv 
  } 
  from 'd3';
//selecting svg on html
const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

//loading data set
csv('../data/NBA_PPG_CSV_Master_2017_2019.csv').then(data => {
  //top 20 of each position (pg, sg, sf, pf, c)
  data.forEach(d => {
    d.Year = +d.Year;
    d.PTS = +d.PTS;
    d.AST = +d.AST;
    d.BLK = +d.BLK;
    d.STL = +d.STL;
    d.TRB = +d.TRB;
    d.ThreePointers = +d.ThreePointers;
    d.FGpct = +d.FGpct;
    d.FTpct = +d.FTpct;
    d.G = +d.G;
    d.GS = +d.GS;
  });

  let pgData = data
    .filter(player => player.Pos === 'PG' && player.Year === 2019 && player.GS > 30)
    .sort((a, b) => {
      if (a.PTS >= b.PTS) return -1;
      if (a.PTS < b.PTS) return 1;
      if (a.AST >= b.AST) return -1;
      if (a.AST < b.AST) return 1;
      if (a.ThreePointers >= b.ThreePointers) return -1;
      if (a.ThreePointers < b.ThreePointers) return 1;
      if (a.STL >= b.STL) return -1;
      if (a.STL < b.STL) return 1;
      if (a.TRB >= b.TRB) return -1;
      if (a.TRB < b.TRB) return 1;
    })
    .slice(0, 20);

  let sgData = data
    .filter(player => player.Pos === 'SG' && player.Year === 2019 && player.GS > 30)
    .sort((a, b) => {
      if (a.PTS >= b.PTS) return -1;
      if (a.PTS < b.PTS) return 1;
      if (a.ThreePointers < b.ThreePointers) return 1;
      if (a.ThreePointers >= b.ThreePointers) return -1;
      if (a.AST >= b.AST) return -1;
      if (a.AST < b.AST) return 1;
      if (a.STL >= b.STL) return -1;
      if (a.STL < b.STL) return 1;
      if (a.TRB >= b.TRB) return -1;
      if (a.TRB < b.TRB) return 1;
    })
    .slice(0, 20);


  let sfData = data
    .filter(player => player.Pos === 'SF' && player.Year === 2019 && player.GS > 30)
    .sort((a, b) => {
      if (a.PTS >= b.PTS) return -1;
      if (a.PTS < b.PTS) return 1;
      if (a.TRB >= b.TRB) return -1;
      if (a.TRB < b.TRB) return 1;
      if (a.BLK >= b.BLK) return -1;
      if (a.BLK < b.BLK) return 1;
      if (a.ThreePointers >= b.ThreePointers) return -1;
      if (a.ThreePointers < b.ThreePointers) return 1;
      if (a.STL >= b.STL) return -1;
      if (a.STL < b.STL) return 1;
      if (a.AST >= b.AST) return -1;
      if (a.AST < b.AST) return 1;
    })
    .slice(0, 20);


  let pfData = data
    .filter(player => player.Pos === 'PF' && player.Year === 2019 && player.GS > 30)
    .sort((a, b) => {
      if (a.PTS >= b.PTS) return -1;
      if (a.PTS < b.PTS) return 1;
      if (a.TRB >= b.TRB) return -1;
      if (a.TRB < b.TRB) return 1;
      if (a.FTpct >= b.FTpct) return -1;
      if (a.FTpct < b.FTpct) return 1;
      if (a.FGpct >= b.FGpct) return -1;
      if (a.FGpct < b.FGpct) return 1;
      if (a.BLK >= b.BLK) return -1;
      if (a.BLK < b.BLK) return 1;
      if (a.STL >= b.STL) return -1;
      if (a.STL < b.STL) return 1;
      if (a.ThreePointers >= b.ThreePointers) return -1;
      if (a.ThreePointers < b.ThreePointers) return 1;
      if (a.AST >= b.AST) return -1;
      if (a.AST < b.AST) return 1;
    })
    .slice(0, 20);

  let cData = data
    .filter(player => player.Pos === 'C' && player.Year === 2019 && player.GS > 30)
    .sort((a, b) => {
      if (a.PTS >= b.PTS) return -1;
      if (a.PTS < b.PTS) return 1;
      if (a.TRB >= b.TRB) return -1;
      if (a.TRB < b.TRB) return 1;
      if (a.FTpct >= b.FTpct) return -1;
      if (a.FTpct < b.FTpct) return 1;
      if (a.FGpct >= b.FGpct) return -1;
      if (a.FGpct < b.FGpct) return 1;
      if (a.BLK >= b.BLK) return -1;
      if (a.BLK < b.BLK) return 1;
      if (a.STL >= b.STL) return -1;
      if (a.STL < b.STL) return 1;
      if (a.AST >= b.AST) return -1;
      if (a.AST < b.AST) return 1;
    })
    .slice(0, 20);


    console.log('point guards', pgData)
    console.log('shooting guards', sgData)
    console.log('small', sfData)
    console.log('power', pfData)
    console.log('center', cData)

});
