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

export const TaxBracketDisplay = ({
    barWidth,
    scaleIncome,
    scaleTaxRate,
    showTax,
    blinkTax,
    netIncome,
    // netIncomeMask,
    enableTransition = true,
    active = false,
    transitionTime = 500,
    isPullTax = false,
    setPullTax = () => {},
}) => {
    const transitionDuration = useMemo(() => enableTransition ? transitionTime : 0, [enableTransition, transitionTime]);

    const taxBracketRef = useRef(null);
    const taxMaskRef = useRef(null);

    const generateTaxBracketsPathD = useCallback(x => {
        let pathD = 'M 0 0 ';
        pathD += taxBrackets.map((d) => {
            return ''
                + `L ${scaleTaxRate(d.taxRate)} ${scaleIncome(d.minNetIncome)} `
                + `L ${scaleTaxRate(d.taxRate)} ${scaleIncome(d.maxNetIncome)} `
        }).join('')
        pathD += `L 0 ${scaleIncome(taxBrackets[taxBrackets.length - 1].maxNetIncome)} `
        pathD += `Z`
        return pathD;
    }, [scaleIncome, scaleTaxRate]);

    useLayoutEffect(() => {
        if (taxBracketRef.current && taxMaskRef.current) {

            const g = d3.select(taxBracketRef.current);
            const mask = d3.select(taxMaskRef.current);

            mask.attr('width', barWidth)
                .transition().duration(transitionDuration)
                // .style('fill', '#08f')
                .attr('height', Math.max(0, scaleIncome(netIncome)));

            g.select('path.tax-stairs-camouflage')
                .attr('fill', theme.colors.bg)
                .transition().duration(transitionDuration)
                .attr('opacity', showTax ? 1 : 0)
                .attr('d', generateTaxBracketsPathD)

            g.select('path.tax-stairs')
                .attr('fill', theme.colors.tax)
                .style('animation', showTax && blinkTax ? 'blink-from-none 1s infinite' : 'none')
                .transition().duration(transitionDuration)
                .attr('d', generateTaxBracketsPathD)
                .attr('transform', isPullTax ? `translate(${-50}, 0)` : 'translate(0, 0)')
                .style('opacity', showTax && !isPullTax ? 1 : 0)

            const bracketLineGroups = g.select('g.tax-lines')
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
                .style('stroke', theme.colors.tax)
                .style("stroke-dasharray", "3, 3")
                .transition().duration(transitionDuration)
                .attr('y', d => scaleIncome(d.minNetIncome))
                .attr('height', d => scaleIncome(d.maxNetIncome - d.minNetIncome))
                .attr('opacity', active ? 1 : 0)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('line')
                .attr('x1', 0)
                .attr('x2', barWidth)
                .style('stroke', theme.colors.tax)
                .style("stroke-dasharray", "3, 3")
                .transition().duration(transitionDuration)
                // .style('stroke-opacity', '0.4')
                .attr('y1', d => Math.round(scaleIncome(d.maxNetIncome)))
                .attr('y2', d => Math.round(scaleIncome(d.maxNetIncome)))
                .attr('opacity', active ? 1 : 0)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-rate-text')
                .style('fill', theme.colors.text)
                .style('font-size', '0.75rem')
                .style('text-anchor', 'end')
                .attr('x', barWidth - 5)
                .transition().duration(transitionDuration)
                .text(d => `เริ่มคิดที่ ${d.minNetIncome.toLocaleString()} บาท`)
                .style('fill-opacity', (d, i) => i != 0 && scaleIncome(d.maxNetIncome - d.minNetIncome) > 20 ? 1 : 0)
                .attr('y', d => -scaleIncome(d.minNetIncome) - 5)
                .attr('opacity', active ? 1 : 0)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-min-text')
                .style('fill', theme.colors.text)
                .style('font-size', '0.75rem')
                .attr('x', d => scaleTaxRate(d.taxRate) + 5)
                .transition().duration(transitionDuration)
                .text(d => `ภาษี ${d.taxRate * 100}%`)
                // .text(d => scaleIncome(d.maxNetIncome - d.minNetIncome) > 150
                //     ? `เริ่มคิดที่ ${numberWithCommas(d.minNetIncome)} บาท`
                //     : `${d.taxRate * 100}%`)
                .style('fill-opacity', (d, i) => i != 0 && scaleIncome(d.maxNetIncome - d.minNetIncome) > 20 ? 1 : 0)
                .attr('y', d => -scaleIncome(d.minNetIncome) - 5)
                .attr('opacity', active ? 1 : 0)
        }
    }, [
        taxBracketRef,
        taxMaskRef,
        netIncome,
        scaleTaxRate,
        scaleIncome,
        active,
        showTax,
        blinkTax,
        barWidth,
        generateTaxBracketsPathD,
        isPullTax,
        transitionDuration
    ]);

    return (<>
        <defs>
            <clipPath id="net-income-mask">
                <rect className="net-income-mask" ref={taxMaskRef}/>
            </clipPath>
        </defs>
        <g id="tax-brackets" ref={taxBracketRef}>
            <g className="tax-lines" />
            <path className="tax-stairs-camouflage" clipPath={`url(#net-income-mask)`} onClick={() => setPullTax(false)} />
            <path className="tax-stairs" clipPath={`url(#net-income-mask)`} onClick={() => setPullTax(!isPullTax)} />
        </g>
    </>);
}