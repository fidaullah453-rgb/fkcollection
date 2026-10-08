"use client";
import { useParams } from "next/navigation";
import { products } from "@/app/data/products";
import { useState, useEffect, useRef } from "react";
import Rating from "@/app/components/Rating";
import ProductReviews from "@/app/components/ProductReviews";
import Footer from "@/app/components/Footer";

export default function ProductPage(){
  const params = useParams();
  const id = params.id as string;
  const product = products.find(p => String(p.id) === String(id));
  const [added, setAdded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [active, setActive] = useState(0);
  const touchX = useRef(0);

  useEffect(()=>{
    const s = localStorage.getItem("fk_cart");
    if(s) setCartCount(JSON.parse(s).reduce((a:any,b:any)=>a+b.qty,0));
  },[]);

  if(!product) return <div className="p-10 text-center font-bold">Product not found</div>;

  const gallery: string[] = ((product as any).images?.length ? (product as any).images : [product.image]).slice(0,5);
  const go = (d:number) => setActive(a => (a + d + gallery.length) % gallery.length);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("fk_cart") || "[]");
    const found = cart.find((c:any) => c.id === product.id);
    let newCart = found? cart.map((c:any)=> c.id === product.id? {...c, qty: c.qty+1} : c) : [...cart, {...product, qty: 1}];
    localStorage.setItem("fk_cart", JSON.stringify(newCart));
    setCartCount(newCart.reduce((a:any,b:any)=>a+b.qty,0));
    setAdded(true); setTimeout(()=> setAdded(false), 2000);
  };

  // === YAHAN CHANGE - AB DIRECT CHECKOUT WALA FORM ===
  const handleBuyNow = () => {
    const cart = JSON.parse(localStorage.getItem("fk_cart") || "[]");
    const found = cart.find((c:any) => c.id === product.id);
    let newCart = found? cart.map((c:any)=> c.id === product.id? {...c, qty: c.qty+1} : c) : [...cart, {...product, qty: 1}];
    localStorage.setItem("fk_cart", JSON.stringify(newCart));
    window.location.href = '/checkout';
  };

  return(
    <div className="min-h-screen bg-white text-black">
      <header className="bg-white/90 backdrop-blur text-neutral-900 border-b border-neutral-200 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <a href="/" className="flex items-center gap-2"><img src="/logo.png" className="w-10 h-10 rounded-full border border-neutral-200 object-contain" alt="logo"/><span className="font-bold">FK COLLECTION</span></a>
        <a href="/checkout" className="bg-neutral-900 text-white hover:bg-black px-5 py-2 rounded-full font-semibold text-sm transition">Cart ({cartCount})</a>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-100"
            onTouchStart={e=>{touchX.current=e.touches[0].clientX}}
            onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touchX.current; if(Math.abs(d)>50 && gallery.length>1) go(d<0?1:-1)}}>
            <img src={gallery[active]} className="w-full h-[380px] md:h-[560px] object-cover" alt={product.name + " photo " + (active+1)} />
            {gallery.length>1 && <>
              <button onClick={()=>go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow text-xl">‹</button>
              <button onClick={()=>go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow text-xl">›</button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">{active+1} / {gallery.length}</span>
            </>}
          </div>
          {gallery.length>1 && <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {gallery.map((g,i)=>(
              <button key={i} onClick={()=>setActive(i)} aria-label={"Photo "+(i+1)} className={"shrink-0 rounded-xl overflow-hidden border-2 transition "+(i===active?"border-neutral-900":"border-transparent opacity-70 hover:opacity-100")}>
                <img src={g} loading="lazy" className="w-16 h-16 md:w-20 md:h-20 object-cover" alt="" />
              </button>
            ))}
          </div>}
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-2"><Rating /></div>
          <p className="text-2xl font-bold mt-4">Rs. {product.price}</p>

          <div className="mt-6">
            <h3 className="font-bold text-sm tracking-widest">DESCRIPTION</h3>
            <p className="text-black/70 text-[14px] mt-2 leading-6">{product.description}</p>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-2xl border">
            <h3 className="font-bold text-sm tracking-widest">FEATURES</h3>
            <ul className="mt-3 space-y-2">
              {product.features.map((f:any,i:any)=><li key={i} className="text-[13px] flex gap-2"><span>✓</span> {f}</li>)}
            </ul>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={addToCart} className="flex-1 border border-neutral-900 py-3.5 rounded-full font-semibold hover:bg-neutral-100 transition">ADD TO CART</button>
            <button onClick={handleBuyNow} className="flex-1 bg-neutral-900 text-white py-3.5 rounded-full font-semibold hover:bg-amber-500 hover:text-black transition">BUY NOW</button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 text-center text-[11px] font-medium text-neutral-600">
            <div className="bg-neutral-50 rounded-xl p-3">🚚<p className="mt-1">Free delivery Rs.5000+</p></div>
            <div className="bg-neutral-50 rounded-xl p-3">💵<p className="mt-1">Cash on delivery</p></div>
            <div className="bg-neutral-50 rounded-xl p-3">↩️<p className="mt-1">7 days return</p></div>
          </div>
          <ProductReviews productId={product.id} />
        </div>
      </div>

      <Footer />
      <div className="md:hidden h-20" />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 p-3 flex items-center gap-3">
        <div className="mr-auto"><p className="text-[11px] text-neutral-500">Price</p><p className="font-bold">Rs. {product.price}</p></div>
        <button onClick={addToCart} className="border border-neutral-900 px-5 py-3 rounded-full text-sm font-semibold">Add</button>
        <button onClick={handleBuyNow} className="bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold">Buy Now</button>
      </div>
      {added && <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl z-[100]">Added to Cart ✓</div>}
    </div>
  )
}
