// export const createPie = (width, height) => {
//   let pie = 
//     d3.select('#pie')
//       .attr('width', width)
//       .attr('height', height);

//   pie.append('g')
//     .attr('transform', "translate(" + width / 2 + ", " + (height / 2 + 10) + ")")
//     .classed('chart', true);

//   pie.append('text')
//     .attr('x', width / 2)
//     .attr('y', '1em')
//     .attr('font-size', '1.5em')
//     .style('text-anchor', 'middle')
//     .classed('pie-title', true);

// };

// export const drawPie = (data, currentYear) => {
//   let pie = d3.select('#pie');

//   let arcs = d3.pie().value(d => d.PTS)

//   let path = d3.arc()
//     .outerRadius(+pie.attr('height') / 2 - 50)
//     .innerRadius(0);

//   let yearData = data.filter(d => d.Year === currentYear);
//   let teams = [];

//   for (let i = 0; i < yearData.length; i++) {
//     let team = yearData[i].TM;
//     if (!teams.includes(team)) {
//       teams.push(team);
//     }
//   }

//   let colorScale = d3.scaleOrdinal()
//     .domain(teams)
//     .range(['#4b47bc', '#7e57c2', '26a69a', '#42a5f5', '#78909c']);

//   let update = 
//     pie.select('.chart')
//       .selectAll('.arc')
//       .data(arcs(yearData));

//   update
//     .exit()
//     .remove()

//   update
//     .enter()
//       .append('path')
//       .classed('arc', true)
//       .attr('stroke', '#dff1ff')
//       .attr('stroke-width', '0.25px')
//     .merge(update)
//       .attr('fill', d => colorScale(d.data.Tm))
//       .attr('d', path);

//   pie.select('.pie-title')
//     .text('Team Stat Leaders by Team, ' + currentYear);
// };