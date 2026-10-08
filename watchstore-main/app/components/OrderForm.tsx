"use client";
import { useState } from "react";

export default function OrderForm({ product, onClose }: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // order logic here
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert("Order Placed!");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Order: {product?.name}</h2>
          <button onClick={onClose} className="font-bold text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Your Name" className="w-full border p-3 rounded-lg" />
          <input required placeholder="Phone Number" className="w-full border p-3 rounded-lg" />
          <input required placeholder="Address" className="w-full border p-3 rounded-lg" />
          <button disabled={loading} className="w-full bg-black text-white p-3 rounded-lg">
            {loading ? "Placing..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
