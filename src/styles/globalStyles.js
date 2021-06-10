// globalStyles.js
import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: 'Bai Jamjuree', sans-serif;
  }

  p {
    margin: 0;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Mitr',
      sans-serif;
      line-height: 1;
  }

  h1 {
    font-size: 3rem;
  }

  a:any-link {
    color: inherit;
    text-decoration: underline;
  }

  a:hover {
    opacity: .7;
  }

  .axis line, .axis path {
    stroke: ${theme.colors.text};
  }

  .axis text {
    fill: ${theme.colors.text};
    font-family: 'Bai Jamjuree', sans-serif;
  }

  @keyframes blink-from-none {
    0% {
      opacity: 0.4;
    }

    50% {
      opacity: 0.8;
    }

    100% {
      opacity: 0.4;
    }
  }

  @keyframes blink-from-full {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }

  button {
    cursor: pointer;
  }

  button:hover {
    opacity: .7;
  }
`;

export default GlobalStyle;
