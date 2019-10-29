import { 
  select,
} from 'd3';
import { loadData } from './loadData';
import { drawBar } from './bar';
import { drawScatter } from './scatterPlot';
import { 
  handleYearChange, 
  handleStatChange, 
  handlePosChange 
} from './oldeventHandlers';
import { 
  handleScatterStat,
  handleScatterYear,
  handleScatterPos
 } from './eventHandlers';

//selecting svg on html
const svg = select('#bar');
const width = +svg.attr('width');
const height = +svg.attr('height');

loadData().then(data => {
  let yearsArr = [2017, 2018, 2019];
  let currentYear = yearsArr[0];
  let currentPos = d3.select('input[name="pos"]').attr('value');
  let currentStat = d3.select('input[name="stat"]').attr('value');
  let columns = ['Player', 'Pos', 'Tm', 'G', 'GS', 'MP', 'FG', 'FGpct', 'ThreePointers', 'ThreePointPct', 'TwoPointPct', 'eFGpct', 'FT', 'FTpct', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PTS', 'Year'];
  let positions = ['PG', 'SG', 'SF', 'PF', 'C'];

  drawBar(data, currentPos, currentStat, currentYear);
  drawScatter(data, currentPos, currentStat, currentYear, columns);
  //const title = 'Top Players Per Position'
  let xColumn;
  let selectedYear;
  let pos;

  const xColumnClicked = (column, year, position) => {
    xColumn = column;
    selectedYear = year;
    pos = position;
    drawScatter(data, pos, currentStat, selectedYear, column);
  };

  select('#nav')
    .call(handleScatterStat, {
      options: columns,
      onOptionClicked: xColumnClicked
    });

  select('#year')
    .call(handleScatterYear, {
      options: yearsArr,
      onOptionClicked: xColumnClicked
    });

  select('#pos')
    .call(handleScatterPos, {
      options: positions,
      onOptionClicked: xColumnClicked
    });
});

document.getElementById('year')
  .addEventListener('input', handleYearChange);

document.getElementById('position')
  .addEventListener('change', handlePosChange);

document.getElementById('stats')
  .addEventListener('change', handleStatChange);
