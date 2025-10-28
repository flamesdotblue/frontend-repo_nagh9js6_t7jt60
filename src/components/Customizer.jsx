import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Palette, Type, Ruler, Eraser, Download } from "lucide-react";

const COLORS = [
  { name: "Jet Black", value: "#0b0b0b" },
  { name: "Storm Grey", value: "#2f2f35" },
  { name: "Graphite", value: "#1f2328" },
  { name: "Ice White", value: "#f5f7fa" },
  { name: "Electric Blue", value: "#00a6ff" },
  { name: "Neo Violet", value: "#7c3aed" },
  { name: "Cyber Lime", value: "#84cc16" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const TEXT_COLORS = ["#ffffff", "#000000", "#00a6ff", "#7c3aed", "#84cc16"];
const FONTS = ["Inter", "Manrope", "Geist", "IBM Plex Sans"];

export default function Customizer() {
  const canvasRef = useRef(null);
  const [hoodieColor, setHoodieColor] = useState(COLORS[0].value);
  const [size, setSize] = useState("M");
  const [placement, setPlacement] = useState("front-center");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState(TEXT_COLORS[0]);
  const [font, setFont] = useState(FONTS[0]);
  const [textScale, setTextScale] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [dragging, setDragging] = useState(null); // 'text' | 'image' | null
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [customPos, setCustomPos] = useState({ tx: 0.5, ty: 0.5, ix: 0.5, iy: 0.5 }); // normalized within area

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoodieColor, placement, text, textColor, font, textScale, imageObj, imageScale, customPos]);

  function draw() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    ctx.clearRect(0, 0, w, h);

    // Hoodie base
    ctx.fillStyle = hoodieColor;
    const baseW = w * 0.6;
    const baseH = h * 0.7;
    const x = (w - baseW) / 2;
    const y = (h - baseH) / 2;

    roundRect(ctx, x, y, baseW, baseH, 24, true, false);
    roundRect(ctx, x + baseW * 0.15, y - baseH * 0.18, baseW * 0.7, baseH * 0.28, 20, true, false);

    ctx.fillStyle = shadeColor(hoodieColor, -10);
    roundRect(ctx, x + baseW * 0.25, y + baseH * 0.62, baseW * 0.5, baseH * 0.14, 16, true, false);

    // Placement area
    const area = getPlacementArea(x, y, baseW, baseH, placement);

    // Draw image
    if (imageObj) {
      const aspect = imageObj.width / imageObj.height;
      let drawW = area.w * 0.9 * imageScale;
      let drawH = drawW / aspect;
      if (drawH > area.h * 0.9 * imageScale) {
        drawH = area.h * 0.9 * imageScale;
        drawW = drawH * aspect;
      }
      const dx = area.x + (area.w - drawW) * (customPos.ix || 0.5);
      const dy = area.y + (area.h - drawH) * (customPos.iy || 0.5);
      ctx.drawImage(imageObj, dx, dy, drawW, drawH);
    }

    // Draw text
    if (text.trim()) {
      ctx.fillStyle = textColor;
      const baseSize = Math.floor(area.h * 0.22 * textScale);
      ctx.font = `700 ${baseSize}px ${font}, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const tx = area.x + area.w * (customPos.tx || 0.5);
      const ty = area.y + area.h * (customPos.ty || 0.5);
      ctx.fillText(text.slice(0, 24), tx, ty);
    }

    // Optional: show placement bounds lightly for UX
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(area.x, area.y, area.w, area.h);
    ctx.setLineDash([]);
  }

  function onImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => setImageObj(img);
    img.src = url;
  }

  function onCanvasPointerDown(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) * (canvasRef.current.width / rect.width);
    const cy = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) * (canvasRef.current.height / rect.height);

    const area = getPlacementAreaByCanvas(canvasRef.current, placement);

    // Rough hit test: prefer text if present
    if (text.trim()) {
      setDragging("text");
      setOffset({ x: cx, y: cy });
      return;
    }
    if (imageObj) {
      setDragging("image");
      setOffset({ x: cx, y: cy });
    }
  }

  function onCanvasPointerMove(e) {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) * (canvasRef.current.width / rect.width);
    const cy = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) * (canvasRef.current.height / rect.height);

    const area = getPlacementAreaByCanvas(canvasRef.current, placement);

    const nx = (cx - area.x) / area.w;
    const ny = (cy - area.y) / area.h;

    const clamp = (v) => Math.max(0.05, Math.min(0.95, v));

    if (dragging === "text") {
      setCustomPos((p) => ({ ...p, tx: clamp(nx), ty: clamp(ny) }));
    } else if (dragging === "image") {
      // Position refers to top-left weight; keep it centered feel by mapping 0..1
      setCustomPos((p) => ({ ...p, ix: clamp(nx), iy: clamp(ny) }));
    }
  }

  function onCanvasPointerUp() {
    setDragging(null);
  }

  function resetDesign() {
    setText("");
    setTextColor(TEXT_COLORS[0]);
    setFont(FONTS[0]);
    setTextScale(1);
    setImageUrl(null);
    setImageObj(null);
    setImageScale(1);
    setCustomPos({ tx: 0.5, ty: 0.5, ix: 0.5, iy: 0.5 });
  }

  function downloadPNG() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "meetzzz-hoodie-preview.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  return (
    <section id="customize" className="bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="aspect-square w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4">
            <canvas
              ref={canvasRef}
              width={1000}
              height={1000}
              className="w-full h-full rounded-xl bg-transparent touch-none select-none"
              onMouseDown={onCanvasPointerDown}
              onMouseMove={onCanvasPointerMove}
              onMouseUp={onCanvasPointerUp}
              onTouchStart={onCanvasPointerDown}
              onTouchMove={onCanvasPointerMove}
              onTouchEnd={onCanvasPointerUp}
            />
          </div>
          <p className="text-white/50 text-xs mt-3">Drag text or artwork within the dashed area. Preview is illustrative; final print is high-res.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Customize Your Hoodie</h2>
            <p className="text-white/60 mt-2">Vibe out with colors, fonts, and placements. Upload art or say it loud in text.</p>
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
                <option value="sleeve-right">Right Sleeve</option>
                <option value="sleeve-left">Left Sleeve</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 p-4 rounded-xl border border-dashed border-white/15 hover:border-white/25 bg-white/5 text-white/80 cursor-pointer">
              <span className="inline-flex items-center gap-2 text-sm font-medium"><Upload size={16}/> Upload Artwork</span>
              <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
              {imageUrl ? (
                <span className="text-xs text-white/50 truncate">{imageUrl}</span>
              ) : (
                <span className="text-xs text-white/50">PNG, JPG up to 10MB</span>
              )}
              {imageUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-white/60">Scale</span>
                  <input type="range" min="0.5" max="2" step="0.05" value={imageScale} onChange={(e)=>setImageScale(parseFloat(e.target.value))} className="flex-1"/>
                  <button onClick={() => { setImageUrl(null); setImageObj(null); setImageScale(1); }} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-black/40 border border-white/10 text-white/70 hover:text-white"><Eraser size={14}/>Remove</button>
                </div>
              )}
            </label>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
              <label className="block text-sm text-white/70">Add Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your statement"
                className="w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-xs text-white/60 mb-1">Font</span>
                  <select value={font} onChange={(e)=>setFont(e.target.value)} className="w-full px-2 py-2 rounded-md bg-black/40 border border-white/10 text-white">
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <span className="block text-xs text-white/60 mb-1">Size</span>
                  <input type="range" min="0.6" max="1.6" step="0.05" value={textScale} onChange={(e)=>setTextScale(parseFloat(e.target.value))} className="w-full"/>
                </div>
              </div>
              <div>
                <span className="block text-xs text-white/60 mb-2">Color</span>
                <div className="flex items-center gap-2">
                  {TEXT_COLORS.map((c) => (
                    <button key={c} onClick={()=>setTextColor(c)} className={`w-6 h-6 rounded-full border ${textColor===c?"border-blue-400":"border-white/20"}`} style={{ backgroundColor: c }} aria-label={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-white/80">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Palette size={18}/> Premium eco-dyes</div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Ruler size={18}/> True-to-size fit</div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3"><Type size={18}/> High-res DTG print</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#checkout" className="px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 text-black font-semibold transition">Add to Cart</a>
            <a href="#gallery" className="px-6 py-3 rounded-md border border-white/10 hover:border-white/20 text-white/90 hover:text-white transition">See Inspirations</a>
            <button onClick={downloadPNG} className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-white/10 hover:border-white/20 text-white/90 backdrop-blur bg-white/5"><Download size={16}/> Download Preview</button>
            <button onClick={resetDesign} className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-white/10 hover:bg-white/15 text-white"><Eraser size={16}/> Reset</button>
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
    "sleeve-right": { x: x + baseW * 0.74, y: y + baseH * 0.35, w: baseW * 0.16, h: baseH * 0.36 },
    "sleeve-left": { x: x + baseW * 0.10, y: y + baseH * 0.35, w: baseW * 0.16, h: baseH * 0.36 },
  };
  return areas[placement];
}

function getPlacementAreaByCanvas(canvas, placement) {
  const w = canvas.width;
  const h = canvas.height;
  const baseW = w * 0.6;
  const baseH = h * 0.7;
  const x = (w - baseW) / 2;
  const y = (h - baseH) / 2;
  return getPlacementArea(x, y, baseW, baseH, placement);
}
