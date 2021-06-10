import React, {
  useRef, useEffect, useLayoutEffect, useMemo, useCallback, useState,
} from 'react';
import * as d3 from 'd3';
// import { transition } from 'd3';
import useDimensions from 'react-cool-dimensions';
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
  id = 0,
}) => {
  const transitionDuration = useMemo(
    () => (enableTransition ? transitionTime : 0),
    [enableTransition, transitionTime],
  );

  const moneyBlockRef = useRef(null);
  const patternRef = useRef(null);
  const strokeWidth = 1;

  const fadeOp = useMemo(() => (outlined ? 0.3 : 1), [outlined]);

  useLayoutEffect(() => {
    if (moneyBlockRef.current) {
      const g = d3.select(moneyBlockRef.current);

      g.transition().duration(transitionDuration)
        .attr('transform', `translate(0, ${scale(offset)})`);

      g.select('rect.block')
        .attr('width', barWidth)
        // .style('animation', isBlink ? 'blink-from-full 1s infinite' : 'none')
        .transition()
        .duration(transitionDuration)
        // .style('fill', outlined ? 'transparent' : fill)
        // .attr('y', scale(offset))
        .attr('height', Math.max(0, scale(amount)))
        .attr('fill-opacity', fadeOp);

      g.select('rect.block-outline')
        .attr('width', barWidth - strokeWidth)
        // .style('animation', isBlink ? 'blink-from-full 1s infinite' : 'none')
        .transition()
        .duration(transitionDuration)
        // .attr('y', scale(offset))
        .attr('height', Math.max(0, scale(amount)) - strokeWidth)
        .attr('stroke-opacity', (outlined ? 1 : stroke ? 0.6 : 0) * fadeOp)
        .attr('fill-opacity', fadeOp);

      g.select('text.label')
        .text(label)
        .transition().duration(transitionDuration)
        // .attr('x', barWidth / 2)
        .attr('x', barWidth - 24)
        .style('text-anchor', 'end')
        .attr('y', -scale(amount / 2))
        .attr('opacity', amount > 0 ? (1 * fadeOp) : 0);
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
    moneyBlockRef,
    fadeOp,
    outlined,
    stroke,
  ]);

  const sizeOf1000 = useMemo(() => {
    const areaTotal = barWidth * scale(amount);
    const valueTotal = amount;
    const bankNoteAspectRatio = 2.25;

    const bankNoteArea = valueTotal === 0 ? 0 : (1000 * areaTotal) / valueTotal;
    const h = Math.sqrt(bankNoteArea / bankNoteAspectRatio);
    return {
      area: bankNoteArea,
      width: h * bankNoteAspectRatio,
      height: h,
    };
  }, [amount, barWidth, scale]);

  useEffect(() => {
    if (patternRef.current) {
      const pattern = d3.select(patternRef.current);

      console.log(sizeOf1000, barWidth, amount);
      pattern.transition().duration(500)
        .attr('width', (sizeOf1000.width ?? 0) / barWidth)// Math.sqrt(rectSide.ref / 1000))
        .attr('height', (sizeOf1000.height ?? 0) / (amount === 0 ? 1 : scale(amount)))// Math.sqrt(rectSide.ref / 1000))
        .attr('x', 0)
        .attr('y', 0);

      pattern.select('image')
        .transition().duration(500)
        .attr('width', sizeOf1000.width)
        .attr('height', sizeOf1000.height)
        .attr('y', -sizeOf1000.height);

      pattern.select('rect.color-overlay')
        .transition().duration(500)
        .attr('fill-opacity', outlined ? 0 : 0.7);
    }
  }, [patternRef, sizeOf1000, barWidth, scale, amount, outlined]);

  return (
    <>
      <g ref={moneyBlockRef}>
        <defs>
          <pattern
            ref={patternRef}
            id={`bank1000-${id}`}
            x="0"
            y="0"
            // width={sizeOf1000.width / barWidth}
            // height={sizeOf1000.height / scale(amount)}
          >
            <image
              href={`${process.env.PUBLIC_URL}/bank1000.png`}
              // width={sizeOf1000.width}
              // height={sizeOf1000.height}
              transform="scale(1, -1)"
              // y={-sizeOf1000.height}
            />
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              stroke={theme.colors.bg}
              strokeWidth={3}
            />
            <rect
              className="color-overlay"
              width="100%"
              height="100%"
              fill={fill}
              // fill="transparent"
              // fillOpacity={outlined ? 0 : 0.7}
            />
          </pattern>
        </defs>
        <rect
          className="block"
          width={barWidth}
          fill={`url(#bank1000-${id})`}
          // fill={outlined ? 'transparent' : fill}
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
          // fill={outlined ? 'transparent' : fill}
          fill={outlined ? 'transparent' : `url(#bank1000-${id})`}
          stroke={outlined ? fill : theme.colors.white}
          strokeWidth={strokeWidth}
          // strokeOpacity={(outlined ? 1 : stroke ? 0.6 : 0) * fadeOp}
          strokeDasharray="5, 3"
          data-amount={amount}
          data-offset={offset}
        />
        <text
          className="label"
          style={{
            fill: outlined ? fill : theme.colors.white,
            fontSize: '0.875rem',
            alignmentBaseline: 'middle',
            textAnchor: 'middle',
            paintOrder: 'stroke fill',
            stroke: outlined ? theme.colors.bg : '#000',
            strokeWidth: 4,
            strokeLinejoin: 'round',
          }}
        >
          {label}
        </text>
      </g>
    </>
  );
};

export default MoneyBlock;
