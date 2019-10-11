import { createPie, drawPie } from './pie';
import { createBar, drawBar } from './bar';

d3.queue()
  .defer(d3.csv,'../data/NBA_PPG_CSV_Master_2017_2019.csv', (row) => {
    return {
      TM: row.Tm,
      AST: +row.AST,
      TRB: +row.TRB,
      BLK: +row.BLK,
      STL: +row.STL,
      PTS: +row.PTS,
      TOV: +row.TOV,
      ThreePointers: +row.ThreePointers,
      FG: +row.FG,
      FT: +row.FT,
      Year: +row.Year
    };
  })
  .await((error, data) => {
    if (error) throw error;
    
    let years = d3.extent(data.map(d => d.Year));
    let currentYear = years[0];
    let currentDataType = 
      d3.select('input[name="data-type"]:checked')
        .attr('value');

    let width = 
      +d3.select(".chart-container")
        .node().offsetWidth;

    let height = 600;
    
    createPie(width, height);
    // createBar(width, height);
    // drawBar(data, currentYear, currentDataType);
    drawPie(data, currentYear);

    //range input
    //when value changes, grab new current year and redraw graph
    d3.select('#year')
      .property('min', currentYear)
      .property('max', years[1])
      .property('value', currentYear)
      .on('input', () => {
        currentYear = +d3.event.target.value;
        drawPie(data, currentYear);
        // drawBar(data, currentYear, currentDataType);
        // highlightBars(currentYear);
      });
    
    //event listener for radio button
    //on change, grab new data type and redraw
    d3.selectAll('input[name="data-type"]')
      .on('change', () => {
        currentDataType = d3.event.target.value;
        // drawBar(data, currentYear, currentDataType);
      });
  });