// import {
//   select,
//   csv,
//   json,
//   scaleLinear,
//   max,
//   scaleBand,
//   axisLeft,
//   axisBottom,
//   axisTop,
//   extent,
//   bandwidth,
//   format
// } from 'd3';


// const svgPg = select('#sznPg');
// const width = +svgPg.attr('width');
// const height = +svgPg.attr('height');

// /*
// .data(data) is a data join with three cases, 'enter', 'update', 'exit' 
// in which case data / elements, data is our array of data entries, elements are
// the dom elements, (the rectangles)
//   - enter
//     more entries in data array than there are dom elements, which is why we 
//     select all rects to get that set of element(originally empty)
//     the enter selection creates a thing that pertains to all our data elements
//     and we use this to create a rect for row of our table
// */
// const render = data => {
//   const margin = { top: 80, bottom: 20, right: 20, left: 130 };
//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.top - margin.bottom;
//   const xValue = d => d.PTS;
//   const yValue = d => d.Player;

//   const xScale = scaleLinear()
//     .domain([0, max(data, xValue)])
//     .range([0, innerWidth]) //an instance of scaleLinear which maps the numbers from the domain to the range(it scales it), domain(the data space, the min and max values of our data), range(the screen space, typically in px coordinates, the width of each bar in pixels)

//   const yScale = scaleBand()
//     .domain(data.map(yValue))
//     .range([0, innerHeight])
//     .padding(0.2) //padding on the yscale (the bars)

//   const g = svgPg.append('g')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`);

//   g.append('g')
//     .call(axisLeft(yScale)) //appending new group element where we put the yaxis
//     .selectAll('.domain, .tick line')
//     .remove();

//   const xAxis = axisTop(xScale)
//     .tickPadding(5)
//     .tickSize(-innerHeight)

//   const xAxisG = g.append('g').call(xAxis)

//   //xAxis title
//   xAxisG.append('text').text('Points')
//     .attr('class', 'xLabel')
//     .attr('transform', `translate(${margin.left - 100})`)
//     .attr('y', -25)
//     .attr('fill', 'black')

//   xAxisG.select('.domain').remove();

//   g.selectAll('rect')
//     .data(data)
//     .enter()
//     .append('rect')
//     .attr('y', d => yScale(yValue(d)))
//     .attr('width', d => xScale(xValue(d))) // d is one row of our data table returns linear scale of (domain)
//     .attr('height', yScale.bandwidth()) //bandwidth is the computed width of a single bar
//     .attr('class', 'bar')

//   g.selectAll('bar')
//     .data(data)
//     .enter()
//     .append('text')
//     .attr('y', d => yScale(yValue(d)) + 10)
//     .attr('x', d => xScale(xValue(d)) - 5)
//     .attr('text-anchor', 'middle')
//     .text(d => `${xValue(d)}`)


//   //svg header
//   svgPg.append('text')
//     .attr('class', 'title')
//     .text('2018 PGs Avgs +10Pts +10MP')
//     .attr('transform', `translate(${margin.left / 2}, ${margin.top - 50})`)
// };

// csv('../data/playerSeasonAvg.csv')
//   .then(data => {
//     let filtered = data
//       .filter(d => d.PTS > 10 && d.MP > 10 && d.Pos === 'PG')

//     filtered.sort((a, b) => b.PTS - a.PTS).forEach(d => {
//       d.Player;
//       d.PTS;
//       // d.Age;
//       // d.G;
//       // d.MP;
//       // d.FG;
//       // d.FGpct;
//       // d.threeP;
//       // d.threePpct;
//       // d.twoP;
//       // d.twoPpct;
//       // d.eFGpct;
//       // d.FT;
//       // d.FTpct;
//       // d.TRB;
//       // d.AST;
//       // d.STL;
//       // d.BLK;
//       // d.TOV;
//       // d.PF;
//     });
//     render(filtered);
//   });

// // csv('../data/playerSeasonAvg.csv')
// //   .then(data => {
// //     let filtered = data
// //       .filter(d => d.PTS > 10 && d.MP > 10 && d.Pos === 'SG')

// //     filtered.sort((a, b) => b.PTS - a.PTS).forEach(d => {
// //       d.Player;
// //       d.PTS;
// //       // d.Age;
// //       // d.G;
// //       // d.MP;
// //       // d.FG;
// //       // d.FGpct;
// //       // d.threeP;
// //       // d.threePpct;
// //       // d.twoP;
// //       // d.twoPpct;
// //       // d.eFGpct;
// //       // d.FT;
// //       // d.FTpct;
// //       // d.TRB;
// //       // d.AST;
// //       // d.STL;
// //       // d.BLK;
// //       // d.TOV;
// //       // d.PF;
// //     });
// //     render(filtered);
// //   });