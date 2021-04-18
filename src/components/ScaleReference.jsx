import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'
import { numberWithCommas } from '../utils/display';

const ScaleReference = ({ scale, barWidth, x, y, maxSize = 30,...props }) => {

    const textRef = useRef(null);
    const squareRef = useRef(null);

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
        return { side, ref };
    }, [scale, barWidth, maxSize]);

    const text = useMemo(() => `= ${numberWithCommas(rectSide.ref)} บาท`, [rectSide])

    useEffect(() => {
        if (squareRef.current) {
            d3.select(squareRef.current)
                .transition().duration(500)
                .attr('width', rectSide.side)
                .attr('height', rectSide.side)
                .attr('x', -rectSide.side - textWidth - 10)
                .attr('y', -rectSide.side / 2);
        }
    }, [squareRef, rectSide, textWidth])
    
    useEffect(() => {
        setTextWidth(textRef.current ? textRef.current.getBBox().width : 80);
    }, [textRef, text])

    return (
        <g transform={`translate(${x}, ${y}) scale(1, -1)`}>
            <rect fill="#666" ref={squareRef} />
            <text fill="#666" alignmentBaseline="middle" textAnchor="end" x={0} ref={textRef}>
                {text}
            </text>
        </g>
    )
}

export default ScaleReference;