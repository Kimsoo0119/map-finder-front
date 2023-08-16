import React, { useState } from "react";
import styled from "styled-components";

function PlaceTabBar() {
  const [selectedTab, setSelectedTab] = useState("home"); // 현재 선택된 탭 상태

  // 탭 클릭 시 처리하는 함수
  const handleTabClick = (tabId: any) => {
    setSelectedTab(tabId);
  };

  return (
    <Container>
      <TabBar>
        <TabItem onClick={() => handleTabClick("home")} active={selectedTab === "home"}>
          <TabItemText active={selectedTab === "home"}>홈</TabItemText>
        </TabItem>
        <TabItem onClick={() => handleTabClick("reviews")} active={selectedTab === "reviews"}>
          <TabItemText active={selectedTab === "reviews"}>리뷰</TabItemText>
        </TabItem>
        <TabItem onClick={() => handleTabClick("map")} active={selectedTab === "map"}>
          <TabItemText active={selectedTab === "map"}>지도</TabItemText>
        </TabItem>
      </TabBar>

      {/* 조건부 렌더링 */}
      {selectedTab === "home" && <Component1 />}
      {selectedTab === "reviews" && <Component2 />}
      {selectedTab === "map" && <Component3 />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4vh;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
`;

const TabItem = styled.div<{ active: boolean }>`
  flex: 1;
  height: 4vh;

  cursor: pointer;
  padding: 0px 5px;
  text-align: center;
  font-size: 20px;
`;

const TabItemText = styled.span<{ active: boolean }>`
  height: 4vh;
  line-height: 4vh;
  color: ${({ active }) => (active ? "black" : "gray")};
  border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
`;

function Component1() {
  return <div>Component 1 Content</div>;
}

function Component2() {
  return <div>Component 2 Content</div>;
}

function Component3() {
  return <div>Component 3 Content</div>;
}

export default PlaceTabBar;
