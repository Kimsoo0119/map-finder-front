import React from "react";
import styled from "styled-components";

function MyPage() {
  return (
    <Container>
      <PageTitle>마이 페이지</PageTitle>
      <UserInfo>
        <UserImage src="/icons/user.png" alt="User Image" />
        <UserName>사용자 이름</UserName>
      </UserInfo>
      <UserActions>
        <ActionButton>내 정보 수정</ActionButton>
        <ActionButton>로그아웃</ActionButton>
      </UserActions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const UserActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default MyPage;
