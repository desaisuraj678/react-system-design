"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";
export default function Toast() {
  // warning error info success
  // should be visible for x duration
  // should be stacked if more than 1 toasts are present
  // should close once click on close icon

  /**
   * <Toast title="" type="success" duration={3000} onclick={()=>{}} style/>
   *
   *
   */

  const [toasts, setToasts] = useState([]);

  const onClickClose = useCallback((id) => {
    setToasts((prev) => {
      return prev.filter((item) => {
        return item.id != id;
      });
    });
  }, []);

  const btnClickHandler = (duration, type, title) => {
    const id = Date.now();
    setToasts((prev) => {
      return [
        ...prev,
        {
          type: type,
          id: id,
          title: title,
          duration: duration,
          onclick: onClickClose,
        },
      ];
    });
    setTimeout(() => {
      onClickClose(id);
    }, duration);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <button
          type="button"
          onClick={() => {
            btnClickHandler(4000, "success", "This is success text");
          }}
        >
          Succes
        </button>
        <button
          type="button"
          onClick={() => {
            btnClickHandler(5000, "info", "This is info text");
          }}
        >
          Info
        </button>
        <button
          type="button"
          onClick={() => {
            btnClickHandler(6000, "warning", "This is warning text");
          }}
        >
          Warning
        </button>
        <button
          type="button"
          onClick={() => {
            btnClickHandler(5000, "error", "This is error text");
          }}
        >
          Error
        </button>
      </div>
      <div className="toasts">
        {toasts.map((item) => {
          return (
            <ToastComp
              title={item?.title}
              type={item?.type}
              onclick={item.onclick}
              duration={item.duration}
              id={item.id}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

const ToastComp = ({
  title,
  type,
  duration = 3000,
  onclick = (id) => {},
  style = {},
  id,
}) => {
  return (
    <div className={`toast-comp ${type}`} style={style}>
      <div>i</div>
      <div>{title}</div>
      <div className="cross" onClick={() => onclick(id)}>
        X
      </div>
    </div>
  );
};
