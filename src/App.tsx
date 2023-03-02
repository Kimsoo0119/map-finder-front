import "../src/styles/globals.css";

import MapPage from "pages/map";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <>
      <AppWrapper>
        <GlobalStyle />

        <MapPage />
      </AppWrapper>
    </>
  );
}
export default App;
