import { motion } from "framer-motion";
import { Star, Shield, Truck, CreditCard } from "lucide-react";

const reviews = [
  {
    name: "Ava R.",
    text: "Insane quality and the print is super crisp. Wore it to a show and got asked where it's from like 6 times.",
    rating: 5,
  },
  {
    name: "Jay K.",
    text: "Love the fit. Minimal but makes a statement. The customization was easy and the preview was accurate.",
    rating: 5,
  },
  {
    name: "Mika P.",
    text: "Sustainably made and feels premium. My go-to hoodie now.",
    rating: 5,
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600267175164-c7a2a7c3b05f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548883354-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
];

export default function Showcase() {
  return (
    <div className="bg-black">
      <Gallery />
      <About />
      <Reviews />
      <Checkout />
      <Footer />
    </div>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Featured & Community Creations</h3>
          <p className="text-white/60 mt-2">Real looks from the Meetzzz community. Tag us to get featured.</p>
        </div>
        <a href="#customize" className="hidden sm:inline-flex px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-medium">Create Yours</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((src, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src={src} alt="Meetzzz gallery" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">The Meetzzz Story</h3>
          <p className="text-white/70 mt-4 leading-relaxed">
            Born from late-night sketches and city lights, Meetzzz blends street culture with sustainable craftsmanship. Our hoodies are made with responsibly sourced cotton and recycled blends, dyed with eco-friendly pigments, and produced in small batches to reduce waste.
          </p>
          <p className="text-white/70 mt-4">
            We believe self-expression should feel good—on you and for the planet. Every piece is built to last, designed to be reimagined.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-xs">Low-impact dyes</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-xs">Ethical supply chain</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-xs">Carbon offset shipping</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-transparent">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop" alt="Sustainable materials" className="w-full h-full object-cover mix-blend-screen opacity-80" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Loved by creators</h3>
          <p className="text-white/60 mt-2">What our community says</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-1 text-blue-400 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={16} fill="#60a5fa" className="text-blue-400" />
              ))}
            </div>
            <p className="text-white/80">“{r.text}”</p>
            <p className="text-white/50 text-sm mt-4">— {r.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Checkout() {
  return (
    <section id="checkout" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Shipping Information</h3>
          <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="First name" required />
              <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Last name" required />
            </div>
            <input className="w-full px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Email" type="email" required />
            <input className="w-full px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Phone" type="tel" />
            <input className="w-full px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Address" required />
            <div className="grid sm:grid-cols-3 gap-4">
              <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="City" required />
              <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="State" required />
              <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="ZIP" required />
            </div>
          </form>

          <div className="pt-4 grid sm:grid-cols-3 gap-3 text-white/80">
            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2"><Shield size={18}/> Encrypted checkout</div>
            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2"><Truck size={18}/> Global shipping</div>
            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2"><CreditCard size={18}/> Pay with card</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10" />
              <div className="flex-1">
                <p className="text-white">Custom Hoodie</p>
                <p className="text-white/60 text-sm">Color: Electric | Size: M | Placement: Front</p>
              </div>
              <p className="text-white font-semibold">$69</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div className="flex justify-between"><span>Subtotal</span><span>$69.00</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$6.00</span></div>
              <div className="flex justify-between"><span>Tax</span><span>$0.00</span></div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-white"><span>Total</span><span className="font-semibold">$75.00</span></div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Payment</h3>
            <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
              <input className="w-full px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Cardholder name" required />
              <input className="w-full px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="Card number" required />
              <div className="grid grid-cols-2 gap-4">
                <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="MM/YY" required />
                <input className="px-3 py-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30" placeholder="CVC" required />
              </div>
              <button className="w-full mt-2 px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-semibold transition">Pay $75.00</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-white font-semibold text-lg">Meetzzz</h4>
          <p className="text-white/60 text-sm mt-2 max-w-md">Join the newsletter for drops, inspo, and early access to limited colorways.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@domain.com" className="flex-1 px-3 py-2 rounded-md bg-black/60 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-medium">Subscribe</button>
          </form>
        </div>
        <div className="text-white/60 text-sm md:text-right flex md:block flex-col gap-3">
          <p>© {new Date().getFullYear()} Meetzzz. All rights reserved.</p>
          <p className="text-white/40">Made with love for creators and the planet.</p>
        </div>
      </div>
    </footer>
  );
}
