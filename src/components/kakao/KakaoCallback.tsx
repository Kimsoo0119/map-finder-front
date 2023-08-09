import axios from "axios";
import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { setAccessToken } from "store/reducers/AuthSlice";
import styled from "styled-components";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

export function KakaoCallBack() {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    if (params.get("code")) {
      setAuthorizationCode(params.get("code"));
    }
  });

  useEffect(() => {
    if (authorizationCode) {
      getJwtToken(authorizationCode);
    }
  }, [authorizationCode]);

  async function getJwtToken(authorizationCode: any) {
    try {
      const response = await axios.get(
        `${backEndUrl}/auth/signin/kakao?authorizationCode=${authorizationCode}`,
        { withCredentials: true }
      );
      if (response.data.accessToken) {
        dispatch(setAccessToken(response.data.accessToken));
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching JWT token:", error);
    }
  }

  return <Container></Container>;
}

const LoadingSpinnerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 10px;
`;
