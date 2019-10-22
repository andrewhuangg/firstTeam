// import { nice } from 'd3';

// export const createBar = (width, height) => {
//   let bar =
//     d3.select('#bar')
//       .attr('width', width)
//       .attr('height', height)

//   bar.append('g')
//     .classed('x-axis', true)

//   bar.append('g')
//     .classed('y-axis', true);

//   bar.append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('x', - height / 2)
//     .style('text-anchor', 'middle')
//     .style('font-size', '1em')
//     .classed('y-axis-label', true);

//   bar.append('text')
//     .attr('x', width / 2)
//     .attr('y', '1em')
//     .attr('font-size', '1.5em')
//     .style('text-anchor', 'middle')
//     .classed('bar-title', true);
// };

// export const highlightBars = (year) => {
//   d3.select('#bar')
//     .selectAll('rect')
//     .attr('fill', d => d.year === year ? '#16a085' : '#1abc9c');
// };

// export const drawBar = (data, currentYear, currentPos, currentStat) => {
//   let bar = d3.select('#bar');
//   let margin = {
//     top: 30,
//     right: 30,
//     bottom: 30,
//     left: 10 //10
//   };
//   let barPadding = 1;
//   let width = +bar.attr("width");
//   let height = +bar.attr("height");
//   let innerWidth = width - margin.left - margin.right;
//   let innerHeight = height - margin.top - margin.bottom;

//   // const g = bar.append('g')
//   //   .attr('transform', `translate(20, 20)`);
//   // .attr('transform', `translate(${margin.left}, ${margin.right})`);

//   //posData organized by Year
//   let posData =
//     data.filter(d => d.POS === currentPos)
//       .sort((a, b) => a.Year - b.Year)

//   //players organized by stat, decreasing - increasing
//   let players =
//     posData.sort((a, b) => b[currentStat] - a[currentStat])
//       .slice(0, 20);


//   let xScale =
//     d3.scaleBand()
//       .domain(players.map(d => d.Player))
//       .range([0, innerWidth])
//   // .range([margin.left, width - margin.right])
//   // .padding(0.1)
//   // .range([0, width])
//   // .padding(0.1)

//   //when we append rect, we need to set range and height to x and yscales
//   let yScale =
//     d3.scaleLinear()
//       .domain([0, d3.max(players, d => d[currentStat])])
//       .range([innerHeight, 0])
//       .nice()

//   let barWidth = yScale(yScale.domain()[0] + 1) - yScale.range()[0];

//   let xAxis = d3.axisBottom(xScale)

//   let yAxis = d3.axisLeft(yScale);

//   // g.append('g').call(yAxis)
//   d3.select('.y-axis')
//     .attr('transform', `translate(30, 0)`)
//     .transition()
//     .duration(1000)
//     .call(yAxis);

//   // g.append('g').call(xAxis)
//   d3.select('.x-axis')
//     .attr('transform', `translate(0, ${innerHeight})`)
//     .transition()
//     .duration(1000)
//     .call(xAxis)
//     .selectAll('text')
//     .style('text-anchor', 'end')
//     .attr("transform", "rotate(-90)")

//   let axisLabel = currentStat ===
//     "AST" ? `${currentStat} for year ${currentYear}` :
//     currentStat === "REB" ? `${currentStat} for year ${currentYear}` :
//       currentStat === "STL" ? `${currentStat} for year ${currentYear}` :
//         currentStat === "BLK" ? `${currentStat} for year ${currentYear}` :
//           currentStat === "PTS" ? `${currentStat} for year ${currentYear}` :
//             currentStat === "FG" ? `${currentStat} for year ${currentYear}` :
//               currentStat === "FT" ? `${currentStat} for year ${currentYear}` :
//                 currentStat === "ThreePointers" ? `${currentStat} for year ${currentYear}` :
//                   `TOV for year ${currentYear}`;

//   let barTitle = currentPos ? `${currentPos} stats for ${currentYear}` : `please select a year to see annual trends`;

//   d3.select(".y-axis-label")
//     .text(axisLabel);

//   d3.select(".bar-title")
//     .text(barTitle);

//   let t =
//     d3.transition()
//       .duration(1000)
//       .ease(d3.easeBounceOut);

//   let update =
//     bar.selectAll('.bar')
//       .data(players)

//   update
//     .exit()
//     .transition(t)
//     .delay((d, i, nodes) => (nodes.length - i - 1) * 100)
//     .attr('y', height - margin.bottom)
//     .attr('height', 0)
//     .remove();

//   update
//     .enter()
//     .append('rect')
//     .classed('bar', true)
//     .attr('y', height) //how far the bar is from the top of graph
//     .attr('height', 0) //where it starts
//     .merge(update)
//     .attr('x', d => xScale(d.Player) + 25) //how this is spread across the graph
//     .attr('width', d => xScale.bandwidth() / 2) //how wide the bars are
//     .transition(t)
//     .delay((d, i) => i * 100)
//     .attr('y', d => yScale(d[currentStat]) - 60) //distance between bar and top of graph
//     .attr('height', d => height - yScale(d[currentStat]))//- margin.bottom)//- 90) //how tall the bars are
// };      