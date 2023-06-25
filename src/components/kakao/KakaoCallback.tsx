import axios from "axios";
import { useEffect, useState } from "react";

const backEndUrl = process.env.REACT_APP_BACKEND_SERVER;

export function KakaoCallBack() {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    if (params.get("code")) {
      setAuthorizationCode(params.get("code"));
    }
  });

  useEffect(() => {
    if (authorizationCode) {
      axios.get(`${backEndUrl}/auth/signin/kakao?authorizationCode=${authorizationCode}`);
    }
  }, [authorizationCode]);

  return <></>;
}
