import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html {
    height: 100%;
  }

  body {
    background: #12002f;
    color: white;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  #root {
    min-height: 100vh;
    position: relative;
    z-index: 0;
  }

  button {
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  .section {
    position: relative;
    z-index: 1;
  }

  .stars-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: twinkle ease infinite;
  }

  @keyframes twinkle {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export default GlobalStyles;
