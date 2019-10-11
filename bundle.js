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
/*! no static exports found */
/***/ (function(module, exports) {



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
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_bar__WEBPACK_IMPORTED_MODULE_1__);



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
    
    Object(_pie__WEBPACK_IMPORTED_MODULE_0__["createPie"])(width, height);
    // createBar(width, height);
    // drawBar(data, currentYear, currentDataType);
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

  let arcs = d3.pie().value(d => d.Year)

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