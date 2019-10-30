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
      .on("mousemove", (d) => toolTip
        .html(
          `<div class="game"><span class="tooltipText">Team: </span> ${d.Tm}</div>` +
          `<div class="game"><span class="tooltipText">Current Year: </span> ${d.Year}</div>` +
          `<div class="game"> <span class="tooltipText">Number of games played: </span> ${d.G}</div>` +
          `<div class="game"><span class="tooltipText">Games started: </span> ${d.GS}</div>` +
          `<div class="game"><span class="tooltipText">Minutes Played: </span> ${d.MP}</div>` +
          `<div class="game"><span class="tooltipText">Player name: </span> ${d.Player}</div>` +
          `<div class="game"><span class="tooltipText">points: </span> ${d.PTS}</div>` +
          `<div class="game"><span class="tooltipText">ast: </span> ${d.AST}</div>` +
          `<div class="game"><span class="tooltipText">rebs: </span> ${d.TRB}</div>` +
          `<div class="game"><span class="tooltipText">stls: </span> ${d.STL}</div>` +
          `<div class="game"><span class="tooltipText">three pointers made: </span> ${d.ThreePointers}</div>` +
          `<div class="game"><span class="tooltipText">fg%: </span> ${d.FGpct}</div>` +
          `<div class="game"><span class="tooltipText">ft%: </span> ${d.FTpct}</div>` +
          `<div class="game"><span class="tooltipText">effective fg%: </span> ${d.eFGpct}</div>`
        )
      .style("top", (event.pageY - 10) + "px")
      .style("left", (event.pageX + 10) + "px"))
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