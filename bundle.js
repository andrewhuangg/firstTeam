/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bar.js":
/*!********************!*\
  !*** ./src/bar.js ***!
  \********************/
/*! exports provided: createBar, highlightBars, drawBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBar", function() { return createBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightBars", function() { return highlightBars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawBar", function() { return drawBar; });
const createBar = (width, height) => {
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

const highlightBars = (year) => {
  d3.select('#bar')
    .selectAll('rect')
      .attr('fill', d => d.year === year ? '#16a085' : '#1abc9c');
};

const drawBar = (data, currentYear, currentPos, currentStat) => {
  let bar = d3.select('#bar');
  let margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 10
  };
  let barPadding = 1;
  let width = +bar.attr("width");
  let height = +bar.attr("height");
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  // const g = bar.append('g')
  //   .attr('transform', `translate(20, 20)`);
    // .attr('transform', `translate(${margin.left}, ${margin.right})`);

  //posData organized by Year
  let posData = 
    data.filter(d => d.POS === currentPos)
      .sort((a, b) => a.Year - b.Year)
  
  //players organized by stat, decreasing - increasing
  let players = 
    posData.sort((a, b) => b[currentStat] - a[currentStat])
      .slice(0, 20);
  

  let xScale = 
    d3.scaleBand()
      .domain(players.map(d => d.Player))
      .range([0, width])
      .padding(0.1)

  //when we append rect, we need to set range and height to x and yscales
  let yScale = 
    d3.scaleLinear()
      .domain([0, d3.max(players, d => d[currentStat])])
      .range([innerHeight, 0]);

  let barWidth = yScale(yScale.domain()[0] + 1) - yScale.range()[0];

  let xAxis = d3.axisBottom(xScale)

  let yAxis = d3.axisLeft(yScale);

  // g.append('g').call(yAxis)
  d3.select('.y-axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .transition()
    .duration(1000)
    .call(yAxis);

  // g.append('g').call(xAxis)
  d3.select('.x-axis')
    .attr('transform', `translate(0, ${innerHeight - margin.top})`)
    .transition()
    .duration(1000)
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr("transform", "rotate(-90)")

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

  d3.select(".y-axis-label")
    .text(axisLabel);

  d3.select(".bar-title")
    .text(barTitle);

  let t = 
    d3.transition()
      .duration(1000)
      .ease(d3.easeBounceOut);

  let update = 
    bar.selectAll('.bar')
       .data(players)
  
  update
    .exit()
    .transition(t)
      .delay((d, i, nodes) => (nodes.length - i - 1) * 100)
      .attr('y', height - margin.bottom)
      .attr('height', 0)
      .remove();

  update
    .enter()
    .append('rect')
      .classed('bar', true)
      .attr('y', height) //how far the bar is from the top of graph
      .attr('height', 0) //where it starts
    .merge(update)
      .attr('x', d => xScale(d.Player)) //how this is spread across the graph
      .attr('width', d => xScale.bandwidth()) //how wide the bars are
      .transition(t)
      .delay((d, i) => i * 100)
        .attr('y', d => yScale(d[currentStat])) //distance between bar and top of graph
        .attr('height', d => height - yScale(d[currentStat]) - margin.bottom) //how tall the bars are
};      

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pie */ "./src/pie.js");
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar */ "./src/bar.js");



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
      Year: +row.Year,
      POS: row.Pos,
      Player: row.Player,
      G: +row.G
    };
  })
  .await((error, data) => {
    if (error) throw error;
    let years = d3.extent(data.map(d => d.Year));
    let currentYear = years[0];
    let currentPos = 
      d3.select('input[name="pos-type"]:checked')
        .attr('value');

    let currentStat = 
      d3.select('input[name="stat-type"]:checked')
        .attr('value');

    let width = 
      +d3.select(".chart-container")
        .node().offsetWidth;

    let pieHeight = 500;
    let height = 500;
    
    Object(_pie__WEBPACK_IMPORTED_MODULE_0__["createPie"])(width, pieHeight);
    Object(_bar__WEBPACK_IMPORTED_MODULE_1__["createBar"])(width, height);
    Object(_bar__WEBPACK_IMPORTED_MODULE_1__["drawBar"])(data, currentYear, currentPos, currentStat);
    Object(_pie__WEBPACK_IMPORTED_MODULE_0__["drawPie"])(data, currentYear);

    //range input
    //when value changes, grab new current year and redraw graph
    d3.select('#year')
      .property('min', currentYear)
      .property('max', years[1])
      .property('value', currentYear)
      .on('input', () => {
        currentYear = +d3.event.target.value;
        Object(_pie__WEBPACK_IMPORTED_MODULE_0__["drawPie"])(data, currentYear);
        Object(_bar__WEBPACK_IMPORTED_MODULE_1__["drawBar"])(data, currentYear, currentPos, currentStat);
        highlightBars(currentYear);
      });
    
    //event listener for radio button
    //on change, grab new data type and redraw
    d3.selectAll('input[name="pos-type"]')
      .on("change", () => {
        let active = d3.select('.active').data()[0];
        let pos = active ? active.properties.POS : "";
        currentPos = d3.event.target.value;
        Object(_bar__WEBPACK_IMPORTED_MODULE_1__["drawBar"])(data, currentYear, currentPos, currentStat)
      });

    d3.selectAll('input[name="stat-type"]')
      .on("change", () => {
        let active = d3.select('.active').data()[0];
        currentStat = d3.event.target.value;
        let stat = active ? active.properties[currentStat] : "";
        Object(_bar__WEBPACK_IMPORTED_MODULE_1__["drawBar"])(data, currentYear, currentPos, currentStat);
      });


  });

/***/ }),

/***/ "./src/pie.js":
/*!********************!*\
  !*** ./src/pie.js ***!
  \********************/
/*! exports provided: createPie, drawPie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPie", function() { return createPie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawPie", function() { return drawPie; });
const createPie = (width, height) => {
  let pie = 
    d3.select('#pie')
      .attr('width', width)
      .attr('height', height);

  pie.append('g')
    .attr('transform', "translate(" + width / 2 + ", " + (height / 2 + 10) + ")")
    .classed('chart', true);

  pie.append('text')
    .attr('x', width / 2)
    .attr('y', '1em')
    .attr('font-size', '1.5em')
    .style('text-anchor', 'middle')
    .classed('pie-title', true);

};

const drawPie = (data, currentYear) => {
  let pie = d3.select('#pie');

  let arcs = d3.pie().value(d => d.PTS)

  let path = d3.arc()
    .outerRadius(+pie.attr('height') / 2 - 50)
    .innerRadius(0);

  let yearData = data.filter(d => d.Year === currentYear);
  let teams = [];

  for (let i = 0; i < yearData.length; i++) {
    let team = yearData[i].TM;
    if (!teams.includes(team)) {
      teams.push(team);
    }
  }

  let colorScale = d3.scaleOrdinal()
    .domain(teams)
    .range(['#4b47bc', '#7e57c2', '26a69a', '#42a5f5', '#78909c']);

  let update = 
    pie.select('.chart')
      .selectAll('.arc')
      .data(arcs(yearData));

  update
    .exit()
    .remove()

  update
    .enter()
      .append('path')
      .classed('arc', true)
      .attr('stroke', '#dff1ff')
      .attr('stroke-width', '0.25px')
    .merge(update)
      .attr('fill', d => colorScale(d.data.Tm))
      .attr('d', path);

  pie.select('.pie-title')
    .text('Team Stat Leaders by Team, ' + currentYear);
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map