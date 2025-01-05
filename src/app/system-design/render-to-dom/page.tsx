/**
 Build a virtual dom to actual html dom converter. 
 */

"use client";
import { useEffect } from "react";
import "./styles.css";

const virtualDom = {
  type :'div',
  props: {
    class: "container",
    children:{
     0: "this is",
     1: {
      type:"div",
      props:{
        key:'10',
        id:'heading',
        children:" surha deai"
      }
     }
    }
  }
}


function renderToDom(virtualNode,domNode){
    
}

export default function OverlappingCircles() {
   useEffect(()=>{
    renderToDom(virtualDom,document.getElementsByClassName("wrapper"))
   },[])
  
  return (
    <div
      className="wrapper"
      style={{ position: "relative" }}
    >
      
    </div>
  );
}
