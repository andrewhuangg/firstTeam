export const createBar = (width, height) => {
  let bar = 
    d3.select('#bar')
      .attr('width', width)
      .attr('height', height)

  bar.append('g')
    .classed('x-axis', true)
 
  bar.append('g')
    .classed('y-axis', true);

  bar.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('font-size', '1em')
    .classed('y-axis-label', true);

  bar.append('text')
    .attr('x', width / 2)
    .attr('y', '1em')
    .attr('font-size', '1.5em')
    .style('text-anchor', 'middle')
    .classed('bar-title', true);
};

export const highlightBars = (year) => {
  d3.select('#bar')
    .selectAll('rect')
      .attr('fill', d => d.year === year ? '#16a085' : '#1abc9c');
};

export const drawBar = (data, currentYear, currentPos, currentStat) => {
  let bar = d3.select('#bar');
  let padding = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 110
  };
  let barPadding = 1;
  let width = +bar.attr("width");
  let height = +bar.attr("height");
  let statData = 
    data.filter(d => d[currentStat])
        .sort((a, b) => a.currentYear - b.currentYear);

  // let xScale = 
  //   d3.scaleLinear()
  //     .domain(d3.extent(data
  //       .sort((a, b) => a[currentStat] - b[currentStat])
  //       .filter(d => d.G >= 40)
  //       .slice(0, 40)
  //       .map(d => d.Player)
  //       ))
  //     .range([padding.left, width - padding.right]);

  let top40 = data.sort((a, b) => a[currentStat] - b[currentStat])
    .filter(d => d.G >= 40)
    .slice(0, 40);

  let xScale =
    d3.scaleLinear()
      .domain(d3.extent(top40, d => d.Year))
      .range([padding.left, width - padding.right]);
    
  let yScale = 
    d3.scaleLinear()
      .domain([0, d3.max(statData, d => d[`${currentStat}`])])
      .range([height - padding.bottom, padding.top]);

  let barWidth = xScale(xScale.domain()[0] + 1) - xScale.range()[0];

  let xAxis = 
    d3.axisBottom(xScale)
      .tickFormat(d3.format('.0f'));


  d3.select('.x-axis')
    .attr('transform', "translate(0, " + (height - padding.bottom) + ")")
    .call(xAxis);

  let yAxis = d3.axisLeft(yScale);
  d3.select('.y-axis')
    .attr('transform', "translate(" + (padding.left - barWidth / 2) + ",0)")
    .transition()
    .duration(1000)
    .call(yAxis);

  let axisLabel = currentStat === 
    "AST" ? `${currentStat} for year ${currentYear}` :
    currentStat === "REB" ? `${currentStat} for year ${currentYear}` :
    currentStat === "STL" ? `${currentStat} for year ${currentYear}` :
    currentStat === "BLK" ? `${currentStat} for year ${currentYear}` : 
    currentStat === "PTS" ? `${currentStat} for year ${currentYear}` :
    currentStat === "FG" ? `${currentStat} for year ${currentYear}` :
    currentStat === "FT" ? `${currentStat} for year ${currentYear}` :
    currentStat === "ThreePointers" ? `${currentStat} for year ${currentYear}` : 
    `TOV for year ${currentYear}`;

  let barTitle = currentPos ? `${currentPos} stats for ${currentYear}` : `please select a year to see annual trends`;

  d3.select('.y-axis-label')
    .text(axisLabel);

  d3.select('.bar-title')
    .text(barTitle);

  let t = 
    d3.transition()
      .duration(1000)
      .ease(d3.easeBounceOut);


  let update = 
    bar.selectAll('bar')
       .data(statData);
  
  update
    .exit()
    .transition(t)
      .delay((d, i, nodes) => (nodes.length - i - 1) * 100)
      .attr('y', height - padding.bottom)
      .attr('height', 0)
      .remove();
  
  update
    .enter()
    .append("rect")
      .classed("bar", true)
      .attr("y", height - padding.bottom)
      .attr("height", 0)
    .merge(update)
      .attr("x", d => (xScale(d.Year) + xScale(d.Year - 1)) / 2)
      .attr("width", barWidth - barPadding)
      .transition(t)
      .delay((d, i) => i * 100)
        .attr("y", d => yScale(d[currentStat]))
        .attr("height", d => height - padding.bottom - yScale(d[currentStat]));
};