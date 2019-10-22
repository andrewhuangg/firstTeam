// import { createPie, drawPie } from './pie';
// import { createBar, drawBar } from './bar';

// d3.queue()
//   .defer(d3.csv,'../data/NBA_PPG_CSV_Master_2017_2019.csv', (row) => {
//     return {
//       TM: row.Tm,
//       AST: +row.AST,
//       TRB: +row.TRB,
//       BLK: +row.BLK,
//       STL: +row.STL,
//       PTS: +row.PTS,
//       TOV: +row.TOV,
//       ThreePointers: +row.ThreePointers,
//       FG: +row.FG,
//       FT: +row.FT,
//       Year: +row.Year,
//       POS: row.Pos,
//       Player: row.Player,
//       G: +row.G
//     };
//   })
//   .await((error, data) => {
//     if (error) throw error;
//     let years = d3.extent(data.map(d => d.Year));
//     let currentYear = years[0];
//     let currentPos = 
//       d3.select('input[name="pos-type"]:checked')
//         .attr('value');

//     let currentStat = 
//       d3.select('input[name="stat-type"]:checked')
//         .attr('value');

//     let pieWidth = 700;
//     let width = 600;
//     let pieHeight = 500;
//     let height = 500;
    
//     createPie(pieWidth, pieHeight);
//     createBar(width, height);
//     drawBar(data, currentYear, currentPos, currentStat);
//     drawPie(data, currentYear);

//     //range input
//     //when value changes, grab new current year and redraw graph
//     d3.select('#year')
//       .property('min', currentYear)
//       .property('max', years[1])
//       .property('value', currentYear)
//       .on('input', () => {
//         currentYear = +d3.event.target.value;
//         drawPie(data, currentYear);
//         drawBar(data, currentYear, currentPos, currentStat);
//         highlightBars(currentYear);
//       });
    
//     //event listener for radio button
//     //on change, grab new data type and redraw
//     d3.selectAll('input[name="pos-type"]')
//       .on("change", () => {
//         let active = d3.select('.active').data()[0];
//         let pos = active ? active.properties.POS : "";
//         currentPos = d3.event.target.value;
//         drawBar(data, currentYear, currentPos, currentStat)
//       });

//     d3.selectAll('input[name="stat-type"]')
//       .on("change", () => {
//         let active = d3.select('.active').data()[0];
//         currentStat = d3.event.target.value;
//         let stat = active ? active.properties[currentStat] : "";
//         drawBar(data, currentYear, currentPos, currentStat);
//       });


//   });