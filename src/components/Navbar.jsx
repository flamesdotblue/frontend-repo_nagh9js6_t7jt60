import { ShoppingCart, Instagram, Twitter } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-500 to-blue-300" />
          <span className="text-white text-lg font-semibold tracking-wide group-hover:text-blue-400 transition-colors">Meetzzz</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#customize" className="text-white/80 hover:text-white transition-colors">Customize</a>
          <a href="#gallery" className="text-white/80 hover:text-white transition-colors">Gallery</a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="p-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#checkout" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-medium transition-colors">
            <ShoppingCart size={18} />
            <span>Checkout</span>
          </a>
        </div>
      </div>
    </header>
  );
}
