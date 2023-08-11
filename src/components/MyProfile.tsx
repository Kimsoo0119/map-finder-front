import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

function MyProfile() {
  const token = useSelector((state: RootState) => state.token.value);
  useEffect(() => {
    if (!token) {
    }
  }, []);

  return <></>;
}
