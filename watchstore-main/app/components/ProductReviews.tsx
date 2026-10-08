"use client";
import { useState, useEffect } from "react";

export default function ProductReviews({ productId }: any) {
  const [reviews, setReviews] = useState<any>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", rating: 5, text: "" });

  useEffect(() => {
    const saved = localStorage.getItem(`fk_reviews_${productId}`);
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, [productId]);

  const submitReview = () => {
    if (!form.name ||!form.text) return alert("Name aur Review likho");
    const newReview = {
      name: form.name,
      city: form.city || "Pakistan",
      days: "Abhi",
      rating: form.rating,
      text: form.text,
      logo: form.name.charAt(0).toUpperCase()
    };
    const updated = [newReview,...reviews];
    setReviews(updated);
    localStorage.setItem(`fk_reviews_${productId}`, JSON.stringify(updated));
    setForm({ name: "", city: "", rating: 5, text: "" });
    setShowForm(false);
  };

  const avgRating = reviews.length > 0? (reviews.reduce((a:any,b:any)=> a+b.rating,0) / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Customer Reviews</h3>
        <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
          ★ {reviews.length} Reviews
        </span>
      </div>

      <div className="flex items-center gap-3 mb-5 bg-gray-50 p-3 rounded-2xl">
        <span className="text-3xl font-bold">{avgRating}</span>
        <div>
          <div className="text-yellow-500">{reviews.length > 0? "★★★★★" : "☆☆☆☆☆"}</div>
          <p className="text-[11px] text-gray-500 font-bold">Based on {reviews.length} real ratings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto bg-neutral-900 text-white px-4 py-2 rounded-full text-xs font-bold"
        >
          {showForm? "Close" : "Write Review"}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-2xl mb-5 border-2 border-dashed border-gray-300">
          <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} placeholder="Apka Naam" className="w-full p-3 rounded-xl border text-sm mb-2" />
          <input value={form.city} onChange={(e) => setForm({...form, city: e.target.value })} placeholder="City (Karachi, Lahore)" className="w-full p-3 rounded-xl border text-sm mb-2" />
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setForm({...form, rating: s })} className={s <= form.rating? "text-yellow-500 text-xl" : "text-gray-300 text-xl"}>★</button>
            ))}
          </div>
          <textarea value={form.text} onChange={(e) => setForm({...form, text: e.target.value })} placeholder="Apna review likho..." className="w-full p-3 rounded-xl border text-sm h-20"></textarea>
          <button onClick={submitReview} className="w-full mt-2 bg-black text-white py-3 rounded-full font-bold text-sm">Submit Review</button>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0? (
          <p className="text-center text-sm text-gray-500 py-6 font-bold">
            Abhi koi review nahi - Pehla review aap likho! 👇
          </p>
        ) : (
          reviews.map((r: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">{r.logo}</div>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-[11px] text-gray-500 font-bold">{r.city} - {r.days}</p>
                </div>
              </div>
              <div className="text-yellow-500 text-sm mt-2">{"★".repeat(r.rating)}</div>
              <p className="text-sm font-bold mt-2 italic">"{r.text}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
