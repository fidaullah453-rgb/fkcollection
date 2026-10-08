export default function CustomerReviews(){
  const reviews = [
    {name:"Ahmed Khan", city:"Lahore", text:"Watch quality zabardast hai! Original jaisi lagti hai, sab poch rahe hain kahan se li!", time:"2 din pehle"},
    {name:"Bilal Ahmed", city:"Karachi", text:"FK Collection best hai! 3rd watch li hai, har bar fast delivery. COD best option hai.", time:"5 din pehle"},
    {name:"Usman Ali", city:"Islamabad", text:"Premium packaging or watch dono A1! Price ke hisab se bohat achi deal hai. Recommended!", time:"1 hafta pehle"},
    {name:"Faisal Raza", city:"Multan", text:"7 days return ka bola tha, lekin return ki zarorat hi nahi padi. Quality 10/10!", time:"1 hafta pehle"},
  ]
  return(
    <div className="bg-gray-50 py-12 px-4">
      <h2 className="text-2xl font-black text-center">WHAT OUR CUSTOMERS SAY</h2>
      <p className="text-center text-gray-500 text-sm mt-1 font-bold">Trusted by 10,000+ Customers in Pakistan</p>
      <div className="flex justify-center gap-1 mt-3 text-yellow-500 text-xl">★★★★★ <span className="text-black font-black text-sm ml-2">4.9/5 (2,847 Reviews)</span></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
        {reviews.map((r,i)=>(
          <div key={i} className="bg-white p-5 rounded-2xl shadow border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">{r.name[0]}</div>
              <div>
                <p className="font-black text-sm">{r.name} <span className="text-green-600 text-[10px] bg-green-100 px-2 py-0.5 rounded-full ml-1">✓ Verified Buyer</span></p>
                <p className="text-[11px] text-gray-500 font-bold">{r.city} - {r.time}</p>
              </div>
            </div>
            <p className="text-yellow-500 text-sm mt-3">★★★★★</p>
            <p className="text-sm mt-2 font-medium leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}
