import styled, { css } from 'styled-components';
import { theme } from '../theme';

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: "Bai Jamjuree", sans-serif;

  ${(props) => (props.secondary
    ? css`
          border: 1px ${theme.colors.income} solid;
          background-color: transparent;
          color: ${theme.colors.income} !important;
        `
    : css`
          background-color: ${theme.colors.income};
          color: ${theme.colors.white};
        `)}

  ${(props) => props.disabled
    && css`
      opacity: 0.4;
    `}
`;

export default Button;
