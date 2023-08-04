import "../src/styles/globals.css";

import MapPage from "pages/map";
import LocalSearchPage from "pages/search";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KakaoCallBack } from "components/kakao/KakaoCallback";
import { SignInPage } from "pages/signin";
import MainPage from "pages/main";
import NavigationBar from "components/NavigationBar";

const AppWrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
`;

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <MainContent>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/place" element={<MapPage />} />
            <Route path="/locals" element={<LocalSearchPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/kakao-oauth" element={<KakaoCallBack />} />
          </Routes>
        </MainContent>
        <NavigationBar />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
