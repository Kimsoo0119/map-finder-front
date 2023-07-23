import styled from "@emotion/styled";
import PlaceRecommend from "components/PlaceRecomend";
import SearchBox from "components/SearchBox";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/locals");
  };

  return (
    <MainTopBar>
      <SearchIcon
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlPSIjQzVDNUM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI2LjYxMSIgY3k9IjYuNjExIiByPSI1Ljg2MSIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1LjI1IDE1LjI1bC00LjI0My00LjI0MyIvPjwvZz48L3N2Zz4=
"
        onClick={() => handleClick()}
      />
      <PlaceRecommend />
    </MainTopBar>
  );
}
const MainTopBar = styled.div`
  padding-right: 2vh;
  padding-left: 2vh;
  z-index: 2;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: center;
  bottom: 0 > * {
    margin: 0 auto;
  }
`;
const SearchIcon = styled.img<{ hover?: boolean }>`
  width: 20px;
  height: 20px;
  cursor: ${({ hover }) => (hover ? "pointer" : "default")};
`;
export default MainPage;
