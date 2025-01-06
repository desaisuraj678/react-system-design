"use client";
import { useEffect } from "react";
import "./styles.css";

export default function InteractiveShape() {

  const onClickParent=(e)=>{
    e.stopPropagation() // is used to stop event propogation
    console.log('Parent called')
  }

  const onClickGrandParent=(e)=>{
    console.log('grand parent called')
  }

  const onClickChild=(e)=>{
     console.log('child called')
  }


  // Adding click handlers here just for info, not required in react app. use declarative approach instead, like onclick and onClickCapture
  useEffect(() => {
    const grandParentElement = document.querySelector(".grandParent");
    const parent =  document.querySelector('.parent')
    const child =  document.querySelector('.child')
    function callback1() {
      console.log("Grandparent - Event Capturing");
    }

    function callback2() {
      console.log("parent - Event Capturing");
    }

    function callback3() {
      console.log("child - Event Capturing");
    }

    // Add an event listener for capturing phase  : Not ideal in react, use declarative approach like onClick
    // if some nodes are using bubbling and some are using capturing then first all capturing handlers are processed and then all bubbling are processed
    grandParentElement?.addEventListener(
      "click",
      callback1,
      true // Use capturing phase :: By default its bubbling
    );

    parent?.addEventListener(
      "click",
      callback2,
      false // Use bubbling phase :: By default its bubbling
    );

    child?.addEventListener(
      "click",
      callback3,
      true // Use capturing phase :: By default its bubbling
    );

    return () => {
      // Clean up the event listener to avoid memory leaks
      grandParentElement?.removeEventListener("click", callback1, true);
      parent?.removeEventListener("click", callback2, true);
      child?.removeEventListener("click", callback3, true);
    };
  }, []);


  return (
    // This is used for event bubbling --> Leaf(starts from target) is called first and then its propogated to Root.
    <div className="grandParent" onClick={onClickGrandParent}>
      <div className="parent" onClick={onClickParent}>
        <div className="child" onClick={onClickChild}>
        </div>
      </div>
    </div>

    // This is used for event capturing   --> Root is called first and then its propogated to target (does not go beyond target)
    /* <div className="grandParent" onClickCapture={onClickGrandParent}>
          <div className="parent" onClickCapture={onClickParent}>
            <div className="child" onClickCapture={onClickChild}>
            </div>
          </div>
       </div> */

  );
}

