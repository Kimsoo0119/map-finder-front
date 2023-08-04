import "../src/styles/globals.css";

import MapPage from "pages/map";
import LocalSearchPage from "pages/search";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KakaoCallBack } from "components/kakao/KakaoCallback";
import { SignInPage } from "pages/signin";
import MainPage from "pages/main";

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
          <Route path="/" element={<MainPage />} />
          <Route path="/place" element={<MapPage />} />
          <Route path="/locals" element={<LocalSearchPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/kakao-oauth" element={<KakaoCallBack />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
