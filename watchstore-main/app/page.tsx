"use client";
import { useState, useEffect } from "react";
import Rating from "./components/Rating";
import TrustBadges from "./components/TrustBadges";
import TrustPrivilege from "./components/TrustPrivilege";
import RichStory from "./components/RichStory";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { products } from "./data/products";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function Home(){
  const [cart,setCart]=useState<any>([]);
  const [added,setAdded]=useState(false);
  const [addedName,setAddedName]=useState("");
  const [q,setQ]=useState(""); const [sort,setSort]=useState("pop"); const [wish,setWish]=useState<number[]>([]);
  useEffect(()=>{ try{ setWish(JSON.parse(localStorage.getItem("fk_wish")||"[]")); }catch{} },[]);
  const toggleWish=(id:number)=>{ const n=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id]; setWish(n); localStorage.setItem("fk_wish",JSON.stringify(n)); };
  const list=products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:a.id-b.id);

  useEffect(()=>{
    const s=localStorage.getItem("fk_cart");
    if(s) setCart(JSON.parse(s));
  },[]);

  const addToCart=(p:any, e?: any)=>{
    if(e){ e.preventDefault(); e.stopPropagation(); }
    const f=cart.find((c:any)=>c.id===p.id);
    let n;
    if(f){n=cart.map((c:any)=>c.id===p.id?{...c,qty:c.qty+1}:c)}
    else{n=[...cart,{...p,qty:1}]}
    setCart(n);
    localStorage.setItem("fk_cart",JSON.stringify(n));
    setAddedName(p.name);
    setAdded(true);
    setTimeout(()=>{ setAdded(false); }, 2000);
  };

  // === YAHAN CHANGE KIYA HAI - AB DIRECT CHECKOUT ===
  const openOrder = (p:any, e?: any) => {
    if(e){ e.preventDefault(); e.stopPropagation(); }
    const oldCart = JSON.parse(localStorage.getItem("fk_cart") || "[]");
    const found = oldCart.find((c:any)=>c.id===p.id);
    let newCart;
    if(found){
      newCart = oldCart.map((c:any)=> c.id===p.id? {...c, qty: c.qty+1} : c);
    } else {
      newCart = [...oldCart, {...p, qty: 1}];
    }
    localStorage.setItem("fk_cart", JSON.stringify(newCart));
    window.location.href = '/checkout';
  }

  const reviews = [
    {name:"Ahmed Khan", city:"Lahore", text:"Watch quality zabardast hai! Original jaisi lagti hai!", time:"2 din pehle"},
    {name:"Bilal Ahmed", city:"Karachi", text:"FK Collection best hai! 3rd watch li hai, har bar fast delivery.", time:"5 din pehle"},
    {name:"Usman Ali", city:"Islamabad", text:"Premium packaging or watch dono A1! Recommended!", time:"1 hafta pehle"},
    {name:"Faisal Raza", city:"Multan", text:"Quality 10/10! Return ki zarorat hi nahi padi.", time:"1 hafta pehle"},
  ]

  return(
    <div className="min-h-screen bg-white text-black">
      <header className="bg-white/90 backdrop-blur text-neutral-900 border-b border-neutral-200 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-10 h-10 rounded-full border border-neutral-200 object-contain" alt="logo"/>
          <span className="font-semibold text-lg tracking-[0.15em]">FK COLLECTION</span>
        </div>
        <button onClick={()=>window.location.href='/checkout'} className="bg-neutral-900 text-white hover:bg-black px-5 py-2 rounded-full font-semibold text-sm transition">Cart ({cart.reduce((a:any,b:any)=>a+b.qty,0)})</button>
      </header>

      <div className="relative h-[420px] md:h-[540px] bg-black w-full overflow-hidden">
        <img src="/banner.jpeg" className="w-full h-full object-cover" alt="banner"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-amber-300 text-xs tracking-[0.35em] font-semibold">PREMIUM WATCHES PAKISTAN</p><h1 className="text-white text-4xl md:text-6xl font-semibold mt-3 leading-tight px-4">Timeless style,<br/>honest prices.</h1>
          <a href="#products" className="mt-7 bg-white text-black hover:bg-amber-300 px-9 py-3.5 rounded-full font-semibold transition">Shop Now</a>
        </div>
      </div>

      

      <div id="products" className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mt-10 tracking-tight">Our Collection</h2>
        <p className="text-center text-neutral-500 text-sm mt-2 mb-6">Handpicked deals, gift box included</p>
        <div className="flex gap-2 mb-6 max-w-xl mx-auto">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search watches..." className="flex-1 border border-neutral-300 focus:border-black outline-none rounded-full px-5 py-2.5 text-sm" />
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border border-neutral-300 rounded-full px-4 py-2.5 text-sm bg-white"><option value="pop">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select>
        </div>
        {list.length===0 && <p className="text-center text-neutral-500 py-10">No watches found.</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map(p=>(
            <div key={p.id} className="relative group border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <button onClick={()=>toggleWish(p.id)} aria-label="Wishlist" className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-lg">{wish.includes(p.id)?<span className="text-red-500">♥</span>:<span className="text-neutral-400">♡</span>}</button>
              <a href={`/product/${p.id}`} className="block overflow-hidden"><img loading="lazy" decoding="async" src={p.image} className="h-48 md:h-60 w-full object-cover bg-neutral-100 group-hover:scale-105 transition duration-500" alt={p.name}/></a>
              <div className="p-3">
                <a href={`/product/${p.id}`}><p className="font-bold text-sm leading-tight min-h-[40px]">{p.name}</p></a>
                <Rating />
                <p className="font-semibold text-lg mt-1">Rs. {p.price}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={(e)=>addToCart(p, e)} className="flex-1 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white py-2.5 rounded-full text-[11px] font-semibold transition">ADD TO CART</button>
                  <button onClick={(e)=>openOrder(p, e)} className="flex-1 bg-neutral-900 text-white hover:bg-amber-500 hover:text-black py-2.5 rounded-full text-[11px] font-semibold transition">BUY NOW</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrustBadges />
      <TrustPrivilege />
      <div className="bg-neutral-50 py-16 px-4">
        <h2 className="text-3xl font-semibold text-center tracking-tight">WHAT OUR CUSTOMERS SAY</h2>
        <p className="text-center text-gray-500 text-sm mt-1 font-bold">Trusted by 10,000+ Customers</p>
        <div className="flex justify-center gap-1 mt-3 text-yellow-500 text-xl">★★★★★ <span className="text-black font-bold text-sm ml-2">4.9/5 (2,847 Reviews)</span></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
          {reviews.map((r,i)=>(
            <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">{r.name[0]}</div>
                <div>
                  <p className="font-bold text-sm">{r.name} <span className="text-green-600 text-[10px] bg-green-100 px-2 py-0.5 rounded-full ml-1">✓ Verified</span></p>
                  <p className="text-[11px] text-gray-500 font-bold">{r.city} - {r.time}</p>
                </div>
              </div>
              <p className="text-yellow-500 text-sm mt-3">★★★★★</p>
              <p className="text-sm mt-2 font-medium">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>

      <RichStory />
      <Faq />
      {added && (<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-5 py-3 rounded-full font-semibold text-sm shadow-2xl z-[100] flex items-center gap-3"><span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-base">✓</span><span>{addedName} - Added!</span></div>)}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
