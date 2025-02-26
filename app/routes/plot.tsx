import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { geoAitoff } from "d3-geo-projection";

const ScatterGeoPlot = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const projection = geoAitoff()
      .scale(100)
      .translate([width / 2, height / 2]);

    // Generate grid lines
    const graticule = d3.geoGraticule();

    // Draw grid lines
    svg.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', d3.geoPath().projection(projection))
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.5);

    const circles = svg.selectAll('circle')
      .data(data.filter(d => typeof d.ra === 'number' && typeof d.dec === 'number'))
      .enter()
      .append('circle')
      .attr('cx', d => projection([parseFloat(d.ra), parseFloat(d.dec)])[0])
      .attr('cy', d => projection([parseFloat(d.ra), parseFloat(d.dec)])[1])
      .attr('r', 5)
      .attr('fill', 'blue')
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    const tooltip = d3.select(svgRef.current.parentNode).append('div')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('visibility', 'hidden');

    circles.on('mouseover', (event, d) => {
      tooltip.html(`
        <strong>Name:</strong> ${d.name}<br>
        <strong>Exposure:</strong> ${d.exposure}<br>
        <strong>Sigma:</strong> ${d.sigma}
      `)
        .style`
          visibility: visible;
          left: ${event.pageX + 10}px;
          top: ${event.pageY - 30}px;
        `;
    });

    circles.on('mouseout', () => {
      tooltip.style`
        visibility: hidden;
      `;
    });

    return () => {
      tooltip.remove();
    };
  }, [data, height, width]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};


export default ScatterGeoPlot;