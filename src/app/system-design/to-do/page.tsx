"use client";
import { useEffect, useState } from "react";
import "./styles.css";
const api_endpoint = "https://dummyjson.com/todos";
export default function ToDo() {
  const { todos,isLoading } = useToDos();

  if(isLoading){
    return <div className="to-do-wrapper">Loading....</div>
  }

  return (
    <div className="to-do-wrapper">
      {todos.map((item: any) => {
        return <div key={item?.id}>{item?.todo}</div>;
      })}
    </div>
  );
}

const useToDos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetch(api_endpoint)
      .then((res) => res.json())
      .then((res) => setTodos(res.todos)).finally(()=>{
         setIsLoading(false)
      })
  }, []);
  return { todos,isLoading };
};
