import styled, { css } from 'styled-components';

const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  transition: all 0.5s;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) => {
    switch (props.status) {
      case -1:
        return css`
          transform: translateX(-100px);
          opacity: 0;
          pointer-events: none;
        `;
      case 1:
        return css`
          transform: translateX(100px);
          opacity: 0;
          pointer-events: none;
        `;
      default:
        return css`
          /* transform: translateX(-100px):  */
          /* opacity: 0; */
          /* pointer-events: none; */
        `;
    }
  }}
`;

export const StepOnly = styled.div`
  ${(props) => {
    switch (props.status) {
      case -1:
        return css`
          transform: translateX(-100px);
          opacity: 0;
          pointer-events: none;
        `;
      case 1:
        return css`
          transform: translateX(100px);
          opacity: 0;
          pointer-events: none;
        `;
      default:
        return css`
          /* transform: translateX(-100px):  */
          /* opacity: 0; */
          /* pointer-events: none; */
        `;
    }
  }}
`;

export default Step;
