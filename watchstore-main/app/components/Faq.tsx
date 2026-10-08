export default function Faq(){
  const items=[
    ["How do I order?","Tap Buy Now, fill in your name, phone and address, and confirm. We contact you on WhatsApp to verify."],
    ["Can I pay on delivery?","Yes. Cash on delivery is available all over Pakistan. Easypaisa and JazzCash are also accepted."],
    ["Is delivery free?","Delivery is free on orders above Rs. 5000. Otherwise a small delivery charge applies."],
    ["What if I don't like the watch?","You get a 7-day return. Message us on WhatsApp and we will arrange it."],
  ];
  return(
    <section id="faq" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center tracking-tight mb-8">Questions? Answered.</h2>
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map(([q,a])=>(
            <details key={q} className="group py-4">
              <summary className="flex justify-between items-center cursor-pointer font-medium list-none">{q}<span className="text-xl text-neutral-400 group-open:rotate-45 transition">+</span></summary>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
