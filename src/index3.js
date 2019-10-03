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

//barGroups
  //   .append('text')
  // .attr('class', 'value')
  // .attr('x', d => xScale(d.Player) + xScale.bandwidth() / 2)
  // .attr('y', d => yScale(d.PTS) + 30)
  // .attr('text-anchor', 'middle')
  // .text(d => `${d.PTS}`)
//

// const svg = select('svg');
// const width = +svg.attr('width');
// const height = +svg.attr('height');

// const render = data => {
//   const xValue = d => d.PTS;
//   const yValue = d => d.Player;
//   const margin = { top: 50, right: 20, left: 150, bottom: 20 };
//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.top - margin.bottom;

//   const g = svg.append('g')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`)

//   const xScale = scaleLinear()
//     .domain([0, max(data, xValue)])
//     .range([0, innerWidth])

//   const yScale = scaleBand()
//     .domain(data.map(yValue))
//     .range([0, innerHeight])
//     .padding(0.3)

//   g.append('g').call(axisLeft(yScale))
//   g.append('g').call(axisTop(xScale))
//     .attr('transform', `translate(0, 0)`)



//   g.selectAll('rect')
//     .data(data)
//     .enter().append('rect')
//     .attr('y', d => yScale(yValue(d)))
//     .attr('width', d => xScale(xValue(d)))
//     .attr('height', 15)

//   g.selectAll('text')
//     .data(data)
//     .enter()
//     .append('text')
//     .text(d => d.PTS)
//     .attr('x', d => xScale(xValue(d)) + xScale.bandwidth / 2)
//     .attr('y', d => yScale(yValue(d)) + 12)
// };

// csv('../data/playerSeasonAvg.csv')
//   .then(data => {
//     // let player = data[0];
//     // player.Player;
//     // player.PTS;
//     let filtered = data.filter(d => d.PTS > 10 && d.MP > 15)
//     filtered.forEach(d => {
//       d.Player;
//       d.PTS;
//       // d.RK;
//       // d.Pos;
//       // d.Tm;
//       // d.Age;
//       // d.G;
//       // d.GS;
//       // d.MP;
//       // d.FG;
//       // d.FGA;
//       // d.FGpct;
//       // d.threeP;
//       // d.threePA;
//       // d.threePpct;
//       // d.twoP;
//       // d.twoPA;
//       // d.twoPpct;
//       // d.eFGpct;
//       // d.FT;
//       // d.FTA;
//       // d.FTpct;
//       // d.ORB;
//       // d.DRB;
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
// //     data.forEach(d => {
// //     });
// //     render(data);
// //   });