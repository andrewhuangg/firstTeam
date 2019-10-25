import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisTop,
  max,
}
from 'd3';

//domain = dataspace
//range = screen space

const svg = select('#scatter');
const width = +svg.attr('width');
const height = +svg.attr('height');

export const drawScatter = (data, pos, stat, year) => {
  const margin = {top: 80, right: 20, bottom: 20, left: 125};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 5;
  const xValue = d => d.GS;
  const yValue = d => d.PTS;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)

  g.append('g')
    .call(yAxis)
    .selectAll('.domain')
      .remove();
      
  const xAxis = axisTop(xScale).tickSize(-innerHeight)
  const xAxisG = g.append('g').call(xAxis)

  xAxisG
    .selectAll('.domain').remove();

  xAxisG.append('text')
    .attr('y', -30)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text(`${stat}`)
  
  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)

  g.append('text')
    .attr('y', -50)
    .attr('x', innerWidth / 4)
    .text('Top players per position')


};