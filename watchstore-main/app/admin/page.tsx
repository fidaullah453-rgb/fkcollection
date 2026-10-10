"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "FK Classic Leather", price: 3200, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", category: "Men", likes: 124 },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Men" });

  if (!login) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-[#1877F2] text-3xl font-bold text-center mb-6">fk collection</h1>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#f0f2f5] outline-none" />
          <button onClick={()=> pw==="FK1234"? setLogin(true) : alert("Wrong Password")} className="w-full bg-[#1877F2] text-white rounded-lg py-3 font-bold mt-4">Log in</button>
          <p className="text-xs text-center text-gray-500 mt-4">Password: FK1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <header className="bg-white shadow sticky top-0 z-10 px-4 py-2 flex justify-between items-center">
        <h1 className="text-[#1877F2] text-2xl font-bold">fk collection</h1>
        <div className="flex gap-2">
          <a href="/" className="bg-[#e4e6eb] px-4 py-2 rounded-full text-sm font-semibold">View Page</a>
          <button onClick={()=>setLogin(false)} className="bg-[#e4e6eb] px-4 py-2 rounded-full text-sm font-semibold">Logout</button>
        </div>
      </header>

      <div className="max-w-[600px] mx-auto p-2 md:p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold">FK</div>
            <button onClick={()=>setShowCreate(true)} className="flex-1 bg-[#f0f2f5] hover:bg-[#e4e6eb] text-left text-gray-500 rounded-full px-4 py-2.5">Add new watch, What's on your mind?</button>
          </div>
        </div>

        {showCreate && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px]">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-xl text-center flex-1">Create Product</h3>
                <button onClick={()=>setShowCreate(false)} className="w-8 h-8 bg-[#e4e6eb] rounded-full">✕</button>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold">FK</div>
                  <div><p className="font-semibold">FK Collection</p><p className="text-xs text-gray-500">🌎 Public</p></div>
                </div>
                <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Watch name? ex: FK Classic Leather" className="w-full text-xl outline-none placeholder:text-gray-500 mb-3" />
                <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} type="number" placeholder="Price in PKR? ex: 3200" className="w-full text-xl outline-none placeholder:text-gray-500 mb-3" />
                <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full bg-[#f0f2f5] rounded-lg p-3 outline-none mb-3">
                  <option>Men</option><option>Women</option><option>Couple</option>
                </select>
                <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} placeholder="Paste image link here" className="w-full bg-[#f0f2f5] rounded-lg p-3 outline-none mb-3" />
                {form.image && <img src={form.image} className="w-full h-64 object-cover rounded-lg mb-3" />}
                <button onClick={()=>{ if(!form.name ||!form.price) return alert("Name & Price likho"); setProducts([{id:Date.now(), name:form.name, price: Number(form.price), image:form.image || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", category:form.category, likes:0},...products]); setForm({name:"",price:"",image:"", category:"Men"}); setShowCreate(false); }} className="w-full bg-[#1877F2] text-white rounded-lg py-2.5 font-bold">Post</button>
              </div>
            </div>
          </div>
        )}

        {products.map(p=>(
          <div key={p.id} className="bg-white rounded-lg shadow mb-4">
            <div className="p-3 flex justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">FK</div>
                <div><p className="font-semibold">{p.name}</p><p className="text-xs text-gray-500">Just now · 🌎</p></div>
              </div>
              <button onClick={()=>setProducts(products.filter(x=>x.id!==p.id))} className="text-gray-500">✕</button>
            </div>
            <p className="px-3 pb-2">New Arrival 🔥 {p.name} only in Rs. {p.price} - DM to Order ❤️ #FKCollection</p>
            <img src={p.image} className="w-full h-auto bg-gray-100" />
            <div className="p-3 flex justify-between text-gray-500 text-sm border-b">
              <span>👍 {p.likes || 24} likes</span><span>5 comments · 2 shares</span>
            </div>
            <div className="flex justify-around p-1">
              <button className="flex-1 py-2 font-semibold text-gray-500">👍 Like</button>
              <button className="flex-1 py-2 font-semibold text-gray-500">💬 Comment</button>
              <button className="flex-1 py-2 font-semibold text-gray-500">↗️ Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
