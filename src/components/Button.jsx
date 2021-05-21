import styled, { css } from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: "Bai Jamjuree", sans-serif;

  ${(props) => (props.secondary
    ? css`
          border: 1px white solid;
          background-color: transparent;
          color: white;
        `
    : css`
          background-color: white;
        `)}

  ${(props) => props.disabled
    && css`
      opacity: 0.4;
    `}
`;

export default Button;
