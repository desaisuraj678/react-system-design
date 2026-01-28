/*
Requirements:

 1. Build an accordion
 2. Only one item can be expanded at a time.
 3. if any accordion is expanded and if its clicked again then that should get closed
*/

/** key knowledge
 * React.memo automatically shallow compares the props passed to the AccordionItem component
 *               If the props (item, isExpanded, onClickHandle) don’t change, the component won't re-render
 * so the accordionData.map logic will run every time which is not heavy but the AccordionItem rerender won't be there (or there wont be any actual dom manipulation)
 * 
 */


/**
 ReactElement vs ReactNode

 ## ReactElement

 - Represents a single JSX element

 - Corresponds to the actual object created by JSX at runtime

 - TypeScript type that describes that object

 - ❌ Cannot be a string or number

 - ❌ Cannot be an array

 - Used when you expect exactly one React element

## ReactNode

- A TypeScript type only

- Represents anything React can render

- Includes React elements, strings, numbers, booleans, null, undefined, and arrays

- ✅ Can be a string or number

- ✅ Can be an array of renderables

- Used when you want to allow flexible renderable content (e.g. children)
*/

// <Image source={require('@/assets/images/header.png')} /> require() for local assets
// <Image source={{ uri: 'https://example.com/image.png' }} /> { uri } for remote assets

"use client";
import { memo, useCallback, useEffect, useState } from "react";
import "./styles.css";

export default function Accordion() {
  const [expandedID, setExpandedID] = useState<number | null>(null);
  const [accordionData, setAccordionData] = useState<{ id: number; text: string; desc: string }[]>([]);

  useEffect(() => {
    setAccordionData([
      { id: 1, text: "first", desc: "first accordion desc" },
      { id: 2, text: "second", desc: "second accordion desc" },
      { id: 3, text: "third", desc: "third accordion desc" },
    ]);
  }, []);

  // using ucCallback so that onClick reference should not change on every render
  const onClick = useCallback((id: number) => {
    setExpandedID((prevId) => prevId === id ? null : id);
  }, []);

  return (
    <div className="accordionWrapper">
      {accordionData.map((item) => {
        return (
          <AccordionItem
            item={item}
            key={item.id}
            isExpanded={expandedID === item.id}
            onClickHandle={onClick}
          />
        );
      })}
    </div>
  );
}

// eslint-disable-next-line react/display-name
const AccordionItem = memo(({
    item,
    isExpanded,
    onClickHandle,
  }: {
    item: { id: number; text: string; desc: string };
    isExpanded: boolean;
    onClickHandle: (id: number) => void;
  }) => {
    return (
      <div className="accordionItem" onClick={() => onClickHandle(item.id)}>
        <div>{item.text}</div>
        {isExpanded && <div>{item.desc}</div>}
      </div>
    );
  })
