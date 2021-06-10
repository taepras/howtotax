import styled, { css } from 'styled-components';
import { lighten, transparentize } from 'polished';
import { theme } from '../theme';

const Pill = styled.span`
  /* border: none; */
  border-radius: 2px;
  padding: 4px 2px;
  background-color: ${(props) => transparentize(0.92, theme.colors[props.color])};
  color: ${(props) => theme.colors[props.color]};
  font-weight: ${(props) => (props.bold ? 'bold' : 'inherit')};
  /* font-weight: bold; */
  /* border: 1px solid ${(props) => lighten(0.4, theme.colors[props.color])};; */
`;

export default Pill;
