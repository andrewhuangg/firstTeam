import {
  select,
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
    .attr('class', 'bar-container');

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
    .selectAll('rect').data(data);

  let toolTip = d3.select('body')
    .append("div")
      .attr('id', 'myToolTip')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");
  

  rects.enter().append('rect')
    .attr('x', 0)
    .attr('y', d => yScale(yValue(d)))
    .on("mouseover", () => toolTip.style("visibility", "visible"))
    .on("mousemove", (d) => toolTip.html(d.G + d.Player).style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px"))
    .on("mouseout", () => toolTip.style("visibility", "hidden"))
    .merge(rects)
    .transition()
    .duration(1000)
    .attr('width', d => xScale(xValue(d)))
    .delay((d, i) => i * 15)
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('class', 'bar');


  g.append('text')
      .attr('y', -50)
      .attr('x', innerWidth / 4)
    .text('Top players per position');

  rects.exit()
    .transition()
    .duration(1000)
    .attr('width', d => xScale(xValue(d)))
    .delay((d, i) => i * 1)
      .attr('x', 0)
      .attr('y', innerHeight / 2)
    .remove();
};