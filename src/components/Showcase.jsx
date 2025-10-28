import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

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
      <CheckoutCTA />
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
          <div className="mt-6 flex gap-3">
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

function CheckoutCTA() {
  return (
    <section id="checkout" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to check out?</h3>
            <p className="text-white/70 mt-2">Secure payment powered by industry-standard encryption. 30-day returns. Global shipping.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <a href="#customize" className="px-5 py-3 rounded-md border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition">Back to Design</a>
            <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-semibold transition">
              <ShoppingCart size={18} />
              Secure Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-white font-semibold">Meetzzz</h4>
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
