import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FadeTop = styled.div`
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 50px;
    background: linear-gradient(to bottom, #222f, #2220);
    pointer-events: none;

    transition: all 0.2s;
    opacity: ${props => props.active ? 1 : 0};
`

const FadeBottom = styled.div`
    position: absolute;
    bottom: -2px;
    left: -2px;
    right: -2px;
    height: 50px;
    background: linear-gradient(to top, #222f, #2220);
    pointer-events: none;

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

const ScrollBox = ({ children, ...props }) => {
    const scrollBoxRef = useRef(null);
    const [showTopFade, setShowTopFade] = useState(true);
    const [showBottomFade, setShowBottomFade] = useState(true);

    const onScroll = useCallback(() => {
        if (scrollBoxRef.current) {
            setShowTopFade(scrollBoxRef.current.scrollTop > 0);
            setShowBottomFade(scrollBoxRef.current.offsetHeight + scrollBoxRef.current.scrollTop < scrollBoxRef.current.scrollHeight);
        }
    }, [scrollBoxRef]);

    useEffect(() => {
        if (scrollBoxRef.current) {
            console.log('registering onscroll', onScroll);
            scrollBoxRef.current.addEventListener('scroll', onScroll);
            return () => {
                if (scrollBoxRef.current)
                    scrollBoxRef.current.removeEventListener('scroll', onScroll);
            }
        }
    }, [scrollBoxRef, onScroll])

    useEffect(onScroll, [scrollBoxRef]);

    return (
        <>
            <StyledScrollBox ref={scrollBoxRef}>
                {children}
            </StyledScrollBox>
            <FadeTop active={showTopFade} />
            <FadeBottom active={showBottomFade} />
        </>
    );
}

export default ScrollBox;

