import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
// import { transition } from 'd3';

const transitionDuration = 1000

export const D3Component = ({
    income,
    expense,
    allowance,
    taxBrackets,
    width = 800,
    height = 500,
    padding = 50,
}) => {
    const d3Container = useRef(null);

    const cleanedExpense = useMemo(() => expense < (income - allowance) ? +expense : +Math.max(0, income - allowance), [income, expense]);
    const cleanedAllowance = useMemo(() => allowance < income ? +allowance : +income, [income, allowance]);

    const netIncome = useMemo(() => {
        return Math.max(income - expense - allowance, 0);
    }, [income, expense, allowance]);

    const scaleIncome = useCallback(
        d3.scaleLinear()
            .domain([0, Math.max(300_000, income * 1.5)])
            .range([0, width])
        , [income])

    const barHeight = useMemo(() => height - 50 - padding * 2, [height, padding]);

    const scaleTaxRate = useCallback(
        d3.scaleLinear()
            .domain([1, 0])
            .range([0, barHeight])
        , [income])

    const axisIncomeBottom = useMemo(() => d3.axisBottom(scaleIncome), [scaleIncome]);
    const axisIncomeTop = useMemo(() => d3.axisTop(scaleIncome), [scaleIncome]);
    const axisTaxRate = useMemo(() => d3.axisLeft(scaleTaxRate).tickFormat(d3.format('.0%'))
        , [scaleTaxRate]);

    const [isPullTax, setPullTax] = useState(false);

    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    useEffect(() => {
        if (d3Container.current) {

            const svg = d3.select(d3Container.current);

            svg.select('g.container')
                .attr('transform', `translate(${padding}, ${padding})`);

            svg.select('rect.net-income')
                .attr('height', barHeight)
                .transition().duration(transitionDuration)
                .style('fill', '#08f')
                .attr('width', Math.max(0, scaleIncome(netIncome)));

            console.log('netIncome + cleanedAllowance', netIncome + cleanedAllowance, cleanedAllowance, scaleIncome(cleanedAllowance))
            svg.select('rect.expense')
                .attr('height', barHeight)
                .transition().duration(transitionDuration)
                .style('fill', '#135')
                .attr('x', scaleIncome(netIncome + cleanedAllowance))
                .attr('width', Math.max(0, scaleIncome(cleanedExpense)));

            svg.select('rect.allowance')
                .attr('height', barHeight)
                .transition().duration(transitionDuration)
                .style('fill', '#147')
                .attr('x', scaleIncome(netIncome))
                .attr('width', Math.max(0, scaleIncome(cleanedAllowance)));

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

            // bracketTextEnter
            //     .append('text')
            //     .text(d => `อัตราภาษี ${d.taxRate * 100}%\nเริ่มที่เงินได้ ${d.minNetIncome}`)
            // bracketTextEnter
            //     .append('text')
            //     .text(d => `อัตราภาษี ${d.taxRate * 100}%\nเริ่มที่เงินได้ ${d.minNetIncome}`)

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('rect')
                .attr('y', d => scaleTaxRate(d.taxRate))
                .attr('height', d => scaleTaxRate(1 - d.taxRate))
                .style('fill-opacity', 0)
                .style('stroke', '#f80')
                .transition().duration(transitionDuration)
                .attr('x', d => scaleIncome(d.minNetIncome))
                .attr('width', d => scaleIncome(d.maxNetIncome - d.minNetIncome))

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('line')
                .attr('y1', 0)
                .attr('y2', barHeight)
                .style('stroke', '#f80')
                .style("stroke-dasharray", "3, 3")
                .transition().duration(transitionDuration)
                // .style('stroke-opacity', '0.4')
                .attr('x1', d => scaleIncome(d.maxNetIncome))
                .attr('x2', d => scaleIncome(d.maxNetIncome))

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-rate-text')
                .style('fill', '#f80')
                .attr('y', -30)
                .transition().duration(transitionDuration)
                .text(d => `อัตราภาษี ${d.taxRate * 100}%`)
                .style('fill-opacity', d => scaleIncome(d.maxNetIncome - d.minNetIncome) > 150 ? 1 : 0)
                .attr('x', d => scaleIncome(d.minNetIncome))

            bracketLineGroups.merge(bracketLineGroupsEnter)
                .select('text.bracket-min-text')
                .style('fill', '#f80')
                .attr('y', -10)
                .transition().duration(transitionDuration)
                .text(d => scaleIncome(d.maxNetIncome - d.minNetIncome) > 150
                    ? `เริ่มคิดที่ ${numberWithCommas(d.minNetIncome)} บาท`
                    : `${d.taxRate * 100}%`)
                .style('fill-opacity', d => scaleIncome(d.maxNetIncome - d.minNetIncome) > 50 ? 1 : 0)
                .attr('x', d => scaleIncome(d.minNetIncome))



            const taxParts = svg.select('g.tax-parts')
                .selectAll('rect')
                .data(taxBrackets)

            const taxPartsEnter = taxParts
                .enter()
                .append('rect')
                .style('fill', '#f80')
                .style('fill-opacity', 1)

            taxParts.merge(taxPartsEnter)
                .attr('y', d => scaleTaxRate(d.taxRate))
                .attr('height', d => barHeight * d.taxRate)
                .transition().duration(transitionDuration)
                .attr('x', d => scaleIncome(d.minNetIncome))
                .attr('width', d => {
                    if (netIncome > d.minNetIncome) {
                        if (netIncome < d.maxNetIncome)
                            return scaleIncome(netIncome - d.minNetIncome)
                        else
                            return scaleIncome(d.maxNetIncome - d.minNetIncome);
                    } else {
                        return 0;
                    }
                })

            console.log(isPullTax);
            svg.select('g.tax-parts')
                .transition()
                .attr('transform', isPullTax ? `translate(0, ${padding + 20})` : 'translate(0, 0)');


            const taxCamouflageParts = svg.select('g.tax-camouflage')
                .selectAll('rect')
                .data(taxBrackets)

            const taxCamouflagePartsEnter = taxCamouflageParts
                .enter()
                .append('rect')
                .style('fill', '#222')
                .style('stroke', '#222')
                .style('fill-opacity', 1)

            taxCamouflageParts.merge(taxCamouflagePartsEnter)
                .attr('y', d => scaleTaxRate(d.taxRate))
                .attr('height', d => scaleTaxRate(1 - d.taxRate))
                .transition().duration(transitionDuration)
                .attr('x', d => scaleIncome(d.minNetIncome))
                .attr('width', d => {
                    if (netIncome > d.minNetIncome) {
                        if (netIncome < d.maxNetIncome)
                            return scaleIncome(netIncome - d.minNetIncome)
                        else
                            return scaleIncome(d.maxNetIncome - d.minNetIncome);
                    } else {
                        return 0;
                    }
                })


            // AXES

            d3.select("g.axis-income-bottom")
                .attr("transform", `translate(0, ${barHeight})`)
                .transition().duration(transitionDuration)
                .call(axisIncomeBottom);

            // d3.select("g.axis-income-top")
            //     .attr("transform", `translate(0, -10)`)
            //     .transition().duration(transitionDuration)
            //     .call(axisIncomeTop);

            d3.select("g.axis-tax-rate")
                // .attr("transform", `translate(-10, 0)`)
                .transition().duration(transitionDuration)
                .call(axisTaxRate);

            // var squareDim = 10; // pixel dimensions of square
            // var boxesPerRow = 15;

            // const boxesGroups = svg
            //     .selectAll('g.box')
            //     .data(d3Data, (d, i) => i)

            // const boxesGroupsEnter = boxesGroups
            //     .enter()
            //     .append('g')
            //     .classed('box', true)
            //     .attr('id', (d, i) => `box-${i}`)
            //     .attr('transform', (d, i) => {
            //         let x = Math.floor(i / boxesPerRow) * (squareDim + 2);
            //         let y = Math.floor(i % boxesPerRow) * (squareDim + 2);
            //         return `translate(${x}, ${y})`;
            //     });

            // boxesGroupsEnter
            //     .append('rect')
            //     .classed('box-rect', true)
            //     .style('fill', '#c62828')

            // boxesGroups.merge(boxesGroupsEnter)
            //     .attr('data-box-amount', d => d)

            // boxesGroups.merge(boxesGroupsEnter)
            //     .select('rect.box-rect')
            //     .attr('data-box-amount', d => d)
            //     .attr('width', squareDim)
            //     .attr('height', d => squareDim * (d / amountPerBox))

            // console.log(d3Data)
            // boxesGroups.exit().remove();
            // boxGroups.exit().remove();
        }
    }, [
        d3Container,
        isPullTax,
        barHeight,
        scaleIncome,
        netIncome,
        income,
        expense,
        allowance,
        taxBrackets,
        height,
        padding,
        axisIncomeTop,
        axisIncomeBottom,
        axisTaxRate,
        cleanedAllowance,
        cleanedExpense,
        scaleTaxRate
    ]);

    return (<>
        <svg
            className="d3-component"
            width={width}
            height={height}
            ref={d3Container}
        >
            <g className="container">
                <rect className="net-income" />
                <rect className="expense" />
                <rect className="allowance" />
                <g className="tax-lines" />
                <g className="tax-camouflage" />
                <g className="axis-income-top" />
                <g className="axis-income-bottom" />
                <g className="axis-tax-rate" />
                <g className="tax-parts" />
            </g>
        </svg>
        <p>{netIncome}</p>
        <button onClick={() => setPullTax(!isPullTax)}>Tax</button>
    </>);
}