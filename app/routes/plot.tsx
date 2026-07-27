import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { geoAitoff } from 'd3-geo-projection';

type Row = { name: string; ra: number; dec: number; exposure?: number; sigma?: number };

/* An Aitoff all-sky plot of observed fields. Right ascension increases to the
   left, as it does on the sky, so the projection longitude is negated. */
const ScatterGeoPlot = ({
  data,
  width = 820,
  height = 420,
}: {
  data: Row[];
  width?: number;
  height?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const w = Number(width);
    const h = Number(height);

    const projection = geoAitoff()
      .scale(w / 6.4)
      .translate([w / 2, h / 2]);

    const path = d3.geoPath().projection(projection);
    const project = (ra: number, dec: number) => projection([-(ra > 180 ? ra - 360 : ra), dec]);

    // Outline of the projection, then the graticule inside it.
    svg
      .append('path')
      .datum({ type: 'Sphere' } as never)
      .attr('d', path as never)
      .attr('fill', '#ffffff')
      .attr('stroke', 'var(--slate-300)')
      .attr('stroke-width', 1);

    svg
      .append('path')
      .datum(d3.geoGraticule().step([30, 30])())
      .attr('class', 'graticule')
      .attr('d', path as never)
      .attr('fill', 'none')
      .attr('stroke', 'var(--slate-200)')
      .attr('stroke-width', 0.75);

    const tooltip = d3
      .select(hostRef.current)
      .append('div')
      .attr('class', 'sky-tooltip');

    const points = (data || []).filter(
      (d) => Number.isFinite(Number(d.ra)) && Number.isFinite(Number(d.dec))
    );

    svg
      .append('g')
      .selectAll('circle')
      .data(points)
      .join('circle')
      .attr('cx', (d: Row) => project(Number(d.ra), Number(d.dec))?.[0] ?? 0)
      .attr('cy', (d: Row) => project(Number(d.ra), Number(d.dec))?.[1] ?? 0)
      .attr('r', 4)
      .attr('fill', 'var(--accent)')
      .attr('fill-opacity', 0.75)
      .attr('stroke', 'var(--accent-strong)')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseenter', function (this: SVGCircleElement, event: MouseEvent, d: Row) {
        d3.select(this).attr('r', 6).attr('fill-opacity', 1);
        const bounds = hostRef.current?.getBoundingClientRect();
        tooltip
          .html(
            `<strong>${d.name}</strong><br/>` +
              `R.A. ${Number(d.ra).toFixed(3)}°<br/>` +
              `Dec. ${Number(d.dec).toFixed(3)}°` +
              (d.exposure != null ? `<br/>Exp ${Number(d.exposure).toFixed(2)} hr` : '') +
              (d.sigma != null ? `<br/>S/N ${d.sigma}` : '')
          )
          .style('visibility', 'visible')
          .style('left', `${event.clientX - (bounds?.left ?? 0) + 12}px`)
          .style('top', `${event.clientY - (bounds?.top ?? 0) - 8}px`);
      })
      .on('mouseleave', function (this: SVGCircleElement) {
        d3.select(this).attr('r', 4).attr('fill-opacity', 0.75);
        tooltip.style('visibility', 'hidden');
      });

    return () => {
      tooltip.remove();
    };
  }, [data, height, width]);

  return (
    <div ref={hostRef} style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={svgRef}
        className="sky-plot"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="All-sky Aitoff projection of observed 7DT fields"
      />
    </div>
  );
};

export default ScatterGeoPlot;
