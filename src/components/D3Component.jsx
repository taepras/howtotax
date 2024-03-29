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
import { MoneyBlock } from './MoneyBlock';
import { TaxBracketDisplay } from './TaxBracketDisplay';
import { theme } from '../theme';

const SvgContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const CartesianSvg = styled.svg`
    & > g text {
        transform: scale(1, -1);
    }
`;

// const transitionDuration = 1000

export const D3Component = ({
  incomeGroups,
  // incomeGroupLabels,
  // expenseGroups,
  isGroupIncome,
  showBreakdown,

  income,
  expense,
  allowance,
  // taxBrackets,
  padding = {
    left: 64,
    right: 16,
    top: 0,
    bottom: 48,
  },
  isPullTax = false,
  showBrackets = true,
  isActivateTax = true,
  setPullTax = (x) => { },
  enableTransition = true,
  isFocusIncome = true,
  isBlink = {},
  showFullScale = false,
  forceBlinkTax = false,
  showScaleReference = true,
}) => {
  const {
    observe, unobserve, width, height, entry,
  } = useDimensions({
    onResize: ({
      /* eslint-disable-next-line no-shadow */
      observe, unobserve, w, h, entr,
    }) => {
      // Triggered whenever the size of the target is changed...

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
  });

  const transitionDuration = useMemo(
    () => (enableTransition ? theme.transitionTime : 0),
    [enableTransition],
  );

  const d3Container = useRef(null);

  const cleanedExpense = useMemo(
    () => (expense < (income - allowance) ? +expense : +Math.max(0, income - allowance)),
    [income, expense, allowance],
  );
  const cleanedAllowance = useMemo(() => Math.min(income, allowance), [income, allowance]);

  const netIncome = useNetIncome(income, expense, allowance);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const scaleIncome = useCallback(
    d3.scaleLinear()
      .domain([0, showFullScale ? 6_000_000 : Math.max(300_000, income * 1.4)])
      .range([0, height - padding.bottom]),
    [height, income, padding],
  );

  const barWidth = useMemo(() => width - (padding.left + padding.right), [width, padding]);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const scaleTaxRate = useCallback(
    d3.scaleLinear()
      .domain([0, 1])
      .range([0, barWidth]),
    [income, width],
  );

  const axisIncome = useMemo(() => d3.axisLeft(scaleIncome)
    .tickFormat(d3.format('.3s')),
  [scaleIncome]);
  const axisTaxRate = useMemo(() => d3.axisBottom(scaleTaxRate).tickFormat(d3.format('.0%')).ticks(5).tickSize(-6)
    .tickPadding(12),
  [scaleTaxRate]);

  useLayoutEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);

      svg.select('g.container')
        .attr('transform', `translate(${padding.left}, ${padding.bottom})`);

      svg.select('g.overview')
        .transition().duration(transitionDuration)
        .attr('opacity', showBreakdown ? 0 : 1);

      svg.select('g.breakdown')
        .transition().duration(transitionDuration)
        .attr('opacity', showBreakdown ? 1 : 0);

      // AXES

      d3.select('g.axis-income')
        .attr('transform', 'translate(0, 0)')
        .transition().duration(transitionDuration)
        .call(axisIncome);

      d3.select('g.axis-tax-rate')
        // .attr("transform", `translate(-10, 0)`)
        .transition().duration(transitionDuration)
        .attr('opacity', showBrackets ? 1 : 0)
        .call(axisTaxRate);
    }
  }, [
    d3Container,
    padding,
    axisIncome,
    axisTaxRate,
    showBreakdown,
    transitionDuration,
    showBrackets,
  ]);

  const sum = (x) => x.reduce((a, b) => a + b, 0);

  return (
    <>
      <SvgContainer ref={observe}>
        {/* <Fade /> */}
        <CartesianSvg
          id="chart"
          className="d3-component"
          width={width}
          height={height}
          ref={d3Container}
        >
          <defs>
            <linearGradient id="fade-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: theme.colors.bg, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: theme.colors.bg, stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <g transform={`translate(0, ${height}) scale(1, -1)`}>
            <g className="container">
              <g className="overview">
                <MoneyBlock
                  amount={netIncome}
                  scale={scaleIncome}
                  offset={0}
                  barWidth={barWidth}
                  fill="transparent"
                  label="เงินได้สุทธิ"
                  stroke={false}
                  enableTransition={enableTransition}
                  isBlink={isBlink.income}
                  id="netincome"
                />
                <MoneyBlock
                  amount={cleanedExpense}
                  scale={scaleIncome}
                  offset={netIncome + cleanedAllowance}
                  barWidth={barWidth}
                  fill={isFocusIncome ? theme.colors.expenseText : theme.colors.expense}
                  // fill={theme.colors.expenseText}
                  label="ค่าใช้จ่าย"
                  stroke={false}
                  enableTransition={enableTransition}
                  outlined={isFocusIncome}
                  // fade={isFocusIncome}
                  id="expense"
                />
                <MoneyBlock
                  amount={cleanedAllowance}
                  scale={scaleIncome}
                  offset={netIncome}
                  barWidth={barWidth}
                  fill={isFocusIncome ? theme.colors.allowanceText : theme.colors.allowance}
                  // fill={theme.colors.allowanceText}
                  label="ค่าลดหย่อน"
                  stroke={false}
                  enableTransition={enableTransition}
                  outlined={isFocusIncome}
                  // fade={isFocusIncome}
                  id="allowance"
                />
              </g>
              <g className="breakdown">
                {incomeGroups.map((ig, i) => (
                  <>
                    <MoneyBlock
                      amount={ig.income - ig.expense}
                      scale={scaleIncome}
                      offset={
                        isGroupIncome
                          ? sum(incomeGroups.slice(0, i).map((x) => x.income - x.expense))
                          : sum(incomeGroups.slice(0, i).map((x) => x.income))
                      }
                      barWidth={barWidth}
                      fill="transparent"
                      // fill={theme.colors.income}
                      label={ig.label}
                      stroke
                      id={`profit-x-${i}`}
                    />
                    <MoneyBlock
                      amount={ig.expense}
                      scale={scaleIncome}
                      offset={
                        isGroupIncome
                          ? (
                            sum(incomeGroups.map((x) => x.income - x.expense))
                            + sum(incomeGroups.slice(0, i).map((x) => x.expense))
                          )
                          : (
                            sum(incomeGroups.slice(0, i).map((x) => x.income))
                            + (ig.income - +ig.expense)
                          )
                      }
                      barWidth={barWidth}
                      fill={isFocusIncome ? theme.colors.expenseText : theme.colors.expense}
                      label={`ค่าใช้จ่าย คิดจาก${ig.label}`}
                      stroke
                      outlined={isFocusIncome}
                      id={`expense-x-${i}`}
                    />
                  </>
                ))}
              </g>

              <TaxBracketDisplay
                barWidth={barWidth}
                scaleIncome={scaleIncome}
                scaleTaxRate={scaleTaxRate}
                showTax={isActivateTax}
                blinkTax={isBlink.tax || forceBlinkTax}
                forceBlink={forceBlinkTax}
                active={showBrackets}
                netIncome={netIncome}
              />

              <g className="axis axis-income" />
              <g className="axis axis-tax-rate" />
              <g transform={`translate(${0},${height / 2}) rotate(90)`}>
                <text fill={theme.colors.text} fontSize={14} textAnchor="middle" dominantBaseline="baseline" y={-48}>
                  เงินได้ →
                </text>
              </g>
              <g transform={`translate(${barWidth / 2},${0})`}>
                <text fill={theme.colors.text} fontSize={14} textAnchor="middle" dominantBaseline="hanging" y={24} opacity={showBrackets ? 1 : 0}>
                  อัตราภาษี →
                </text>
              </g>

              <line
                className="axis axis-tax-blank"
                x1={0}
                x2={width - padding.left - padding.right}
                y1={0}
                y2={0}
                stroke={theme.colors.text}
                strokeOpacity={0.4}
              />
            </g>
          </g>
          <rect className="fade" fill="url(#fade-grad)" width={width} height={(height - padding.bottom) * 0.25} />
          {showScaleReference && (
            <ScaleReference
              scale={scaleIncome}
              barWidth={barWidth}
              x={width}
              y={40 / 2}
              maxSize={40}
            />
          )}
        </CartesianSvg>
      </SvgContainer>
    </>
  );
};

export default D3Component;
