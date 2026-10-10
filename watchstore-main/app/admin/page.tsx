"use client";
import { useState } from "react";

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "FK Classic", price: 3200, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", category: "Men" },
  ]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Men" });

  if (!login) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-sm">
          <h1 className="text-[#1877F2] text-3xl font-bold text-center mb-6">fk collection</h1>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="w-full border rounded-lg p-3 bg-[#f0f2f5]" />
          <button onClick={()=> pw==="FK1234"?setLogin(true):alert("Wrong Password")} className="w-full bg-[#1877F2] text-white py-3 rounded-lg mt-4 font-bold">Log in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <div className="bg-white shadow p-3 flex justify-between">
        <h1 className="text-[#1877F2] text-xl font-bold">fk collection</h1>
        <a href="/" className="bg-gray-200 px-4 py-1 rounded-full text-sm">View Site</a>
      </div>
      <div className="max-w-[600px] mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">FK</div>
          <button onClick={()=>setShow(true)} className="flex-1 bg-[#f0f2f5] rounded-full text-left px-4 text-gray-500">Add new watch...</button>
        </div>
        {show && (
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Watch name" className="w-full border p-3 rounded-lg mb-2" />
            <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} type="number" placeholder="Price" className="w-full border p-3 rounded-lg mb-2" />
            <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image link" className="w-full border p-3 rounded-lg mb-2" />
            <button onClick={()=>{setProducts([{id:Date.now(),name:form.name,price:Number(form.price),image:form.image,category:form.category},...products]);setShow(false);setForm({name:"",price:"",image:"",category:"Men"})}} className="w-full bg-[#1877F2] text-white py-2 rounded-lg font-bold">Post</button>
          </div>
        )}
        {products.map(p=>(
          <div key={p.id} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className="p-3 font-bold">{p.name} - Rs. {p.price}</div>
            {p.image && <img src={p.image} className="w-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
