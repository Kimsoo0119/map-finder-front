import { useEffect } from "react";
const kakaoJSKey = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
const { Kakao } = window;

export function KakaoSignIn() {
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL;

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(kakaoJSKey);
    }
  });

  function loginKakao() {
    //SDK 방식 로그인
    Kakao.Auth.authorize({
      redirectUri,
    });

    //RestAPI 방식 로그인
    // const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}`;
    // window.location.href = KAKAO_AUTH_URL;
  }

  return <img onClick={loginKakao} src="/icons/kakao-login.png" />;
}
