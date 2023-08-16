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

          <StarContainer>
            <ImageIcon src="/icons/place/star.png" />
            {placeDetail.naver_stars ? (
              <Stars>
                {placeDetail.naver_stars} {`(${placeDetail.naver_reviewer_counts}명 참여)`}
              </Stars>
            ) : (
              <></>
            )}
          </StarContainer>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
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
`;

const Category = styled.h4`
  color: #666;
  margin-left: 10px;
`;

const StarContainer = styled.div`
  display: flex;
`;

const Stars = styled.h4``;

const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

export default PlaceTopSection;
