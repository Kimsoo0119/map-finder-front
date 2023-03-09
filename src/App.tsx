import "../src/styles/globals.css";

import MapPage from "pages/main";
import LocalSearchPage from "pages/search";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlacePage from "pages/place";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/locals" element={<LocalSearchPage />} />
          <Route path="/places/:placeName" element={<PlacePage />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}
export default App;