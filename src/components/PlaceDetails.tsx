import axios from "axios";
import { SearchedPlace } from "pages/main";
import { async } from "q";
import { useEffect } from "react";

interface SearchedPlaceProps {
  searchedPlace: SearchedPlace | undefined;
}
function PlaceDetails({ searchedPlace }: SearchedPlaceProps) {
  useEffect(() => {
    fetchData();
  }, [searchedPlace]);

  async function fetchData() {
    try {
      console.log(searchedPlace);

      if (searchedPlace?.title) {
        const { data } = await axios.get(`http://localhost:5000/${searchedPlace?.title}`);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <div>{searchedPlace?.title}</div>;
}

export default PlaceDetails;
