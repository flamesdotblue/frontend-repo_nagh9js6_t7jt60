import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Palette, Type, Ruler } from "lucide-react";

const COLORS = [
  { name: "Jet Black", value: "#0b0b0b" },
  { name: "Storm Grey", value: "#2f2f35" },
  { name: "Ice White", value: "#f5f7fa" },
  { name: "Electric Blue", value: "#00a6ff" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export default function Customizer() {
  const canvasRef = useRef(null);
  const [hoodieColor, setHoodieColor] = useState(COLORS[0].value);
  const [size, setSize] = useState("M");
  const [placement, setPlacement] = useState("front-center");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Hoodie base (simple mockup)
    ctx.fillStyle = hoodieColor;
    const baseW = w * 0.6;
    const baseH = h * 0.7;
    const x = (w - baseW) / 2;
    const y = (h - baseH) / 2;

    // Body
    roundRect(ctx, x, y, baseW, baseH, 24, true, false);

    // Hood
    roundRect(ctx, x + baseW * 0.15, y - baseH * 0.18, baseW * 0.7, baseH * 0.28, 20, true, false);

    // Pockets
    ctx.fillStyle = shadeColor(hoodieColor, -10);
    roundRect(ctx, x + baseW * 0.25, y + baseH * 0.62, baseW * 0.5, baseH * 0.14, 16, true, false);

    // Draw uploaded image if present
    const area = getPlacementArea(x, y, baseW, baseH, placement);
    if (imageObj) {
      const aspect = imageObj.width / imageObj.height;
      let drawW = area.w;
      let drawH = drawW / aspect;
      if (drawH > area.h) {
        drawH = area.h;
        drawW = drawH * aspect;
      }
      const dx = area.x + (area.w - drawW) / 2;
      const dy = area.y + (area.h - drawH) / 2;
      ctx.drawImage(imageObj, dx, dy, drawW, drawH);
    }

    // Draw text
    if (text.trim()) {
      ctx.fillStyle = hoodieColor === "#f5f7fa" ? "#0b0b0b" : "#ffffff";
      ctx.font = `bold ${Math.floor(area.h * 0.25)}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.slice(0, 18), area.x + area.w / 2, area.y + area.h / 2);
    }
  }, [hoodieColor, placement, text, imageObj]);

  function onImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    const img = new Image();
    img.onload = () => setImageObj(img);
    img.src = url;
  }

  return (
    <section id="customize" className="bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="aspect-square w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4">
            <canvas ref={canvasRef} width={900} height={900} className="w-full h-full rounded-xl bg-transparent" />
          </div>
          <p className="text-white/50 text-xs mt-3">Preview is for reference only. Final print is color accurate and high-resolution.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Customize Your Hoodie</h2>
            <p className="text-white/60 mt-2">Choose your colors, size, and make it uniquely yours with artwork or text.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm text-white/70 mb-1">Color</label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setHoodieColor(c.value)}
                  className={`relative w-10 h-10 rounded-full ring-2 transition ${hoodieColor === c.value ? "ring-blue-500" : "ring-white/10"}`}
                  style={{ backgroundColor: c.value }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Size</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-2 rounded-md border text-sm transition ${size === s ? "border-blue-500 text-white" : "border-white/10 text-white/70 hover:text-white"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Design Placement</label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="front-center">Front Center</option>
                <option value="front-left">Front Left Chest</option>
                <option value="back">Back</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 p-4 rounded-xl border border-dashed border-white/15 hover:border-white/25 bg-white/5 text-white/80 cursor-pointer">
              <span className="inline-flex items-center gap-2 text-sm font-medium"><Upload size={16}/> Upload Artwork</span>
              <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
              {image ? (
                <span className="text-xs text-white/50 truncate">{image}</span>
              ) : (
                <span className="text-xs text-white/50">PNG, JPG up to 10MB</span>
              )}
            </label>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <label className="block text-sm text-white/70 mb-2">Add Text</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your statement"
                  className="flex-1 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="inline-flex items-center gap-1 text-white/60 text-xs px-2 py-1 rounded bg-black/40 border border-white/10"><Type size={14}/> Bold</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-white/80">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Palette size={18}/> Premium eco-dyes</div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Ruler size={18}/> True-to-size fit</div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Palette size={18}/> Soft-touch fleece</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#checkout" className="px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-semibold transition">Add to Cart</a>
            <a href="#gallery" className="px-6 py-3 rounded-md border border-white/10 hover:border-white/20 text-white/90 hover:text-white transition">See Inspirations</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    radius = { tl: 0, tr: 0, br: 0, bl: 0, ...radius };
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function shadeColor(color, percent) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const newColor = (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  return `#${newColor}`;
}

function getPlacementArea(x, y, baseW, baseH, placement) {
  const areas = {
    "front-center": { x: x + baseW * 0.25, y: y + baseH * 0.28, w: baseW * 0.5, h: baseH * 0.22 },
    "front-left": { x: x + baseW * 0.12, y: y + baseH * 0.30, w: baseW * 0.22, h: baseH * 0.16 },
    back: { x: x + baseW * 0.18, y: y + baseH * 0.24, w: baseW * 0.64, h: baseH * 0.36 },
  };
  return areas[placement];
}
