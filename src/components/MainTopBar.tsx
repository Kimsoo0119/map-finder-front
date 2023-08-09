import styled from "styled-components";
import { KakaoSignIn } from "./kakao/KakaoSignIn";
import { useNavigate } from "react-router-dom";

function MainTopBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/locals");
  };
  return (
    <Container>
      <SearchIcon
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlPSIjQzVDNUM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI2LjYxMSIgY3k9IjYuNjExIiByPSI1Ljg2MSIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1LjI1IDE1LjI1bC00LjI0My00LjI0MyIvPjwvZz48L3N2Zz4=
"
        onClick={() => handleClick()}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7vh;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default MainTopBar;
