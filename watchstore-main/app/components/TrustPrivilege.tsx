export default function TrustPrivilege(){
  return(
    <div className="bg-black text-white py-14 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 flex items-center justify-center mb-3">
            <span className="text-amber-400 text-2xl">✓</span>
          </div>
          <p className="font-bold tracking-widest text-sm">PREMIUM QUALITY</p>
          <p className="text-gray-400 text-xs mt-2 font-bold">100% Original Pieces</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 flex items-center justify-center mb-3">
            <span className="text-amber-400">◍</span>
          </div>
          <p className="font-bold tracking-widest text-sm">CASH ON DELIVERY</p>
          <p className="text-gray-400 text-xs mt-2 font-bold">Pay After Checking</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 flex items-center justify-center mb-3">
            <span className="text-amber-400 text-xl">↻</span>
          </div>
          <p className="font-bold tracking-widest text-sm">7 DAYS RETURN</p>
          <p className="text-gray-400 text-xs mt-2 font-bold">Easy & Free Return</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 flex items-center justify-center mb-3">
            <span className="text-amber-400 text-xl">✦</span>
          </div>
          <p className="font-bold tracking-widest text-sm">1 YEAR WARRANTY</p>
          <p className="text-gray-400 text-xs mt-2 font-bold">Machine Warranty</p>
        </div>

      </div>
    </div>
  )
}
