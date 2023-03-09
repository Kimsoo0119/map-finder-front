import styled from "@emotion/styled";
import SearchedLocationMap from "components/SearchedLocationMap";

function PlacePage() {
  return (
    <Container>
      <SearchedLocationMap />
    </Container>
  );
}
export default PlacePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
