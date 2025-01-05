/**
 
 */

"use client";
import { memo, useCallback, useMemo, useState } from "react";
import "./styles.css";

export default function MatchColors() {
  const [selectedColors, setSelectedColors] = useState(new Set()); // one state to track the overall previous changes 
  const [currentSelectedColor, setCurrentSelctedColor] = useState(null); // one state to track current changes to decide overall previous changes 

  // one state to initialize the values
  const boxes = useMemo(() => {
    const total = 12;
    const colors = getRandomColors(total / 2);
    const randomColors = [...colors, ...colors];
    const totalBoxes = randomColors.map((color, index) => {
      return {
        id: index,
        bgColor: color,
      };
    });
    return totalBoxes;
  }, []);

  const onClick = useCallback((item: string) => {
    setCurrentSelctedColor((prevCurrSeleColor) => {
      if (prevCurrSeleColor) {
        if (item.bgColor == prevCurrSeleColor?.bgColor) {
          setSelectedColors((prev) => {
            const newSet = new Set(prev).add(prevCurrSeleColor?.bgColor)
            return newSet;
          });
        }
        return null;
      } else {
        return item;
      }
    });
  }, []); // IMP :   not passing any dependencies instead  using setCurrentSelctedColor((prevCurrSeleColor) => {}) this structure to get previous states

  return (
    <div className="wrapper">
      <div className="boxes">
        {boxes.map((item) => {
          return (
            <Box
              key={item.id}
              item={item}
              onClick={onClick}
              showColor={
                selectedColors.has(item.bgColor) ||
                item.id == currentSelectedColor?.id
              }
            />
          );
        })}
      </div>
    </div>
  );
}

// Components

// eslint-disable-next-line react/display-name
const Box = memo(({ item, onClick, showColor }) => {
  return (
    <div
      className="box"
      style={{ backgroundColor: !showColor ? "white" : item.bgColor }}
      onClick={() => onClick(item)}
    />
  );
});

// utils

function getRandomColors(count) {
  return ["red", "green", "blue", "yellow", "black", "pink"];
}
