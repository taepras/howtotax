import styled from 'styled-components';
import ReactSlider from 'react-slider';
import { useState } from 'react';
import { darken, lighten } from 'polished';

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 20px;
`;

const StyledThumb = styled.div`
    height: 20px;
    line-height: 20px;
    width: 20px;
    text-align: center;
    background-color: ${props => props.color || '#08f'};
    /* border: 2px ${props =>  darken(0.1, props.color || '#08f')} solid; */
    box-sizing: border-box;
    color: #fff;
    border-radius: 12px;
    cursor: grab;
    position: relative;
`;

const StyledTrack = styled.div`
    top: 6px;
    bottom: 6px;
    background: ${props => props.index === 1 ? '#fff3' : darken(0.15, props.color || '#08f')};
    border-radius: 999px;
`;

const Tooltip = styled.div`
    opacity: ${props => props.visible ? 1 : 0};
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000d;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 0.75rem;
    pointer-events: none;
`;

const Slider = ({ onBeforeChange = () => { }, onAfterChange = () => { }, color, ...props }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return <StyledSlider
        renderTrack={(props, state) => <StyledTrack {...props} index={state.index} color={color}/>}
        renderThumb={(props, state) => <StyledThumb {...props} color={color}>
            <Tooltip visible={showTooltip}>{state.valueNow.toLocaleString()}</Tooltip>
        </StyledThumb>}
        onBeforeChange={(x) => {
            setShowTooltip(true)
            onBeforeChange(x);
        }}
        onAfterChange={(x) => {
            setShowTooltip(false)
            onAfterChange(x);
        }}
        {...props}
    />
}

export default Slider;