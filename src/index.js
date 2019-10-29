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

const svgB = select('#bar');
const svgSc = select('#scatter');
const widthB = +svgB.attr('width');
const heightB = +svgB.attr('height');
const widthSc = +svgSc.attr('width');
const heightSc = +svgSc.attr('height');

let yearsArr = [2017, 2018, 2019];
let columns = ['GS', 'MP', 'ThreePointers', 'TRB', 'AST', 'STL', 'BLK', 'PTS', 'TOV'];
let positions = ['PG', 'SG', 'SF', 'PF', 'C'];
let xColumn;
let yColumn;
let pos;
let year;
let circleRadius = 8;

loadData().then(data => {
  // drawBar(data, currentPos, currentStat, currentYear);

  console.log(year, pos)
  
  const xColumnClicked = (column) => {
    xColumn = column;
    svgSc.call(drawScatter, {
      circleRadius: circleRadius,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      pos,
      year,
      data,
    });
  };

  const yColumnClicked = (column) => {
    yColumn = column;

    svgSc.call(drawScatter, {
      circleRadius: circleRadius,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      pos,
      year,
      data,
    });
  };

  const selectedYear = (year) => {

    svgSc.call(drawScatter, {
      circleRadius: 5,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      pos,
      year,
      data: data.filter(d => d.Year === parseInt(year))
    });
  };

  const selectedPos = (pos) => {

    svgSc.call(drawScatter, {
      circleRadius: circleRadius,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      pos,
      year,
      data: data.filter(d => d.Pos === pos)
    });
  };

  select('#x-menu')
    .call(handleScatterStat, {
      options: columns,
      onOptionClicked: xColumnClicked,
      selectedOption: xColumn
    });
  
  select('#y-menu')
    .call(handleScatterStat, {
      options: columns,
      onOptionClicked: yColumnClicked,
      selectedOption: yColumn
    });

  select('#year')
    .call(handleScatterYear, {
      options: yearsArr,
      onOptionClicked: selectedYear
    });

  select('#pos')
    .call(handleScatterPos, {
      options: positions,
      onOptionClicked: selectedPos
    });

  xColumn = columns[0];
  yColumn = columns[1];
  svgSc.call(drawScatter, {
    circleRadius: circleRadius,
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    yAxisLabel: yColumn,
    margin: { top: 80, right: 20, bottom: 20, left: 125 },
    widthSc,
    heightSc,
    data
  });

});
