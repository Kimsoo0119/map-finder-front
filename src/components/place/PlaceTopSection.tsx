import { PlaceDetail } from "common/interface/place-interface";
import styled from "styled-components";

interface PlaceTopSectionProps {
  placeDetail: PlaceDetail | undefined;
}
function PlaceTopSection({ placeDetail }: PlaceTopSectionProps) {
  return (
    <Container>
      {placeDetail && (
        <div>
          <TitleContainer>
            <Title>{placeDetail.title}</Title>
            <Category>{placeDetail.place_category.sub}</Category>
          </TitleContainer>

          {placeDetail.naver_stars ? (
            <StarContainer>
              <ImageIcon src="/icons/place/star.png" />
              <Stars>
                {placeDetail.naver_stars} {`(${placeDetail.naver_reviewer_counts}명 참여)`}
              </Stars>
            </StarContainer>
          ) : (
            <></>
          )}
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 15px;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 타이틀을 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Category = styled.h4`
  color: #666;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;

  flex-shrink: 0;
`;

const StarContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Stars = styled.h4``;

const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

export default PlaceTopSection;
