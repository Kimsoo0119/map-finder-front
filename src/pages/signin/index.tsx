import { KakaoSignIn } from "components/kakao/KakaoSignIn";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsButtonDisabled(!newEmail); // Enable the button when email is filled out
  };

  const handleLogin = () => {
    // Implement your login logic here
  };

  function handlePrevious() {
    navigate(-1);
  }

  return (
    <Container>
      <TopContainer>
        <PreButton src="/icons/pre-btn.png" onClick={handlePrevious} />
      </TopContainer>

      <SignInWrapper>
        <SignInText>로그인</SignInText>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
        <LoginButton disabled={isButtonDisabled} onClick={handleLogin} disabledColor={!email}>
          이메일로 회원가입
        </LoginButton>
        <KakaoSignIn />
      </SignInWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SignInWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  text-align: center;
`;

const SignInText = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button<{ disabledColor: any }>`
  background-color: ${({ disabledColor }) => (disabledColor ? "#DFDFDF" : "#007bff")};
  color: #ffffff;
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 20px;
  margin-bottom: 10px;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-size: 17px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#DFDFDF" : "#0056b3")};
  }
};`;

const PreButton = styled.img`
  border: none;
  background: inherit;
  cursor: pointer;
  width: 30px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
  margin-right: 10px;
`;

const TopContainer = styled.div`
  margin-top: 10px;
  text-align: left;
  z-index: 2;
  display: flex;
  position: absolute;
`;

export default SignInPage;
