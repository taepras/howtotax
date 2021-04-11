import React, { useMemo } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'

const StoryIndicatorContainer = styled.div`
    display: flex;
    gap: 4px;
`

const StoryIndicatorItem = styled.div`
    height: 2px;
    flex-grow: 1;
    border-radius: 999;
    background-color: #fff;
    transition: opacity 0.2s;
    opacity: ${props => props.active ? 1 : 0.2};
`

const StoryIndicator = ({ currentStep = 0, totalSteps = 0, ...props }) => {
    const steps = useMemo(() => d3.range(totalSteps), [totalSteps]);

    return (
        <>
            <StoryIndicatorContainer {...props}>
                {steps.map((d, i) => (
                    <StoryIndicatorItem active={i <= currentStep} />
                ))}
            </StoryIndicatorContainer>
        </>
    )
}

export default StoryIndicator;