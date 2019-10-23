import { 
  select,
   csv 
  } 
  from 'd3';
import { loadData } from './loadData';
import { drawBar } from './newBar';
//selecting svg on html
const svg = select('#bar');

const width = +svg.attr('width');
const height = +svg.attr('height');


//pass year from radio button to select avg stats for year
loadData().then(data => {
  let yearsArr = [2017, 2018, 2019];
  let currentYear = yearsArr[0];
  let currentPos = d3.select('input[name="pos"]:checked').attr('value');
  let currentStat = d3.select('input[name="stat"]:checked').attr('value');
  
  drawBar(data, currentPos, currentStat, currentYear);
  d3.select('#year')
    .property('min', currentYear)
    .property('max', yearsArr[2])
    .property('value', currentYear)
    .on('input', () => {
      currentYear = +d3.event.target.value;
      data = data.filter(d => d.Year === currentYear);
      drawBar(data, currentPos, currentStat, currentYear);
    });

  // pass pos, stat, year data to drawbar function
  // we might need to change data to only pass in data for certain positions // stats as well
  d3.selectAll('input[name="pos"]')
    .on("change", () => {
      currentPos = d3.event.target.value;
      data = data.filter(d => d.Pos === currentPos);
      drawBar(data, currentPos, currentStat, currentYear);
    });

  d3.selectAll('input[name="stat"]')
    .on("change", () => {
      currentStat = d3.event.target.value;
      drawBar(data, currentPos, currentStat, currentYear);
    });

})