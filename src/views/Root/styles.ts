import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
     box-sizing: border-box;
    margin: 0;
    padding: 0;
}
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
