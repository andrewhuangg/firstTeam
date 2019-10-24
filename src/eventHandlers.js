import {
  select
} from 'd3';
import { loadData } from './loadData';
import { drawBar } from './newBar';

const svg = select('#bar');
const width = +svg.attr('width');
const height = +svg.attr('height');

export const handleYearChange = (e) => {
  d3.selectAll('svg > *').remove();
  console.log('changing year')
  loadData().then(data => {
    let yearsArr = [2017, 2018, 2019];
    let currentYear = yearsArr[0];
    let currentPos = d3.select('input[name="pos"]').attr('value');
    // let currentPos = d3.select('option[name="pos"]').attr('value');
    let currentStat = d3.select('input[name="stat"]').attr('value');

    d3.select('#year')
      .property('min', currentYear)
      .property('max', yearsArr[2])
      .property('value', currentYear)
      .on('input', () => {
        currentYear = +d3.event.target.value;
        data = data.filter(d => d.Year === currentYear);
        drawBar(data, currentPos, currentStat, currentYear);
      });
  });
};

export const handleStatChange = (e) => {
  d3.selectAll('svg > *').remove();
  console.log('changingStat')
  loadData().then(data => {
    let yearsArr = [2017, 2018, 2019];
    let currentYear = yearsArr[0];
    let currentPos = d3.select('input[name="pos"]').attr('value');
    // let currentPos = d3.select('option[name="pos"]').attr('value');
    let currentStat = d3.select('input[name="stat"]').attr('value');

    d3.selectAll('input[name="stat"]')
      .on("change", () => {
        currentStat = d3.event.target.value;
        drawBar(data, currentPos, currentStat, currentYear);
      });
  });
};

export const handlePosChange = (e) => {
  d3.selectAll('svg > *').remove();
  console.log('changingPos')
  loadData().then(data => {
    let yearsArr = [2017, 2018, 2019];
    let currentYear = yearsArr[0];
    let currentPos = d3.select('input[name="pos"]').attr('value');
    // let currentPos = d3.select('option[name="pos"]').attr('value');
    let currentStat = d3.select('input[name="stat"]').attr('value');
    console.log('before selectAll', currentPos)
    d3.selectAll('input[name="pos"]') //option
      .on("change", () => {
        letcurrentPos = d3.event.target.value;
        console.log('after selectAll', currentPos)
        let posData;
        posData = data.filter(d => d.Pos === currentPos);
        drawBar(posData, currentPos, currentStat, currentYear);
      });
  });
};

//pass year from radio button to select avg stats for year
// loadData().then(data => {
//   let yearsArr = [2017, 2018, 2019];
//   let currentYear = yearsArr[0];
//   let currentPos = d3.select('input[name="pos"]:checked').attr('value');
//   let currentStat = d3.select('input[name="stat"]:checked').attr('value');

//   drawBar(data, currentPos, currentStat, currentYear);
  // d3.select('#year')
  //   .property('min', currentYear)
  //   .property('max', yearsArr[2])
  //   .property('value', currentYear)
  //   .on('input', () => {
  //     currentYear = +d3.event.target.value;
  //     data = data.filter(d => d.Year === currentYear);
  //     drawBar(data, currentPos, currentStat, currentYear);
  //   });

  // pass pos, stat, year data to drawbar function
  // we might need to change data to only pass in data for certain positions // stats as well
  // d3.selectAll('input[name="pos"]')
  //   .on("change", () => {
  //     currentPos = d3.event.target.value;
  //     let posData;
  //     posData = data.filter(d => d.Pos === currentPos);
  //     drawBar(posData, currentPos, currentStat, currentYear);
  //     console.log(posData)
  //   });

  // d3.selectAll('input[name="stat"]')
  //   .on("change", () => {
  //     currentStat = d3.event.target.value;
  //     drawBar(data, currentPos, currentStat, currentYear);
  //   });

// });
