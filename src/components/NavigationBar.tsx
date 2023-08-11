import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const BottomNav = () => {
  const location = useLocation();

  const isActivePage = (path: any) => {
    return location.pathname === path;
  };
  if (location.pathname !== "/" && location.pathname !== "/locals" && location.pathname !== "/my") {
    return null;
  }

  return (
    <Container>
      <Link to="/" onClick={() => {}}>
        <IconImg
          src={
            isActivePage("/")
              ? "icons/navigation/home-active.svg"
              : "icons/navigation/home-inactive.svg"
          }
        />
      </Link>
      <Link to="/locals" onClick={() => {}}>
        <IconImg
          src={
            isActivePage("/locals")
              ? "icons/navigation/search-active.svg"
              : "icons/navigation/search-inactive.svg"
          }
        />
      </Link>
      <Link to="/my" onClick={() => {}}>
        <IconImg
          src={
            isActivePage("/my")
              ? "icons/navigation/smile-active.png"
              : "icons/navigation/smile-inactive.png"
          }
        />
      </Link>
    </Container>
  );
};

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6vh;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IconImg = styled.img`
  width: 24px;
  height: 24px;
`;

export default BottomNav;
