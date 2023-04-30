import axios from "axios";
import { SearchedPlace } from "pages/main";
import { async } from "q";
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import { useEffect, useState } from "react";

interface SearchedPlaceProps {
  searchedPlace: SearchedPlace | undefined;
}

function PlaceDetails({ searchedPlace }: SearchedPlaceProps) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchedPlace]);

  async function fetchData() {
    if (searchedPlace) {
      console.log(searchedPlace);

      const { address, category, title, telephone }: SearchedPlace = searchedPlace;
      const data = await axios.get(`http://localhost:3005/places/`, {
        params: { address, category, title, telephone },
      });
      console.log(data);
    }

    try {
    } catch (error) {}
  }

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  function handleResizeStop(ref: HTMLElement) {
    const height = parseInt(ref.style.height || "0", 10);

    if (height >= 40) {
      ref.style.height = "93vh";
    }
  }

  function handleResizeStart(elementRef: HTMLElement) {
    const height = parseInt(elementRef.style.height || "0", 10);

    if (height >= 90) {
      elementRef.style.height = "25vh";
    }
  }

  return (
    <Resizable
      enable={resizableEnable}
      style={style}
      defaultSize={{ width: `100%`, height: `25vh` }}
      maxHeight={"95vh"}
      minHeight={"10vh"}
      onResizeStop={(e, direction, ref, d) => {
        handleResizeStop(ref);
      }}
      onResizeStart={(e, direction, ref) => {
        handleResizeStart(ref);
      }}
    >
      {searchedPlace?.title}
    </Resizable>
  );
}
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#0000",
};

const resizableEnable = {
  top: true,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

export default PlaceDetails;
