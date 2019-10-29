import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisTop,
  max
}
from 'd3';

// const svg = select('#scatter');
// const width = +svg.attr('width');
// const height = +svg.attr('height');
// export const drawScatter = (data, pos, stat, year, columns) => {
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
    pos,
    year, //parseInt this because year is a string from dropdown
  } = props;

  const innerWidth = widthSc - margin.left - margin.right;
  const innerHeight = heightSc - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

    console.log(data)
  console.log(yAxisLabel)
    console.log(pos, year)
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  //selecting a class to be more specific instead of all 'g' because there are nested group elements
  const g = selection.selectAll('.chart-container').data([null]);
  const gEnter = g.enter().append('g')
    .attr('class', 'chart-container');

  gEnter.merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  //there is going to be two group elements, y and x so we should give them a class for specificity
  //bc we're appending groups elements to parent group, we need to capture the nested version of the update pattern. (the enter selection)
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

  circles
    .enter()
    .append('circle')
      .attr('cx', innerWidth / 2) //during enter selection, we give x and y cooridates to determine where the circles enters from. in this case the center
      .attr('cy', innerHeight / 2)
      .attr('r', 0)
      .on("mouseover", () => toolTip.style("visibility", "visible"))
      .on("mousemove", (d) => toolTip.html(d.Player).style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px"))
      .on("mouseout", () => toolTip.style("visibility", "hidden"))
    .merge(circles)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 10) //d is data point, i is index. //i * # is delay of each point transitioning
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);

  circles.exit().remove();

};