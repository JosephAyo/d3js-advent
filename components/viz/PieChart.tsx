'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  label: string;
  value: number;
}

interface PieChartProps {
  data: DataPoint[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    // Background for contrast
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#ffffff');

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<DataPoint>()
      .value(d => d.value);

    const path = d3.arc<d3.PieArcDatum<DataPoint>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3.arc<d3.PieArcDatum<DataPoint>>()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path as any)
      .attr('fill', d => color(d.data.label) as string)
      .attr('stroke', '#ffffff')
      .style('stroke-width', '2px');

  }, [data]);

  // Generate colors for legend
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} className="w-full h-auto border border-gray-200 rounded shadow-sm mb-4" style={{ backgroundColor: '#ffffff' }} />
      
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: colorScale(d.label) as string }}
            />
            <span className="text-sm font-medium text-black dark:text-white">
              {d.label}: {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
