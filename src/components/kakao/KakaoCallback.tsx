import { useEffect } from "react";

export function KakaoCallBack() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    console.log(params.get("code"));
  });
  return <></>;
}
