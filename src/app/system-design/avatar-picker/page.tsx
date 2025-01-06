/**
 
 */

"use client";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AVATARS } from "./utils";
import "./styles.css";

export default function AvatarPicker() {
  const [selectedAvatarID, setSelectedAvatarID] = useState(1);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const selectedAvatar = useMemo(() => {
    return AVATARS.find((item) => item.id == selectedAvatarID);
  }, [selectedAvatarID]);

  const ref = useOutsideClick(() => {
    setIsPopUpVisible(false)
  });

  const onclick = (e) => {
    const { target } = e;
    const id = target.getAttribute("data-idf");
    if(id){
      setSelectedAvatarID(id);
    }
  };

  const clickHandler = () => {
    setIsPopUpVisible(true);
  };

  return (
    <div className="wrapper">
      <div ref={ref} className="wrapper-inside">
        <div onClick={clickHandler}>
          <Avatar
            source={selectedAvatar?.source}
            id={selectedAvatar?.id}
            label={selectedAvatar?.label}
          />
        </div>
        <div
          className={`avatars-wrapper ${isPopUpVisible ? "visibles" : null}`}
          onClick={onclick}
        >
          {AVATARS.map((item) => {
            return (
              <Avatar
                source={item.source}
                key={item.id}
                id={item.id}
                label={item.label}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Components

// eslint-disable-next-line react/display-name
const Avatar = memo(({ source, id, label }) => {
  return (
    <div className="avatar">
      <img src={source} data-idf={id} alt={label} />
    </div>
  );
})

// hooks

const useOutsideClick = (callback) => {
  const ref = useRef(null);

  const handler = (e) => {
    if (!ref?.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler,true);
    return () => {
      document.removeEventListener("click", handler,true);
    };
  }, []);

  return ref;
};
