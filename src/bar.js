import {
  select,
  scaleLinear, 
  scaleBand,
  axisLeft,
  axisTop,
  max,
}
from 'd3';

//domain = dataspace
//range = screen space

const svg = select('#bar');
const width = +svg.attr('width');
const height = +svg.attr('height');

export const drawBar = (data, pos, stat, year) => {
  const margin = {top: 80, right: 20, bottom: 20, left: 125};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, d => d[stat])]) //0 to max stat
    .range([0, innerWidth]) //the bars will go as far as the width of the container
    .nice();

  const yScale = scaleBand() //useful for ordinal attributes - mapping onto a range defined by beginning points of rectangles
    .domain(data.map(d => d.Player))
    .range([0, innerHeight]) //range 0 to height will cause data elements to be arranged from top to bottom
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`) //origin is top left corner, to get the g towards center, we translate margin left and margiht right

  g.append('g')
    .call(axisLeft(yScale))//putting yaxis here and grouping all of them
    .selectAll('.domain, .tick line') //selecting parent domain, and all line elements from the tick class
      .remove();
      
  const xAxis = axisTop(xScale).tickSize(-innerHeight)
  const xAxisG = g.append('g').call(xAxis) //group element for xAxis

  xAxisG
    .selectAll('.domain').remove(); //selecting parent domain and removing them

  xAxisG.append('text')
    .attr('y', -30) //controls the text on the xaxis .. moving it up and down
    .attr('x', innerWidth / 2) //center
    .attr('fill', 'black')
    .text(`${stat}`)
  
  g.selectAll('rect')
    .data(data) // appending rectangles to g now instead of svg bc thats where we want to start drawing // svg.selectAll was replaced by g.selectAll
    .enter()
    .append('rect')
      .attr('y', d => yScale(d.Player))
      .attr('width', d => xScale(d[stat])) // using xscale to compute width of bars. (d is one row of data table and returns xScale of our value, now we have rectangles of different widths)
      .attr('height', yScale.bandwidth()) //bandwidth is the computed width of a single bar
      .attr('class', 'bar')

  g.append('text')
    .attr('y', -50) //y coordinate of label..
    .attr('x', innerWidth / 4)
    .text('Top players per position')


};