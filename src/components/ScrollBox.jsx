import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { transparentize } from 'polished';

const FadeTop = styled.div`
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 50px;
    background: linear-gradient(to bottom, ${theme.colors.bg}, ${transparentize(1, theme.colors.bg)});
    pointer-events: none;
    z-index: 1;

    transition: all 0.2s;
    opacity: ${props => props.active ? 1 : 0};
`

const FadeBottom = styled.div`
    position: absolute;
    bottom: -2px;
    left: -2px;
    right: -2px;
    height: 50px;
    background: linear-gradient(to top, ${theme.colors.bg}, ${transparentize(1, theme.colors.bg)});
    pointer-events: none;
    z-index: 1;

    transition: all 0.2s;
    opacity: ${props => props.active ? 1 : 0};
`

const ScrollBoxContainer = styled.div`
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
`

const StyledScrollBox = styled.div`
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
`

const ScrollBox = ({ children, onScroll, ...props }) => {
    const scrollBoxRef = useRef(null);
    const [showTopFade, setShowTopFade] = useState(true);
    const [showBottomFade, setShowBottomFade] = useState(true);

    const handleScroll = useCallback((e) => {
        if (scrollBoxRef.current) {
            setShowTopFade(scrollBoxRef.current.scrollTop > 0);
            setShowBottomFade(scrollBoxRef.current.offsetHeight + scrollBoxRef.current.scrollTop < scrollBoxRef.current.scrollHeight);
        }
    }, [scrollBoxRef]);

    useEffect(() => {
        if (scrollBoxRef.current) {
            console.log('registering handleScroll', handleScroll);
            scrollBoxRef.current.addEventListener('scroll', (e) => {
                onScroll(e);
                handleScroll(e);
            });
            return () => {
                if (scrollBoxRef.current)
                    scrollBoxRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [scrollBoxRef, handleScroll])

    useEffect(handleScroll, [scrollBoxRef]);

    return (
        <>
            <StyledScrollBox ref={scrollBoxRef} {...props}>
                {children}
            </StyledScrollBox>
            <FadeTop active={showTopFade} />
            <FadeBottom active={showBottomFade} />
        </>
    );
}

export default ScrollBox;

