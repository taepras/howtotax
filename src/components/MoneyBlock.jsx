import React, { useRef, useEffect, useLayoutEffect, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
// import { transition } from 'd3';
import useDimensions from "react-cool-dimensions";
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { transition } from 'd3';
import { useNetIncome } from '../utils/TaxCalculation';
import ScaleReference from './ScaleReference';

import { taxBrackets } from '../data/TaxBrackets';
import { theme } from '../theme';


// const transitionDuration = 1000

export const MoneyBlock = ({
    amount,
    offset,
    scale,
    barWidth,
    fill,
    label,
    isBlink,
    enableTransition = true,
    transitionTime = 500,
    stroke,
}) => {
    const transitionDuration = useMemo(() => enableTransition ? transitionTime : 0, [enableTransition, transitionTime]);

    const moneyBlockRef = useRef(null);

    useLayoutEffect(() => {
        if (moneyBlockRef.current) {

            const g = d3.select(moneyBlockRef.current);

            g.transition().duration(transitionDuration)
                .attr('transform', `translate(0, ${scale(offset)})`);

            g.select('rect.block')
                .attr('width', barWidth)
                .style('animation', isBlink ? 'blink-from-full 1s infinite' : 'none')
                .transition().duration(transitionDuration)
                .style('fill', fill)
                // .attr('y', scale(offset))
                .attr('height', Math.max(0, scale(amount)));

            g.select('text.label')
                .text(label)
                .transition().duration(transitionDuration)
                .attr('x', barWidth / 2)
                .attr('y', -scale(amount / 2))
                .attr('opacity', amount > 0 ? 1 : 0)
        }
    }, [
        amount,
        offset,
        scale,
        barWidth,
        fill,
        label,
        isBlink,
        transitionDuration,
        moneyBlockRef
    ]);

    return (<>
        <g ref={moneyBlockRef}>
            <rect
                className="block"
                width={barWidth}
                fill={fill}
                stroke={theme.colors.text}
                stroke-opacity={stroke ? 0.6 : 0}
                stroke-dasharray="3, 3"
                data-amount={amount}
                data-offset={offset}
            />
            <text className="label" style={{
                fill: theme.colors.text,
                fontSize: '0.75rem',
                alignmentBaseline: 'middle',
                textAnchor: 'middle',
                fillOpacity: 0.6
            }}>{label}</text>
        </g>
    </>);
}