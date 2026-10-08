export default function Footer(){
  const wa="https://wa.me/923099956578";
  return(
    <footer className="bg-neutral-950 text-neutral-400 mt-0 pt-14 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-white text-lg font-semibold tracking-[0.15em]">FK COLLECTION</p>
          <p className="text-sm leading-relaxed mt-3 max-w-sm">Premium watch deals with rings and bracelets, packed in a gift box and delivered all over Pakistan.</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-3">Shop</p>
          <ul className="space-y-2 text-sm"><li><a href="/#products" className="hover:text-white">All watches</a></li><li><a href="/checkout" className="hover:text-white">My cart</a></li><li><a href="/#faq" className="hover:text-white">FAQ</a></li></ul>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm"><li><a href={wa} target="_blank" className="hover:text-white">WhatsApp: 0309 9956578</a></li><li>Swat, Pakistan</li><li>Cash on delivery available</li></ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row gap-3 justify-between text-xs">
        <p>© {new Date().getFullYear()} FK Collection. All rights reserved.</p>
        <p className="flex gap-3"><span className="border border-white/20 rounded px-2 py-0.5">COD</span><span className="border border-white/20 rounded px-2 py-0.5">Easypaisa</span><span className="border border-white/20 rounded px-2 py-0.5">JazzCash</span></p>
      </div>
    </footer>
  )
}
