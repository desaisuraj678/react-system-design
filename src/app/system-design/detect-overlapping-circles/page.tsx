/**
 * When left mouse button click
 *  - Draw a circle
 *  - Increase the circle size on drag
 *  - On mouse leave => the final circle
 *  - If left click without drag clear the left circle
 *
 * When right mouse button click
 *  - Draw a circle
 *  - Increase the circle size on drag
 *  - on mouse leave => the final circle
 *  - If right click without drag clear the right circle
 *
 * Circle overlap
 *  - Initially both circles are red
 *  - If overlap second circle should change to blue
 */

"use client";
import { useEffect, useState } from "react";
import "./styles.css";

const elementsOverlap = (leftCircle,rightCircle) =>{
    const leftCircleRadius = leftCircle.width/2;
    const leftCircleCenter = {
        x : leftCircle.marginX + leftCircleRadius,
        y: leftCircle.marginY + leftCircleRadius
    } 
    const rightCircleRadius = rightCircle.width/2;
    const rightCircleCenter = {
        x : rightCircle.marginX + rightCircleRadius,
        y: rightCircle.marginY + rightCircleRadius
    } 
    const distanceBwCenters = Math.sqrt(
        Math.pow(leftCircleCenter.x-rightCircleCenter.x,2) + Math.pow(leftCircleCenter.y-rightCircleCenter.y,2)
    )
    return distanceBwCenters < leftCircleRadius + rightCircleRadius
}

export default function OverlappingCircles() {
  const [circles, setCircles] = useState([
    {
      id: "left",
      startX: 0,
      startY: 0,
      marginX: 0,
      marginY: 0,
      backGroundColor: "red",
      width: 0,
    },
    {
      id: "right",
      startX: 0,
      startY: 0,
      marginX: 0,
      marginY: 0,
      backGroundColor: "red",
      width: 0,
    },
  ]);
  const [circleType, setCircleType] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handler);
    return () => [document.removeEventListener("contextmenu", handler)];
  }, []);

  const onMouseDownHandler = (e) => {
    console.log(e);
    const { button } = e;
    const type = button === 0 ? "left" : "right";
    const newCircles = circles.map((item) => {
      if (item.id == type) {
        return {
          ...item,
          startX: e.clientX,
          startY: e.clientY,
          marginX: 0,
          marginY: 0,
          width: 0,
        };
      }
      return item;
    });
    setCircleType(type);
    setCircles(newCircles);
  };

  const onMouseMoveHandler = (e) => {
    if (circleType == null) return;
    const newCircles = circles.map((item) => {
      if (item.id == circleType) {
        const distanceX = e.clientX - item.startX;
        const distanceY = e.clientY - item.startY;
        const width = Math.max(Math.abs(distanceX), Math.abs(distanceY));
        const newX = distanceX < 0 ? item.startX - width : item.startX;
        const newY = distanceY < 0 ? item.startY - width : item.startY;
        return {
          ...item,
          marginX: newX,
          marginY: newY,
          width: width,
        };
      }
      return item;
    });
    const circlesOverlap = elementsOverlap(newCircles[0],newCircles[1])
    const updatedCircles = newCircles.map((item)=>{
        if(item.id == circleType && circlesOverlap){
            return {
             ...item,
             backGroundColor:'blue'
            }
        }
        return  {
            ...item,
            backGroundColor:'red'
        }
    })

    setCircles(updatedCircles);
  };

  const onMouseLeaveHandler = (e) => {
    setCircleType(null);
  };

  return (
    <div
      className="wrapper"
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseLeaveHandler}
      style={{ position: "relative" }}
    >
      {circles.map((item) => [
        <div
          key={item.id}
          style={{
            top: `${item.marginY}px`,
            left: `${item.marginX}px`,
            width: `${item.width}px`,
            height: `${item.width}px`,
            borderRadius: "50%",
            backgroundColor: item.backGroundColor,
            position: "absolute",
          }}
        />,
      ])}
    </div>
  );
}
