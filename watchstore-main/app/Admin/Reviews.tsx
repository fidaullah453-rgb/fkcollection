"use client";
import { useState, useEffect } from "react";
import { products } from "@/app/data/products";

export default function AdminReviews(){
  const [allReviews, setAllReviews] = useState<any>([]);
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const ADMIN_PASS = "fk123"; // apna password yahan change kar sakte ho

  useEffect(()=>{
    if(isAuth){
      let collected: any = [];
      products.forEach((p:any)=>{
        const saved = localStorage.getItem(`fk_reviews_${p.id}`);
        if(saved){
          const revs = JSON.parse(saved);
          revs.forEach((r:any, idx:number)=>{
            collected.push({...r, productId: p.id, productName: p.name, index: idx});
          });
        }
      });
      setAllReviews(collected);
    }
  },[isAuth]);

  const deleteReview = (productId:any, index:number)=>{
    if(!confirm("Delete karna hai?")) return;
    const saved = JSON.parse(localStorage.getItem(`fk_reviews_${productId}`) || "[]");
    saved.splice(index, 1);
    localStorage.setItem(`fk_reviews_${productId}`, JSON.stringify(saved));
    setAllReviews(allReviews.filter((r:any)=>!(r.productId===productId && r.index===index)));
  };

  const deleteAll = ()=>{
    if(!confirm("Saare reviews delete?")) return;
    products.forEach((p:any)=> localStorage.removeItem(`fk_reviews_${p.id}`));
    setAllReviews([]);
  };

  if(!isAuth){
    return(
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center">
          <h1 className="font-black text-xl">FK ADMIN LOGIN</h1>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full mt-4 p-3 rounded-xl border" />
          <button onClick={()=> password===ADMIN_PASS? setIsAuth(true) : alert("Wrong Password")} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">LOGIN</button>
          <p className="text-[11px] text-gray-500 mt-3">Default: fk123</p>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center bg-black text-white p-4 rounded-2xl">
        <h1 className="font-black">FK REVIEWS ADMIN - {allReviews.length} Total</h1>
        <div className="flex gap-2">
          <button onClick={deleteAll} className="bg-red-600 px-4 py-2 rounded-full text-xs font-black">DELETE ALL</button>
          <a href="/" className="bg-white text-black px-4 py-2 rounded-full text-xs font-black">HOME</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-6 space-y-3">
        {allReviews.length===0? <p className="text-center font-bold text-gray-500 py-10">Abhi koi real review nahi aya</p> :
          allReviews.map((r:any,i:number)=>(
            <div key={i} className="border p-4 rounded-2xl flex justify-between items-start bg-gray-50">
              <div>
                <p className="font-black text-sm">{r.productName} (ID: {r.productId})</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-black text-xs">{r.logo}</div>
                  <p className="font-bold text-sm">{r.name} - {r.city}</p>
                  <span className="text-yellow-500 text-sm">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-sm mt-2 italic">"{r.text}"</p>
                <p className="text-[11px] text-gray-500 mt-1">{r.days}</p>
              </div>
              <button onClick={()=>deleteReview(r.productId, r.index)} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-black">DELETE</button>
            </div>
          ))
        }
      </div>
    </div>
  )
    }
