import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

@font-face {
  font-family: 'OpenSans';
  src: url('/fonts/OpenSans/OpenSans-Regular.ttf');
  font-style: normal;
}

a,
a:visited {
  font-family: 'OpenSans', sans-serif;
  text-decoration: none;
  cursor: pointer;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'OpenSans', sans-serif;
  color: #000;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
}

input,
button,
textarea,
select {
  font-family: 'OpenSans', sans-serif;
}

input {
  outline: none;
}
`

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`
