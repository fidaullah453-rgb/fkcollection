"use client";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("COD");
  const [tid, setTid] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [sending, setSending] = useState(false);

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbwP9BI3Jd04FYyfDxSvvJp04uyNOBoHLA4BNadmmIP5peBD7WJcPSMdE_e4xDFHWaTgcA/exec";

  useEffect(()=>{
    const saved = localStorage.getItem("fk_cart");
    if(saved) setCart(JSON.parse(saved));
  },[]);

  const inc = (id:number) => {
    const newCart = cart.map((c:any)=> c.id===id? {...c, qty:c.qty+1}:c);
    setCart(newCart); localStorage.setItem("fk_cart", JSON.stringify(newCart));
  };
  const dec = (id:number) => {
    const newCart = cart.map((c:any)=> c.id===id? {...c, qty:Math.max(1,c.qty-1)}:c);
    setCart(newCart); localStorage.setItem("fk_cart", JSON.stringify(newCart));
  };
  const removeItem = (id:number) => {
    const newCart = cart.filter((c:any)=>c.id!==id);
    setCart(newCart); localStorage.setItem("fk_cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce((s:any,c:any)=>s+c.price*c.qty,0);
  const delivery = subtotal>5000?0:199;
  const total = subtotal+delivery;

  const validate = () => {
    const e: any = {};
    const p = phone.replace(/[\s-]/g, "");
    if(!/^(03\d{9}|\+923\d{9}|923\d{9})$/.test(p)) e.phone = "Enter a valid mobile number, e.g. 0300 1234567";
    if(name.trim().length < 3 || !/[A-Za-z\u0600-\u06FF]/.test(name)) e.name = "Please enter your full name";
    if(city.trim().length < 3) e.city = "Please enter your city";
    if(address.trim().length < 10) e.address = "Please enter your complete address (house no, street, area)";
    if((payment==="Easypaisa"||payment==="JazzCash") && !/^[A-Za-z0-9]{8,20}$/.test(tid.trim())) e.tid = "Enter the transaction ID from your payment SMS (8-20 letters/numbers)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const orderNow = async () => {
    if(sending) return;
    if(!validate()) return;
    
    if(cart.length===0){ alert("Cart empty hai"); return; }

    const items = cart.map((c:any)=> c.name + " x" + c.qty + " = Rs." + (c.price*c.qty)).join(", ");
    const orderData = {
      name: name, phone: phone, city: city, address: address,
      watch: items, price: subtotal,
      qty: cart.reduce((s:any,c:any)=>s+c.qty,0),
      delivery: delivery, total: total,
      payment: payment, tid: tid || "COD",
      date: new Date().toLocaleString()
    };

    // === DIRECT SUCCESS - NO WAIT ===
    setSending(true);
    setSuccess(true);
    localStorage.removeItem("fk_cart");

    // Sheet par background me order bhejo
    try{
      fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(orderData) });
    }catch(e){}

    setTimeout(()=>{
      setCart([]);
      window.location.href = "/";
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {success && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
              <span className="text-white text-4xl font-bold">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Order Confirmed!</h2>
            <p className="font-bold text-black">Rs.{total} - {payment} {tid? "- TID: "+tid : ""}</p>
            <p className="text-sm font-bold text-gray-600 mt-2">Shukriya {name}!</p>
            <p className="text-xs font-bold text-black mt-1">WE WILL CONTACT YOU ON WHATSAPP ✓</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-[1.2fr_0.8fr]">
        <div className="order-1 md:order-2 p-6 bg-neutral-50 border-b border-neutral-200 md:border-b-0 md:border-l md:min-h-screen">
          <h3 className="font-bold text-lg mb-4 text-black">Order Summary ({cart.length} items)</h3>
          {cart.length===0? <p className="text-black font-bold">Cart empty</p> :
            cart.map((c:any)=>
              <div key={c.id} className="flex gap-3 py-4 border-b border-gray-300">
                <div className="relative">
                  <img src={c.image} className="w-20 h-20 rounded-xl border border-neutral-200 object-cover" alt={c.name} />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">{c.qty}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-black">{c.name}</p>
                  <p className="text-sm font-bold text-black mt-1">Rs.{c.price*c.qty}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={()=>dec(c.id)} className="border border-neutral-300 bg-white w-8 h-8 rounded-lg font-semibold hover:bg-neutral-100">-</button>
                    <span className="text-sm font-bold">{c.qty}</span>
                    <button onClick={()=>inc(c.id)} className="border border-neutral-300 bg-white w-8 h-8 rounded-lg font-semibold hover:bg-neutral-100">+</button>
                    <button onClick={()=>removeItem(c.id)} className="ml-2 text-xs text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg font-semibold">Remove</button>
                  </div>
                </div>
              </div>
            )
          }
          <div className="mt-6 space-y-2 text-black">
            <div className="flex justify-between font-bold"><span>Subtotal</span><span>Rs.{subtotal}</span></div>
            <div className="flex justify-between font-bold"><span>Shipping</span><span>{delivery===0?'FREE':`Rs.${delivery}`}</span></div>
            <div className="flex justify-between font-bold text-xl border-t border-neutral-300 pt-3 mt-3"><span>Total</span><span>Rs.{total}</span></div>
          </div>
        </div>

        <div className="order-2 md:order-1 p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <b className="text-xl font-semibold tracking-[0.15em]">FK COLLECTION</b>
            <a href="/" className="underline text-sm font-bold">← Continue Shopping</a>
          </div>

          <h3 className="font-bold text-black mb-2">Contact</h3>
          <input type="tel" inputMode="tel" autoComplete="tel" maxLength={16} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" className="w-full border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl mb-6 text-black placeholder:text-neutral-400 font-bold bg-white" />{errors.phone&&<p className="text-red-600 text-xs -mt-4 mb-4">{errors.phone}</p>}

          <h3 className="font-bold text-black mb-2">Shipping address</h3>
          <input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl mb-3 text-black placeholder:text-neutral-400 font-bold bg-white" />{errors.name&&<p className="text-red-600 text-xs -mt-2 mb-3">{errors.name}</p>}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input autoComplete="address-level2" value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl text-black placeholder:text-neutral-400 font-bold bg-white" />
            <input placeholder="Postal Code" className="border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl text-black placeholder:text-neutral-400 font-bold bg-white" />
          </div>
          {errors.city&&<p className="text-red-600 text-xs -mt-1 mb-3">{errors.city}</p>}<textarea autoComplete="street-address" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Complete Address" className="w-full border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl text-black placeholder:text-neutral-400 font-bold bg-white" rows={4}></textarea>{errors.address&&<p className="text-red-600 text-xs mt-1">{errors.address}</p>}

          <h3 className="font-bold text-black mt-6 mb-2">Payment Method</h3>
          <select value={payment} onChange={e=>setPayment(e.target.value)} className="w-full border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-3.5 rounded-xl text-black font-bold bg-white mb-3">
            <option value="COD">💵 Cash on Delivery (COD)</option>
            <option value="Easypaisa">Easypaisa - 03415417696</option>
            <option value="JazzCash">JazzCash - 03415417696</option>
          </select>

          {(payment==="Easypaisa"||payment==="JazzCash") && (
            <div className="border border-amber-300 rounded-xl p-4 bg-amber-50 mb-3">
              <p className="font-bold text-sm text-black">Send Rs.{total} to 03415417696</p>
              <p className="text-xs text-black font-bold">Account: Fida Ullah - {payment}</p>
              <input value={tid} onChange={e=>setTid(e.target.value)} placeholder="TID / Transaction ID likho - Lazmi" className="w-full border border-neutral-300 focus:border-black outline-none p-3 rounded-xl mt-2 text-black font-bold bg-white" />{errors.tid&&<p className="text-red-600 text-xs mt-1">{errors.tid}</p>}
            </div>
          )}

          {payment==="COD" && (
            <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 mt-2 flex justify-between">
              <span className="font-bold text-sm text-black">💵 Cash on Delivery (COD)</span>
              <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold">Active</span>
            </div>
          )}

          {Object.keys(errors).length>0&&<p className="text-red-600 text-sm text-center mt-4">Please fix the fields marked in red above.</p>}
          <button disabled={sending} onClick={orderNow} className="w-full bg-neutral-900 hover:bg-black text-white py-4 rounded-xl mt-6 font-semibold text-lg shadow-lg shadow-black/10 transition active:scale-[.99]">
            COMPLETE ORDER - Rs.{total}
          </button>
          <p className="text-sm text-center text-black font-bold mt-3">WE WILL CONTACT YOU ON WHATSAPP ✓</p>
        </div>
      </div>
    </div>
  );
      }
