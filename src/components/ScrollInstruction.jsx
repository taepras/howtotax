import React from 'react';
import styled, { keyframes, css } from 'styled-components';
/* eslint-disable */
const scrollPreview = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 100px);
  }

  20% {
    opacity: 1;
    transform: translate(-50%, 100px);
  }

  80% {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, 0);
  }
`;

const ScrollInstruction = styled.div`
    width: 64px;
    height: 64px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ${(props) => props.visible && css`animation: ${scrollPreview} 2s infinite`};
    background: url('${process.env.PUBLIC_URL}/drag.svg');
    background-size: cover;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    
    transition: all 0.2s;

    @media (min-width: 480px) {
      display: none;
    }
`;

// const ScrollInstruction = ({ ...props }) =>
// <StyledScrollInstruction {...props} />

export default ScrollInstruction;
