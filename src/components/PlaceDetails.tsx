import axios from "axios";
import { SearchedPlace } from "pages/main";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface SearchedPlaceProps {
  searchedPlace: SearchedPlace | undefined;
}

function PlaceDetails({ searchedPlace }: SearchedPlaceProps) {
  const [firstHeight, setFirstHeight] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [searchedPlace]);

  async function fetchData() {
    try {
      if (searchedPlace) {
        const { address, category, title, telephone }: SearchedPlace = searchedPlace;
        const data = await axios.get(`http://localhost:3005/places/`, {
          params: { address, category, title, telephone },
        });
      }
    } catch (error) {}
  }

  function handleResize(ref: HTMLElement) {
    const height = parseInt(ref.style.height || "0", 10);
    console.log(height);

    const testDiv = document.getElementById("test")?.style;
    if (height <= 20) {
      ref.style.height = `${height}vh`;
      const divHeight = height - 3;
      testDiv?.setProperty("height", `${divHeight}vh`);
    }
  }

  function handleResizeStop(ref: HTMLElement) {
    const height = parseInt(ref.style.height || "0", 10);
    const testDiv = document.getElementById("test")?.style;

    if (firstHeight === 90 && height <= 100) {
      ref.style.height = "20vh";
      setFirstHeight(0);
    } else if (height >= 40) {
      ref.style.height = "93vh";
    } else {
      testDiv?.setProperty("height", `17vh`);
      ref.style.height = "20vh";
    }
  }

  function handleResizeStart(elementRef: HTMLElement) {
    const height = parseInt(elementRef.style.height || "0", 10);

    if (height >= 90) {
      setFirstHeight(90);
    }
  }

  return (
    <Resizable
      enable={resizableEnable}
      style={style.resizable}
      defaultSize={{ width: `100%`, height: `20vh` }}
      maxHeight={"95vh"}
      minHeight={"11vh"}
      onResizeStop={(e, direction, ref, d) => {
        handleResizeStop(ref);
      }}
      onResize={(e, direction, ref, d) => {
        handleResize(ref);
      }}
      onResizeStart={(e, direction, ref) => {
        handleResizeStart(ref);
      }}
    >
      <PlaceContainer id="test">
        <IconWrapper>
          <img width={"40vh"} src="/icons/dash.svg"></img>
        </IconWrapper>
        <div style={{ flex: "7" }}>
          <h2>{searchedPlace?.title}</h2>
          <h3 style={{ color: "gray" }}>{searchedPlace?.category}</h3>
          <h5 style={{ color: "gray" }}>{searchedPlace?.address}</h5>
        </div>
        <div style={{ flex: "3", backgroundColor: "gray" }}>사진입니다</div>
      </PlaceContainer>
    </Resizable>
  );
}

const style = {
  resizable: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    background: "#0000",
  },
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

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 17vh;
  padding-top: 5vh;
  padding-bottom: 1vh;
  padding-right: 1vh;
  padding-left: 1vh;
  position: relative;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
`;

export default PlaceDetails;
