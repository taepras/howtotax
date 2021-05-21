import styled, { css } from 'styled-components';
import { theme } from '../theme';

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
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
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        `)}

  ${(props) => props.disabled
    && css`
      opacity: 0.4;
    `}
`;

export default Button;
