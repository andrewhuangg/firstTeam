import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisTop,
  extent,
  bandwidth,
  zoom,
  event
} from 'd3';
import { loadData } from './loadData'

const svg = select('svg')
const width = 300; //document.body.clientWidth;
const height = 600;

svg
  .attr('width', width)
  .attr('height', height)


/*
.data(data) is a data join with three cases, 'enter', 'update', 'exit' 
in which case data / elements, data is our array of data entries, elements are
the dom elements, (the rectangles)
  - enter
    more entries in data array than there are dom elements, which is why we 
    select all rects to get that set of element(originally empty)
    the enter selection creates a thing that pertains to all our data elements
    and we use this to create a rect for row of our table
*/
loadData().then(data => {
  render(data);
});


const render = (data) => {
  const margin = { top: 80, bottom: 20, right: 20, left: 130 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xValue = d => d.PTS;
  const yValue = d => d.Player;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]) //an instance of scaleLinear which maps the numbers from the domain to the range(it scales it), domain(the data space, the min and max values of our data), range(the screen space, typically in px coordinates, the width of each bar in pixels)
  
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2) //padding on the yscale (the bars)
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('width', width)
    .attr('height', height)
  
  g.append('g')
    .call(axisLeft(yScale)) //appending new group element where we put the yaxis
    .selectAll('.domain, .tick line')
      .remove();

  const xAxis = axisTop(xScale)
    .tickPadding(5)
    .tickSize(-innerHeight)

  const xAxisG = g.append('g').call(xAxis)
    
  //xAxis title
  xAxisG.append('text').text('Points')
    .attr('class', 'xLabel')
    .attr('transform', `translate(${margin.left - 100})`)
    .attr('y', -25)
    .attr('fill', 'black')
    
  xAxisG.select('.domain').remove();

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d))) // d is one row of our data table returns linear scale of (domain)
      .attr('height', yScale.bandwidth()) //bandwidth is the computed width of a single bar
      .attr('class', 'bar')

  g.selectAll('bar')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'barValues')
      .attr('y', d => yScale(yValue(d)) + 9)
      .attr('x', d => xScale(xValue(d)) - 12)
      .attr('text-anchor', 'middle')
      .text(d => `${xValue(d)}`)
    .append('title')
    .text(d => d.PTS)
    

  //svg header
  svg.append('text')
    .attr('class', 'title')
    .text('2018 PGs Avgs +10Pts +10MP')
    .attr('transform', `translate(${margin.left / 2}, ${margin.top - 50})`)

    //zoom
  // svg.call(zoom().on('zoom', () => {
  //   g.attr('transform', event.transform);
  // }));
};
