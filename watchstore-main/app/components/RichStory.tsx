export default function RichStory(){
  return(
    <div className="bg-[#faf6ef] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-amber-700 font-bold tracking-[0.3em] text-[11px] mb-4">OUR STORY</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] text-black">
            From Swat's heart<br/>
            <span className="font-serif italic font-light text-amber-700">to every</span><br/>
            favourite wrist.
          </h2>
          <p className="text-black/60 text-[14px] leading-relaxed mt-6 max-w-[400px]">
            FK Collection started with one idea - Everyone deserves a luxury watch without luxury price. We pack each deal with love - Watch, Rings & Bracelet - All in one premium box.
          </p>
          <p className="text-black/60 text-[14px] leading-relaxed mt-4 max-w-[400px]">
            Small details, big presence. That's why 2000+ customers trust FK.
          </p>
          <div className="flex gap-8 mt-8">
            <div><p className="text-3xl font-bold">2000+</p><p className="text-[11px] tracking-widest text-black/60">HAPPY CLIENTS</p></div>
            <div><p className="text-3xl font-bold">4.9★</p><p className="text-[11px] tracking-widest text-black/60">RATING</p></div>
            <div><p className="text-3xl font-bold">100%</p><p className="text-[11px] tracking-widest text-black/60">PREMIUM</p></div>
          </div>
        </div>
        <div className="relative">
          <img src="/rolex-gold.png" className="w-full h-[420px] object-cover rounded-[30px] shadow-2xl" alt="story"/>
          <div className="absolute -bottom-4 left-4 md:-left-6 bg-black text-white p-6 rounded-2xl shadow-xl max-w-[220px]">
            <p className="text-yellow-400 font-serif italic text-lg leading-tight">"A touch of time, redefined"</p>
            <p className="text-[10px] tracking-widest mt-2 text-white/60">- FK COLLECTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}
