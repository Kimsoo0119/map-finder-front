import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import axios from "axios";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

function Popover({ isOpen, isLoggedIn, onLogout }: any) {
  const navigate = useNavigate();
  const cookie = new Cookies();
  if (!isOpen) return null;
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 막기
  };

  function handleMyInfoButtonClick() {
    navigate("/my");
  }

  async function handleLogOutButtonClick() {
    await axios.delete(`${backEndUrl}/auth/logout`);
    onLogout();
  }

  function handleLogInButtonClick() {
    navigate("/signin");
  }

  return (
    <Container className={isOpen ? "popover-container open" : "popover-container"}>
      <PopoverContent onClick={handlePopoverClick}>
        <ul>
          <MyInfoItem onClick={handleMyInfoButtonClick}>내정보</MyInfoItem>
          {isLoggedIn ? (
            <LogOutItem onClick={handleLogOutButtonClick}>로그아웃</LogOutItem>
          ) : (
            <LogInItem onClick={handleLogInButtonClick}>로그인</LogInItem>
          )}
        </ul>
      </PopoverContent>
    </Container>
  );
}

const Container = styled.div`
  width: 30vw;
  z-index: 3;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
`;

const PopoverContent = styled.div`
  text-align: center;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  margin-bottom: 5px;
`;

const MyInfoItem = styled(ListItem)``;

const LogOutItem = styled(ListItem)``;
const LogInItem = styled(ListItem)``;

export default Popover;
