import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

/* Component */
export const D3Component = ({
    income,
    expense,
    allowance
}) => {
    const d3Container = useRef(null);

    const amountPerBox = 10000

    const d3Data = useMemo(() => {
        let arr = d3.range(income / amountPerBox);
        return arr.map((x, i) => Math.min(income - (amountPerBox * i), amountPerBox))
    }, [income]);

    useEffect(
        () => {
            // console.log('!!!', income, expense, allowance, d3Container.current)
            if (d3Data && d3Container.current) {
                const svg = d3.select(d3Container.current);

                var squareDim = 10; // pixel dimensions of square
                var boxesPerRow = 15;

                const boxesGroups = svg
                    .selectAll('g.box')
                    .data(d3Data, (d, i) => i)

                const boxesGroupsEnter = boxesGroups
                    .enter()
                    .append('g')
                    .classed('box', true)
                    .attr('id', (d, i) => `box-${i}`)
                    .attr('transform', (d, i) => {
                        let x = Math.floor(i / boxesPerRow) * (squareDim + 2);
                        let y = Math.floor(i % boxesPerRow) * (squareDim + 2);
                        return `translate(${x}, ${y})`;
                    });

                boxesGroupsEnter
                    .append('rect')
                    .classed('box-rect', true)
                    .style('fill', '#c62828')

                boxesGroups.merge(boxesGroupsEnter)
                    .attr('data-box-amount', d => d)
                
                boxesGroups.merge(boxesGroupsEnter)
                    .select('rect.box-rect')
                    .attr('data-box-amount', d => d)
                    .attr('width', squareDim)
                    .attr('height', d => squareDim * (d / amountPerBox))

                console.log(d3Data)
                boxesGroups.exit().remove();
                // boxGroups.exit().remove();
            }
        }, [d3Container, d3Data])

    return (
        <svg
            className="d3-component"
            width={800}
            height={600}
            ref={d3Container}
        />
    );
}