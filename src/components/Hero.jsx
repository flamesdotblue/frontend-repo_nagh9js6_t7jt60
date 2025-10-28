import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Soft gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/10 text-white/80 text-xs mb-4 backdrop-blur">
            Street-made • Planet-minded • Limitless self-expression
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-blue-300">
            Meetzzz
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Custom hoodies with a glassy, modern edge. Build your statement piece in seconds, rock it for seasons.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#customize" className="px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-semibold shadow-[0_0_40px] shadow-blue-500/20 transition">
              Design Your Hoodie Now
            </a>
            <a href="#gallery" className="px-6 py-3 rounded-md border border-white/15 hover:border-white/25 text-white/90 hover:text-white transition backdrop-blur bg-white/5">
              Explore Designs
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        >
          {["/images/hoodie1.jpg","/images/hoodie2.jpg","/images/hoodie3.jpg","/images/hoodie4.jpg","/images/hoodie5.jpg","/images/hoodie6.jpg"].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1695740633675-d060b607f5c4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjE1MDAxMzd8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
