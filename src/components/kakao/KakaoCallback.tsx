import axios from "axios";
import { useEffect, useState } from "react";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

export function KakaoCallBack() {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>();
  const [token, setToken] = useState<any>();

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

  useEffect(() => {
    if (token) {
      console.log(token);
    }
  }, [token]);

  async function getJwtToken(authorizationCode: any) {
    const { data } = await axios.get(
      `${backEndUrl}/auth/signin/kakao?authorizationCode=${authorizationCode}`
    );
    setToken(data);
  }
  return <></>;
}
