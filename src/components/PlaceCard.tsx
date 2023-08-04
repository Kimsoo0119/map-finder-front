import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function PlaceCard({ place }: { place: any }) {
  const { title, address, thum_url, place_category } = place;

  const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 4px;
    margin-bottom: 5px;
    padding: 10px;
  `;

  const CardImage = styled.div`
    width: 100%;
    padding-top: 80%;
    position: relative;
    margin-bottom: 4px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  `;

  const CardText = styled.div`
    text-align: left;

    h4 {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 타이틀을 2줄로 제한 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;

      margin: 0;
      padding: 0;
      margin-bottom: 2px;
    }

    p {
      margin: 0;
      padding: 0;
      color: gray;
      font-size: 12px;
      margin-bottom: 2px;
    }
  `;

  return (
    <Container>
      <LinkWrapper>
        <Link to={`/place`} state={place}>
          <CardImage>
            <img src={thum_url} alt={title} />
          </CardImage>
          <CardText>
            <h5>{title}</h5>
            <p>{place_category.sub}</p>
            <p>{address}</p>
          </CardText>
        </Link>
      </LinkWrapper>
    </Container>
  );
}

const LinkWrapper = styled.div`
  a {
    color: #000;
    text-decoration: none;
  }
`;
export default PlaceCard;
