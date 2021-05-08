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
    outlined = false,
    enableTransition = true,
    fade = false,
    transitionTime = 500,
    stroke,
}) => {
    const transitionDuration = useMemo(() => enableTransition ? transitionTime : 0, [enableTransition, transitionTime]);

    const moneyBlockRef = useRef(null);
    const strokeWidth = 1;

    const fadeOp = useMemo(() => fade ? 0.3 : 1, [fade]);

    useLayoutEffect(() => {
        if (moneyBlockRef.current) {

            const g = d3.select(moneyBlockRef.current);

            g.transition().duration(transitionDuration)
                .attr('transform', `translate(0, ${scale(offset)})`);

            g.select('rect.block')
                .attr('width', barWidth)
                .style('animation', isBlink ? 'blink-from-full 1s infinite' : 'none')
                .transition().duration(transitionDuration)
                .style('fill', outlined ? 'transparent' : fill)
                // .attr('y', scale(offset))
                .attr('height', Math.max(0, scale(amount)))
                .attr('opacity', fadeOp);

            
            g.select('rect.block-outline')
                .attr('width', barWidth - strokeWidth)
                .style('animation', isBlink ? 'blink-from-full 1s infinite' : 'none')
                .transition().duration(transitionDuration)
                // .attr('y', scale(offset))
                .attr('height', Math.max(0, scale(amount)) - strokeWidth)
                .attr('stroke-opacity', (outlined ? 1 : stroke ? 0.6 : 0) * fadeOp);


            g.select('text.label')
                .text(label)
                .transition().duration(transitionDuration)
                // .attr('x', barWidth / 2)
                .attr('x', barWidth - 24)
                .style('text-anchor', 'end')
                .attr('y', -scale(amount / 2))
                .attr('opacity', amount > 0 ? ((outlined ? 1 : 0.7) * fadeOp) : 0)
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
                fill={outlined ? 'transparent' : fill}
                // opacity={fadeOp}
                // stroke={outlined ? fill : theme.colors.text}
                // stroke-opacity={outlined ? 1 : stroke ? 0.6 : 0}
                // strokeWidth={strokeWidth}
                // stroke-dasharray="5, 5"
                data-amount={amount}
                data-offset={offset}
            />
            <rect
                className="block-outline"
                width={barWidth - strokeWidth}
                x={strokeWidth / 2}
                y={strokeWidth / 2}
                fill={outlined ? 'transparent' : fill}
                stroke={outlined ? fill : theme.colors.text}
                strokeWidth={strokeWidth}
                // strokeOpacity={(outlined ? 1 : stroke ? 0.6 : 0) * fadeOp}

                stroke-dasharray="5, 3"
                data-amount={amount}
                data-offset={offset}
            />
            <text className="label" style={{
                fill: outlined ? fill : theme.colors.text,
                fontSize: '0.75rem',
                alignmentBaseline: 'middle',
                textAnchor: 'middle',
                // fillOpacity: (outlined ? 1 : 0.6) * fadeOp
            }}>{label}</text>
        </g>
    </>);
}