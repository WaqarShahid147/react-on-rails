import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  button:hover, button:active, button:focus {
    outline: none !important;
    cursor: pointer;
  }
  .pagination li a{
    outline: none;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .noTextSelect{
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }

  .pageContainer {
    width: 83%;
    float: right;
  }

  .pageHeader {
    height: 128px;
    background: #348787;
    margin: -21px -15px 25px;
    z-index: -1;
    width: 103%;
  }

  .pageHeader .heading {
    line-height: 164px;
    color: #fff;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 28px;
  }
`;
