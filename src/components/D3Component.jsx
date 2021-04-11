import React, { useRef, useEffect, useLayoutEffect, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
// import { transition } from 'd3';
import useDimensions from "react-cool-dimensions";
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { transition } from 'd3';
import { useNetIncome } from '../utils/TaxCalculation';


const SvgContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const Fade = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20%;
    background: linear-gradient(to bottom, #222, #2220);
`

const CartesianSvg = styled.svg`
    & > g text {
        transform: scale(1, -1);
    }
`

// const transitionDuration = 1000

export const D3Component = ({
    income,
    expense,
    allowance,
    taxBrackets,
    padding = {
        left: 35,
        right: 0,
        top: 0,
        bottom: 30,
    },
    isPullTax = false,
    showBrackets = true,
    isActivateTax = true,
    setPullTax = (x) => {},
    transitionTime = 500,
    enableTransition = true,
    isBlink
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

    const axisIncomeLeft = useMemo(() => d3.axisLeft(scaleIncome)
        .tickFormat(d3.format(".3s"))
        , [scaleIncome]);
    const axisIncomeRight = useMemo(() => d3.axisRight(scaleIncome), [scaleIncome]);
    const axisTaxRate = useMemo(() => d3.axisBottom(scaleTaxRate).tickFormat(d3.format('.0%'))
        , [scaleTaxRate]);

    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    const generateTaxBracketsPathD = d => {
        let pathD = 'M 0 0 ';
        pathD += taxBrackets.map((d) => {
            return ''
                + `L ${scaleTaxRate(d.taxRate)} ${scaleIncome(d.minNetIncome)} `
                + `L ${scaleTaxRate(d.taxRate)} ${scaleIncome(d.maxNetIncome)} `
        }).join('')
        pathD += `L 0 ${scaleIncome(taxBrackets[taxBrackets.length - 1].maxNetIncome)} `
        pathD += `Z`
        return pathD;
    }

    useLayoutEffect(() => {
        if (d3Container.current) {

            const svg = d3.select(d3Container.current);

            svg.select('g.container')
                .attr('transform', `translate(${padding.left}, ${padding.bottom})`);

            svg.select('rect.net-income')
                .attr('width', barWidth)
                .transition().duration(transitionDuration)
                .style('fill', '#08f')
                .attr('height', Math.max(0, scaleIncome(netIncome)));

            svg.select('rect.net-income-mask')
                .attr('width', barWidth)
                .transition().duration(transitionDuration)
                // .style('fill', '#08f')
                .attr('height', Math.max(0, scaleIncome(netIncome)));

            console.log('netIncome + cleanedAllowance', netIncome + cleanedAllowance, cleanedAllowance, scaleIncome(cleanedAllowance))
            svg.select('rect.expense')
                .attr('width', barWidth)
                .transition().duration(transitionDuration)
                .style('fill', '#312b46')
                .attr('y', scaleIncome(netIncome + cleanedAllowance))
                .attr('height', Math.max(0, scaleIncome(cleanedExpense)));

            svg.select('rect.allowance')
                .attr('width', barWidth)
                .attr('data-allowance', allowance)
                .attr('data-callowance', cleanedAllowance)
                .attr('data-sallowance', scaleIncome(cleanedAllowance))
                .transition().duration(transitionDuration)
                .style('fill', '#2a4236')
                .attr('y', scaleIncome(netIncome))
                .attr('height', Math.max(0, scaleIncome(cleanedAllowance)));

            svg.select('text.net-income-text')
                .text(`เงินได้สุทธิ`)// ${numberWithCommas(netIncome)} บาท`)
                .transition().duration(transitionDuration)
                .attr('x', barWidth / 2)
                .attr('y', -scaleIncome(netIncome / 2))
                .attr('opacity', netIncome > 0 ? 1 : 0)

            svg.select('text.net-expense-text')
                .text(`ค่าลดหย่อน`)// ${numberWithCommas(allowance)} บาท`)
                .transition().duration(transitionDuration)
                .attr('x', barWidth / 2)
                .attr('y', -scaleIncome(netIncome + cleanedAllowance / 2))
                .attr('opacity', cleanedAllowance > 0 ? 1 : 0)

            svg.select('text.net-allowance-text')
                .text(`ค่าใช้จ่าย`)// ${numberWithCommas(expense)} บาท`)
                .transition().duration(transitionDuration)
                .attr('x', barWidth / 2)
                .attr('y', -scaleIncome(income - expense / 2))
                .attr('opacity', cleanedExpense > 0 ? 1 : 0)

            svg.select('path.tax-stairs-camouflage')
                .attr('fill', '#222')
                .transition().duration(transitionDuration)
                .attr('opacity', isActivateTax ? 1 : 0)
                .attr('d', generateTaxBracketsPathD)

            svg.select('path.tax-stairs')
                .attr('fill', '#f80')
                .style('animation', isActivateTax && isBlink ? 'blink 1s infinite' : 'none')
                .transition().duration(transitionDuration)
                .attr('d', generateTaxBracketsPathD)
                .attr('transform', isPullTax ? `translate(${-50}, 0)` : 'translate(0, 0)')
                .style('opacity', isActivateTax && !isPullTax ? 1 : 0)

            const bracketLineGroups = svg.select('g.tax-lines')
                .selectAll('g')
                .data(taxBrackets)

            const bracketLineGroupsEnter = bracketLineGroups
                .enter()
                .append('g')
                .classed('bracket', true)

            bracketLineGroupsEnter.append('text').classed('bracket-rate-text', true)
            bracketLineGroupsEnter.append('text').classed('bracket-min-text', true)
            bracketLineGroupsEnter.append('rect').classed('bracket-rect', true)
            bracketLineGroupsEnter.append('line').classed('bracket-line', true)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('rect')
                .attr('x', 0)   // d => scaleTaxRate(d.taxRate))
                .attr('width', d => scaleTaxRate(d.taxRate))
                .style('fill-opacity', 0)
                .style('stroke', '#f80')
                .style("stroke-dasharray", "3, 3")
                .transition().duration(transitionDuration)
                .attr('y', d => scaleIncome(d.minNetIncome))
                .attr('height', d => scaleIncome(d.maxNetIncome - d.minNetIncome))
                .attr('opacity', showBrackets ? 1 : 0)


            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('line')
                .attr('x1', 0)
                .attr('x2', barWidth)
                .style('stroke', '#f80')
                .style("stroke-dasharray", "3, 3")
                .transition().duration(transitionDuration)
                // .style('stroke-opacity', '0.4')
                .attr('y1', d => scaleIncome(d.maxNetIncome))
                .attr('y2', d => scaleIncome(d.maxNetIncome))
                .attr('opacity', showBrackets ? 1 : 0)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-rate-text')
                .style('fill', '#fff')
                .style('font-size', '0.75rem')
                .style('text-anchor', 'end')
                .attr('x', barWidth - 5)
                .transition().duration(transitionDuration)
                .text(d => `เริ่มคิดที่ ${numberWithCommas(d.minNetIncome)} บาท`)
                .style('fill-opacity', (d, i) => i != 0 && scaleIncome(d.maxNetIncome - d.minNetIncome) > 20 ? 1 : 0)
                .attr('y', d => -scaleIncome(d.minNetIncome) - 5)
                .attr('opacity', showBrackets ? 1 : 0)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-min-text')
                .style('fill', '#fff')
                .style('font-size', '0.75rem')
                .attr('x', d => scaleTaxRate(d.taxRate) + 5)
                .transition().duration(transitionDuration)
                .text(d => `ภาษี ${d.taxRate * 100}%`)
                // .text(d => scaleIncome(d.maxNetIncome - d.minNetIncome) > 150
                //     ? `เริ่มคิดที่ ${numberWithCommas(d.minNetIncome)} บาท`
                //     : `${d.taxRate * 100}%`)
                .style('fill-opacity', (d, i) => i != 0 && scaleIncome(d.maxNetIncome - d.minNetIncome) > 20 ? 1 : 0)
                .attr('y', d => -scaleIncome(d.minNetIncome) - 5)
                .attr('opacity', showBrackets ? 1 : 0)

            // AXES

            d3.select("g.axis-income-bottom")
                .attr("transform", `translate(0, 0)`)
                .transition().duration(transitionDuration)
                .call(axisIncomeLeft);

            d3.select("g.axis-tax-rate")
                // .attr("transform", `translate(-10, 0)`)
                .transition().duration(transitionDuration)
                .call(axisTaxRate);
        }
    }, [
        width, height,
        d3Container,
        isPullTax,
        barWidth,
        scaleIncome,
        netIncome,
        income,
        expense,
        allowance,
        taxBrackets,
        padding,
        axisIncomeLeft,
        axisIncomeRight,
        axisTaxRate,
        cleanedAllowance,
        cleanedExpense,
        scaleTaxRate
    ]);

    return (<>
        <SvgContainer ref={observe}>
            <Fade />
            <CartesianSvg
                id="chart"
                className="d3-component"
                width={width}
                height={height}
                ref={d3Container}
            >
                <defs>
                    <clipPath id="net-income-mask">
                        <rect className="net-income-mask" />
                    </clipPath>
                </defs>
                <g transform={`translate(0, ${height}) scale(1, -1)`}>
                    <g className="container">
                        <rect className="net-income" />
                        <rect className="expense" />
                        <rect className="allowance" />
                        <text className="net-income-text" style={{
                            fill: '#fff', fontSize: '0.75rem', alignmentBaseline: 'middle', textAnchor: 'middle', fillOpacity: 0.4
                        }} />
                        <text className="net-expense-text" style={{
                            fill: '#fff', fontSize: '0.75rem', alignmentBaseline: 'middle', textAnchor: 'middle', fillOpacity: 0.4
                        }} />
                        <text className="net-allowance-text" style={{
                            fill: '#fff', fontSize: '0.75rem', alignmentBaseline: 'middle', textAnchor: 'middle', fillOpacity: 0.4
                        }} />
                        <g className="tax-lines" />
                        <g className="axis axis-income-top" />
                        <g className="axis axis-income-bottom" />
                        <g className="axis axis-tax-rate" />
                        <path className="tax-stairs-camouflage" clipPath="url(#net-income-mask)" onClick={() => setPullTax(false)} />
                        <path className="tax-stairs" clipPath="url(#net-income-mask)" onClick={() => setPullTax(!isPullTax)} />
                    </g>
                </g>
            </CartesianSvg>
        </SvgContainer>
    </>);
}