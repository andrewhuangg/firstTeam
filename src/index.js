import { 
  select,
} from 'd3';
import { loadData, loadPlayerData } from './loadData';
import { drawBar } from './bar';
import { drawScatter } from './scatterPlot';
import { drawLine } from './linegraph';
import { 
  handleScatterStat,
  handleScatterYear,
  handleScatterPos,
  handleBarStat,
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
let xColumn; //scatter
let xCol; //bar
let yColumn;
let cpos = positions[0];
let cyear = yearsArr[0];
let circleRadius = 8;

loadData().then(data => {
  xCol = columns[3];
  xColumn = columns[0];
  yColumn = columns[1];

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
      data: data.filter(d => d.Year === parseInt(cyear))
        .filter(d => d.Pos === cpos)
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
      data: data.filter(d => d.Year === parseInt(cyear))
        .filter(d => d.Pos === cpos)
    });
  };

  const selectedYear = (year) => {
    cyear = year;
    svgSc.call(drawScatter, {
      circleRadius: 5,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      data: data.filter(d => d.Year === parseInt(cyear))
        .filter(d => d.Pos === cpos)
    });
    svgB.call(drawBar, {
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthB,
      heightB,
      xValue: d => d[xCol],
      yValue: d => d.Player,
      xAxisLabel: xCol,
      data: data.filter(d => d.Pos === cpos)
        .filter(d => d.Year === parseInt(cyear)),
    });
  };

  const selectedPos = (pos) => {
    cpos = pos;
    svgSc.call(drawScatter, {
      circleRadius: circleRadius,
      xValue: d => d[xColumn],
      xAxisLabel: xColumn,
      yValue: d => d[yColumn],
      yAxisLabel: yColumn,
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthSc,
      heightSc,
      data: data.filter(d => d.Pos === cpos)
        .filter(d => d.Year === parseInt(cyear))
    });
    svgB.call(drawBar, {
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthB,
      heightB,
      xValue: d => d[xCol],
      yValue: d => d.Player,
      xAxisLabel: xCol,
      data: data.filter(d => d.Pos === cpos)
        .filter(d => d.Year === parseInt(cyear)),
    });
  };

  const xBarClicked = (column) => {
    xCol = column;
    svgB.call(drawBar, {
      margin: { top: 80, right: 20, bottom: 20, left: 125 },
      widthB,
      heightB,
      xValue: d => d[xCol],
      yValue: d => d.Player,
      xAxisLabel: xCol,
      data: data.filter(d => d.Pos === cpos)
        .filter(d => d.Year === parseInt(cyear)),
    });
  };

  select('#xBar')
    .call(handleBarStat, {
      options: columns,
      onOptionClicked: xBarClicked,
      selectedOption: xCol
    });

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

  svgSc.call(drawScatter, {
    circleRadius: circleRadius,
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    yAxisLabel: yColumn,
    margin: { top: 80, right: 20, bottom: 20, left: 125 },
    widthSc,
    heightSc,
    data: data.filter(d => d.Pos === cpos)
      .filter(d => d.Year === cyear)
  });
  
  svgB.call(drawBar, {
    margin: { top: 80, right: 20, bottom: 20, left: 125 },
    widthB,
    heightB,
    xValue: d => d[xCol],
    yValue: d => d.Player,
    xAxisLabel: xCol,
    data: data.filter(d => d.Pos === cpos)
      .filter(d => d.Year === cyear)
  });

});
