import React, {
  useState, useEffect, useMemo, useRef,
} from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { theme } from '../theme';

const ScaleReference = ({
  scale, barWidth, x, y, maxSize = 30, aspectRatio = 2.25, ...props
}) => {
  const textRef = useRef(null);
  const squareRef = useRef(null);
  const patternRef = useRef(null);

  const [textWidth, setTextWidth] = useState(0);

  const rectSide = useMemo(() => {
    let ref = 1;
    let side = Math.sqrt(scale(ref) * barWidth);
    let nextSide = Math.sqrt(scale(ref * 10) * barWidth);
    while (nextSide < maxSize) {
      side = nextSide;
      ref *= 10;
      nextSide = Math.sqrt(scale(ref * 10) * barWidth);
    }

    return {
      area: side * side,
      height: side * Math.sqrt(1 / aspectRatio),
      width: side * Math.sqrt(aspectRatio),
      ref,
    };
  }, [scale, barWidth, maxSize, aspectRatio]);

  const sizeOf1000 = useMemo(() => {
    const bankNoteArea = barWidth * scale(1000);
    const h = Math.sqrt(bankNoteArea / aspectRatio);
    return {
      area: bankNoteArea,
      width: h * aspectRatio,
      height: h,
    };
  }, [aspectRatio, barWidth, scale]);

  const text = useMemo(() => `= ${rectSide.ref.toLocaleString()} บาท`, [rectSide]);

  useEffect(() => {
    if (squareRef.current) {
      d3.select(squareRef.current)
        .transition().duration(500)
        .attr('width', rectSide.width)
        .attr('height', rectSide.height)
        .attr('x', -rectSide.width - textWidth - 10)
        .attr('y', -rectSide.height / 2);
    }
  }, [squareRef, rectSide, textWidth]);

  useEffect(() => {
    if (patternRef.current) {
      const pattern = d3.select(patternRef.current);

      pattern.transition().duration(500)
        .attr('width', sizeOf1000.width / rectSide.width)// Math.sqrt(rectSide.ref / 1000))
        .attr('height', sizeOf1000.height / rectSide.height)// Math.sqrt(rectSide.ref / 1000))
        .attr('x', 0)
        .attr('y', 0);

      pattern.select('image')
        .attr('width', sizeOf1000.width)
        .attr('height', sizeOf1000.height)
        .attr('y', -sizeOf1000.height);
    }
  }, [patternRef, sizeOf1000, rectSide]);

  useEffect(() => {
    setTextWidth(textRef.current ? textRef.current.getBBox().width : 80);
  }, [textRef, text]);

  return (
    <g transform={`translate(${x}, ${y}) scale(1, -1)`}>
      <defs>
        <pattern
          id="bank1000-ref"
          x="0"
          y="0"
          width={sizeOf1000.width / rectSide.width}
          height="1"
          ref={patternRef}
        >
          <image
            href={`${process.env.PUBLIC_URL}/bank1000.png`}
            width={sizeOf1000.width}
            height={sizeOf1000.height}
            y={-sizeOf1000.height}
            transform="scale(1, -1)"
          />
          <rect
            width={sizeOf1000.width}
            height={sizeOf1000.height}
            fill="transparent"
            stroke={theme.colors.bg}
            fillOpacity={0.5}
          />
        </pattern>
      </defs>
      <rect fill="url(#bank1000-ref)" ref={squareRef} />
      {/* <rect fill={theme.colors.income} ref={squareRef} /> */}
      <text fill={theme.colors.textMuted} alignmentBaseline="middle" textAnchor="end" x={0} ref={textRef}>
        {text}
      </text>
    </g>
  );
};

export default ScaleReference;
