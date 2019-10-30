import {
  scaleLinear, 
  scaleBand,
  axisLeft,
  axisTop,
  max,
}
from 'd3';

export const drawBar = (selection, props) => {
  const {
    xValue,
    yValue,
    margin,
    widthB,
    heightB,
    data,
    xAxisLabel
  } = props;
  console.log(data)
  
  const innerWidth = widthB - margin.left - margin.right;
  const innerHeight = heightB - margin.top - margin.bottom;
  
  const xScale = scaleLinear()
  .domain([0, max(data, xValue)]) 
  .range([0, innerWidth])
  .nice();
  
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const g = selection.selectAll('.bar-container').data([null]);
  const gEnter = g.enter().append('g')
    .attr('class', 'bar-container')

  gEnter.merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const yAxis = axisLeft(yScale)
    .tickPadding(10);

  const yAxisG = g.select('.yb-axis');
  const yAxisGEnter = gEnter
    .append('g').attr('class', 'yb-axis');

  yAxisG
    .merge(yAxisGEnter)
    .call(yAxis)
      .selectAll('.domain, .tick line').remove();
      
  const xAxis = axisTop(xScale).tickSize(-innerHeight)

  const xAxisG = g.select('.xb-axis');
  const xAxisGEnter = gEnter
    .append('g').attr('class', 'xb-axis');

  xAxisG
    .merge(xAxisGEnter)
    .call(xAxis)
    .selectAll('.domain, .tick line').remove();

  const xAxisLabelText = xAxisGEnter
    .append('text')
      .attr('class', 'axisb-label')
      .attr('y', -30)
      .attr('fill', 'black')
    .merge(xAxisG.select('.axisb-label'))
      .attr('x', innerWidth / 2)
      .text(xAxisLabel);
  
  const rects = g.merge(gEnter)
    .selectAll('rect').data(data)

  let t = d3.transition()
    .duration(1000)
    .ease(d3.easeBounceOut);

  rects.enter().append('rect')
    .attr('x', 0)
    .attr('y', d => yScale(yValue(d)))
    .merge(rects)
    .transition(t)
    .delay((d, i) => i * 10)
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('class', 'bar');

  g.append('text')
    .attr('y', -50)
    .attr('x', innerWidth / 4)
    .text('Top players per position')

  rects.exit()
    .transition(t)
    .delay((d, i) => i * 5)
    .attr('x', 0)
    .attr('y', d => yScale(yValue(d)))
    .remove()
};