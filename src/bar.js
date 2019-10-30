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