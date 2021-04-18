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
import { MoneyBlock } from './MoneyBlock';
import { TaxBracketDisplay } from './TaxBracketDisplay';
import { theme } from '../theme';

const SvgContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const CartesianSvg = styled.svg`
    & > g text {
        transform: scale(1, -1);
    }
`

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
        left: 35,
        right: 0,
        top: 0,
        bottom: 30,
    },
    isPullTax = false,
    showBrackets = true,
    isActivateTax = true,
    setPullTax = (x) => { },
    transitionTime = 500,
    enableTransition = true,
    isBlink = {}
}) => {
    const { observe, unobserve, width, height, entry } = useDimensions({
        onResize: ({ observe, unobserve, width, height, entry }) => {
            // Triggered whenever the size of the target is changed...

            unobserve(); // To stop observing the current target element
            observe(); // To re-start observing the current target element
        },
    });

    const transitionDuration = useMemo(() => enableTransition ? transitionTime : 0, [enableTransition, transitionTime]);

    const d3Container = useRef(null);

    const cleanedExpense = useMemo(() => expense < (income - allowance) ? +expense : +Math.max(0, income - allowance), [income, expense]);
    const cleanedAllowance = useMemo(() => Math.min(income, allowance), [income, allowance]);

    const netIncome = useNetIncome(income, expense, allowance);

    const scaleIncome = useCallback(
        d3.scaleLinear()
            .domain([0, Math.max(300_000, income * 1.4)])
            .range([0, height - padding.bottom])
        , [height, income, padding])

    const barWidth = useMemo(() => width - (padding.left + padding.right), [width, padding]);

    const scaleTaxRate = useCallback(
        d3.scaleLinear()
            .domain([0, 1])
            .range([0, barWidth])
        , [income, width])

    const axisIncome = useMemo(() => d3.axisLeft(scaleIncome)
        .tickFormat(d3.format(".3s"))
        , [scaleIncome]);
    const axisTaxRate = useMemo(() => d3.axisBottom(scaleTaxRate).tickFormat(d3.format('.0%'))
        , [scaleTaxRate]);    

    useLayoutEffect(() => {
        if (d3Container.current) {

            const svg = d3.select(d3Container.current);

            svg.select('g.container')
                .attr('transform', `translate(${padding.left}, ${padding.bottom})`);

            svg.select('g.overview')
                .transition().duration(transitionDuration)
                .attr('opacity', showBreakdown ? 0 : 1)

            svg.select('g.breakdown')
                .transition().duration(transitionDuration)
                .attr('opacity', showBreakdown ? 1 : 0)

            // AXES

            d3.select("g.axis-income")
                .attr("transform", `translate(0, 0)`)
                .transition().duration(transitionDuration)
                .call(axisIncome);

            d3.select("g.axis-tax-rate")
                // .attr("transform", `translate(-10, 0)`)
                .transition().duration(transitionDuration)
                .call(axisTaxRate);
        }
    }, [
        d3Container,
        padding,
        axisIncome,
        axisTaxRate,
        showBreakdown,
        transitionDuration,
    ]);

    const sum = x => x.reduce((a, b) => a + b, 0);

    return (<>
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
                            <MoneyBlock amount={netIncome} scale={scaleIncome} offset={0} barWidth={barWidth} fill={theme.colors.income} label='เงินได้สุทธิ' stroke={false} enableTransition={enableTransition} isBlink={isBlink.income}/>
                            <MoneyBlock amount={cleanedExpense} scale={scaleIncome} offset={netIncome + cleanedAllowance} barWidth={barWidth} fill={theme.colors.expense} label='ค่าใช้จ่าย' stroke={false} enableTransition={enableTransition}/>
                            <MoneyBlock amount={cleanedAllowance} scale={scaleIncome} offset={netIncome} barWidth={barWidth} fill={theme.colors.allowance} label='ค่าลดหย่อน' stroke={false} enableTransition={enableTransition}/>
                        </g>
                        <g className="breakdown">
                            {incomeGroups.map((ig, i) => <>
                                <MoneyBlock
                                    amount={ig.income - ig.expense}
                                    scale={scaleIncome}
                                    offset={
                                        isGroupIncome
                                            ? sum(incomeGroups.slice(0, i).map(x => x.income - x.expense))
                                            : sum(incomeGroups.slice(0, i).map(x => x.income))
                                    }
                                    barWidth={barWidth}
                                    fill={theme.colors.income}
                                    label={ig.label}
                                    stroke={true} />
                                <MoneyBlock
                                    amount={ig.expense}
                                    scale={scaleIncome}
                                    offset={
                                        isGroupIncome
                                            ? sum(incomeGroups.map(x => x.income - x.expense)) + sum(incomeGroups.slice(0, i).map(x => x.expense))
                                            : sum(incomeGroups.slice(0, i).map(x => x.income)) + (ig.income - +ig.expense)
                                    }
                                    barWidth={barWidth}
                                    fill={theme.colors.expense}
                                    label={'ค่าใช้จ่าย คิดจาก' + ig.label}
                                    stroke={true} />
                            </>)}
                        </g>

                        <TaxBracketDisplay 
                            barWidth={barWidth}
                            scaleIncome={scaleIncome}
                            scaleTaxRate={scaleTaxRate}
                            showTax={isActivateTax}
                            blinkTax={isBlink.tax}
                            active={showBrackets}
                            netIncome={netIncome}
                        />

                        <g className="axis axis-income" />
                        <g className="axis axis-tax-rate" />
                    </g>
                </g>
                <rect className="fade" fill="url(#fade-grad)" width={width} height={(height - padding.bottom) * 0.25} />
                <ScaleReference scale={scaleIncome} barWidth={barWidth} x={width} y={40 / 2} maxSize={40} />
            </CartesianSvg>
        </SvgContainer>
    </>);
}