import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { KakaoSignIn } from "./kakao/KakaoSignIn";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";

function MainTopBar() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.value); // Assuming 'token' is the token state in your Redux store

  const handleClick = () => {
    navigate("/locals");
  };

  return (
    <Container>
      <SearchIcon src="icons/navigation/search-inactive.svg" onClick={() => handleClick()} />
      {token ? (
        <UserImage src="/icons/user.png" />
      ) : (
        <SignUpButton onClick={() => navigate("/signin")}>로그인</SignUpButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6vh;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SignUpButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
  border: 1px solid #000000;
  border-radius: 15px; /* 둥근 테두리 추가 */
  padding: 5px 15px; /* 내용을 감싸는 여백 추가 */
`;

const UserImage = styled.img`
  width: 25px;
  height: 25px;
`;

export default MainTopBar;
