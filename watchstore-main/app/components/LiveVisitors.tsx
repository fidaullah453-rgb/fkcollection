"use client";
import { useState, useEffect } from "react";

export default function LiveVisitors(){
  const [count, setCount] = useState(24);

  useEffect(()=>{
    setCount(Math.floor(Math.random()*20)+15);
    const i = setInterval(()=>{
      setCount(p => p + (Math.random()>0.5?1:-1));
    },2500);
    return ()=> clearInterval(i);
  },[]);

  return(
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full w-fit">
      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
      <p className="text-xs font-black text-red-700">🔴 {count} log abhi dekh rahe hain</p>
    </div>
  )
}
