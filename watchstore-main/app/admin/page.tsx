"use client";
import { useState, useEffect } from "react";

type Product = { id:number, name:string, price:number, image:string, category:string, stock:number };

const defaultProducts: Product[] = [
  { id: 1, name: "FK Classic Men", price: 3200, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", category: "Men", stock: 10 },
  { id: 2, name: "FK Elegant Women", price: 2800, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600", category: "Women", stock: 15 },
];

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Men", stock: "10" });

  useEffect(()=>{
    const saved = localStorage.getItem("fk_products");
    if(saved) setProducts(JSON.parse(saved));
  },[]);
  useEffect(()=>{
    localStorage.setItem("fk_products", JSON.stringify(products));
  },[products]);

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({...form, image: reader.result as string});
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if(!form.name ||!form.price ||!form.image) return alert("Name, Price, Image zaroori hai!");
    if(editId){
      setProducts(products.map(p=> p.id===editId? {...p, name:form.name, price:Number(form.price), image:form.image, category:form.category, stock:Number(form.stock)} : p));
      setEditId(null);
    } else {
      setProducts([{id:Date.now(), name:form.name, price:Number(form.price), image:form.image, category:form.category, stock:Number(form.stock)},...products]);
    }
    setForm({name:"", price:"", image:"", category:"Men", stock:"10"});
    setShow(false);
  };

  const handleEdit = (p:Product) => {
    setForm({name:p.name, price:String(p.price), image:p.image, category:p.category, stock:String(p.stock)});
    setEditId(p.id);
    setShow(true);
  };

  if (!login) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
          <h1 className="text-[#1877F2] text-3xl font-black text-center mb-2">fk collection</h1>
          <p className="text-center text-gray-500 mb-6 text-sm">Admin Login</p>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="w-full border-2 rounded-xl p-3 bg-[#f0f2f5] outline-none focus:border-blue-500" />
          <button onClick={()=> pw==="FK1234"?setLogin(true):alert("Wrong Password! Password is FK1234")} className="w-full bg-[#1877F2] text-white py-3 rounded-xl mt-4 font-bold hover:bg-blue-700">Log in</button>
          <p className="text-center text-xs text-gray-400 mt-3">Password: FK1234</p>
        </div>
      </div>
    );
  }

  const filtered = products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <div className="bg-white shadow sticky top-0 z-10 p-3 flex justify-between items-center">
        <h1 className="text-[#1877F2] text-xl font-black">fk collection <span className="text-black font-normal text-sm">ADMIN</span></h1>
        <div className="flex gap-2">
          <a href="/" className="bg-gray-200 px-4 py-2 rounded-full text-sm font-bold">View Site</a>
          <button onClick={()=>setLogin(false)} className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold">Logout</button>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-2xl font-black">{products.length}</p><p className="text-xs text-gray-500">Total Products</p></div>
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-2xl font-black">Rs. {products.reduce((a,b)=>a+b.price,0)}</p><p className="text-xs text-gray-500">Total Value</p></div>
          <div className="bg-white rounded-xl p-4 shadow text-center"><p className="text-2xl font-black">{products.filter(p=>p.category==="Men").length}</p><p className="text-xs text-gray-500">Men Watches</p></div>
        </div>

        <div className="bg-white rounded-xl shadow p-3 mb-4 flex gap-3 items-center">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="flex-1 bg-[#f0f2f5] rounded-full px-4 py-2 outline-none" />
          <button onClick={()=>{setShow(true); setEditId(null); setForm({name:"",price:"",image:"",category:"Men",stock:"10"})}} className="bg-[#1877F2] text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">+ Add Product</button>
        </div>

        {show && (
          <div className="bg-white rounded-xl shadow p-5 mb-4 border-2 border-blue-200">
            <h2 className="font-bold text-lg mb-3">{editId? "Edit Product" : "Add New Product"}</h2>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Watch Name (e.g. FK Royal Black)" className="w-full border p-3 rounded-xl mb-2" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} type="number" placeholder="Price Rs." className="w-full border p-3 rounded-xl mb-2" />
              <input value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} type="number" placeholder="Stock Qty" className="w-full border p-3 rounded-xl mb-2" />
            </div>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border p-3 rounded-xl mb-2">
              <option>Men</option><option>Women</option><option>Kids</option><option>Couple</option><option>Smart</option>
            </select>
            <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Image Link (https://...)" className="w-full border p-3 rounded-xl mb-2" />
            <p className="text-center text-xs my-1">OR</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-3 rounded-xl mb-2" />
            {form.image && <img src={form.image} className="w-full h-48 object-cover rounded-xl mb-2" />}
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 bg-[#1877F2] text-white py-3 rounded-xl font-bold">{editId?"Update":"Post"} Product</button>
              <button onClick={()=>setShow(false)} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid gap-3">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-xl shadow overflow-hidden flex">
              <img src={p.image} className="w-28 h-28 object-cover" />
              <div className="p-3 flex-1">
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.category} • Stock: {p.stock}</p>
                <p className="font-black text-[#1877F2]">Rs. {p.price}</p>
              </div>
              <div className="p-2 flex flex-col gap-1 justify-center">
                <button onClick={()=>handleEdit(p)} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Edit</button>
                <button onClick={()=>{if(confirm("Delete?")) setProducts(products.filter(x=>x.id!==p.id))}} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
