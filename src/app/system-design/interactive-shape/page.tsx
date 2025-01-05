/**
 
 */

"use client";
import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const data = [
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 0],
];

export default function InteractiveShape() {
  const [selectedBoxes, setSelectedBoxes] = useState(new Set());
  const [resetInProgress, setResetInProgress] = useState(false);
  const boxes = useMemo(() => {
    return data.flat();
  }, []);

  const boxLength = useMemo(() => {
    return boxes.reduce((acc, item) => {
      if (item) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  const resetBoxes = (selectedBoxes) => {
    for (const item of selectedBoxes) {
      setTimeout(() => {
        const newSelectedBoxes = new Set(selectedBoxes)
        newSelectedBoxes.delete(item)
        setSelectedBoxes(newSelectedBoxes)
        resetBoxes(newSelectedBoxes)
      }, 200);
      break
    }
    if(selectedBoxes?.size == 0){
      setResetInProgress(false);
    }
  };

  useEffect(() => {
    if (selectedBoxes.size == boxLength) {
      setResetInProgress(true);
      resetBoxes(selectedBoxes);
    } 
  }, [selectedBoxes, boxLength]);

  const onClick = (e) => {
    const { target } = e;
    const item = target.getAttribute("data-item"); // for now if set data-[some value] then we can access it using getAttribute
    const visible = target.getAttribute("data-status");
    if (!visible || resetInProgress) {
      return;
    }
    setSelectedBoxes((prev) => {
      return new Set(prev).add(item);
    });
  };

  return (
    <div className="wrapper">
      <div className="boxes" onClick={onClick}>
        {/*IMP:  Event delegation. Adding onClick handler on parent */}
        {boxes.map((item, index) => {
          const isSelected = selectedBoxes.has((index + 1).toString());
          return (
            <Box
              key={item + "_" + index}
              showColor={item == 1}
              item={index + 1}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

// components

const Box = ({ showColor, item, isSelected }) => {
  return (
    <div
      className="box"
      style={{
        backgroundColor: isSelected ? "green" : "wheat",
        opacity: showColor ? 1 : 0,
      }}
      data-item={item}
      data-status={showColor}
    />
  );
};

// utils
