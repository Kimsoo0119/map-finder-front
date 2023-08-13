import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import Popover from "./MorePopover";
import axios from "axios";
import { setAccessToken } from "store/reducers/AuthSlice";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

function MainTopBar() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.value);
  const dispatch = useDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  function handleMoreImageClick() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleContainerClick() {
    if (isPopoverOpen) {
      setIsPopoverOpen(false);
    }
  }

  function handleSearchButtonClick() {
    navigate("/locals");
  }

  function handleLogOutButtonClick() {
    setIsPopoverOpen(false);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (!token) {
      login();
    }
  }, []);
  async function login() {
    const response = await axios.get(`${backEndUrl}/auth/token`);
    if (response.data.accessToken) {
      dispatch(setAccessToken(response.data.accessToken));
      axios.defaults.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
      setIsLoggedIn(true);
    }
  }

  return (
    <Container onClick={handleContainerClick}>
      <SearchIcon
        src="icons/navigation/search-inactive.svg"
        onClick={() => handleSearchButtonClick()}
      />
      {!isLoggedIn && <SignUpButton onClick={() => navigate("/signin")}>로그인</SignUpButton>}
      <MoreImage onClick={handleMoreImageClick} src="/icons/more.png" />
      <Popover
        isOpen={isPopoverOpen}
        isLoggedIn={isLoggedIn} // 로그인 상태 전달
        onLogout={handleLogOutButtonClick}
        onClose={() => setIsPopoverOpen(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 6vh;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const SignUpButton = styled.button`
  margin-right: 10px;
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid #000000;
  border-radius: 15px;
  padding: 5px 15px;
`;

const MoreImage = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;

export default MainTopBar;
