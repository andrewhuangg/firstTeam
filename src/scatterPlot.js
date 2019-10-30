import {
  scaleLinear,
  extent,
  axisLeft,
  axisTop,
}
from 'd3';

export const drawScatter = (selection, props) => {
  const {
    circleRadius,
    xValue,
    xAxisLabel,
    yValue,
    yAxisLabel,
    margin,
    widthSc,
    heightSc,
    data,
  } = props;

  const innerWidth = widthSc - margin.left - margin.right;
  const innerHeight = heightSc - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const g = selection.selectAll('.chart-container').data([null]);
  const gEnter = g.enter().append('g')
    .attr('class', 'chart-container');

  gEnter.merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  const yAxisG = g.select('.y-axis');
  const yAxisGEnter = gEnter
    .append('g').attr('class', 'y-axis');

  yAxisG
    .merge(yAxisGEnter)
      .call(yAxis)
      .selectAll('.domain').remove();

  const yAxisLabelText = yAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -50)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
    .merge(yAxisG.select('.axis-label'))
      .attr('x', - innerHeight / 2)
      .text(yAxisLabel);
      
  const xAxis = axisTop(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

  const xAxisG = g.select('.x-axis')
  const xAxisGEnter = gEnter
    .append('g').attr('class', 'x-axis');

  xAxisG
    .merge(xAxisGEnter)
      .call(xAxis)
      .selectAll('.domain').remove();

  const xAxisLabelText = xAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -30)
      .attr('fill', 'black')
    .merge(xAxisG.select('.axis-label'))
      .attr('x', innerWidth / 2)
      .text(xAxisLabel);

  const circles = g.merge(gEnter)
    .selectAll('circle').data(data);

  let toolTip = d3.select('body')
    .append("div")
      .attr('id', 'myToolTip')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")

  circles.enter().append('circle')
      .attr('cx', innerWidth / 2)
      .attr('cy', innerHeight / 2)
      .attr('r', 0)
      .on("mouseover", () => toolTip.style("visibility", "visible"))
      .on("mousemove", (d) => toolTip.html(d.Player).style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px"))
      .on("mouseout", () => toolTip.style("visibility", "hidden"))
    .merge(circles)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 10)
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);

  circles.exit().remove();

};