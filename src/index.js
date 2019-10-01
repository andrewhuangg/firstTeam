import * as NBAUtil from '../nba_util';
import { 
  select,
  arc
 } from 'd3';

//svg
const svg = select('svg');

//size of svg
const height = parseFloat(svg.attr('height'));
const width = parseFloat(svg.attr('width'));
const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g.append('circle')
.attr('r', height / 2)
.attr('fill', 'yellow')
.attr('stroke', 'black')

//svg variables
const eyeSpacing = 100;
const eyeOffSet = -70;
const eyeRadius = 40;
const eyebrowWidth = 70;
const eyebrowHeight = 15;
const eyebrowOffset = -70;

const eyesG = g
  .append('g')
    .attr('transform', `translate(0, ${eyeOffSet})`);

const leftEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing);

const rightEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing);

const eyebrowsG = eyesG
  .append('g')
    .attr('transform', `translate(0, ${eyebrowOffset})`);

eyebrowsG
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowOffset - 50})`)
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowOffset})`);

const leftEyebrow = eyebrowsG
  .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

const rightEyebrow = eyebrowsG
  .append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

const mouth = g
  .append('path')
    .attr('d', arc() ({
    innerRadius: 150,
    outerRadius: 170,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2
  }));