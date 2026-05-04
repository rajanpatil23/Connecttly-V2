import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";

/**
 * ImageResizerTool - Simplified
 * Client-side image resize + target file size compression.
 * Processing is 100% in browser.
 */

type Unit = "KB" | "MB";
type OutFmt = "image/jpeg" | "image/webp" | "image/png";

const fmtName: Record<OutFmt, string> = {
  "image/jpeg": "JPEG",
  "image/webp": "WEBP",
  "image/png": "PNG",
};

// Scroll-animated wrapper
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  
  return (
    <motion.div 
      ref={ref}
      style={{ scale }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      }}
      className="relative rounded-3xl"
    >
      {bgColor && <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />}
      <div className="relative rounded-3xl">{children}</div>
    </motion.div>
  );
};

function bytesPretty(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function unitToBytes(v: number, u: Unit) { 
  return Math.max(0, Math.round(v * (u === "KB" ? 1024 : 1024 * 1024))); 
}

function clamp(n: number, a: number, b: number) { 
  return Math.min(Math.max(n, a), b); 
}

async function fileToImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  await img.decode();
  URL.revokeObjectURL(url);
  return img;
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: OutFmt, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (type === "image/png") {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))), type);
    } else {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), type, quality);
    }
  });
}

async function resizeAndCompress(img: HTMLImageElement, opts: {
  outType: OutFmt;
  width: number;
  height: number;
  targetBytes?: number;
  bgColor?: string;
}): Promise<{ blob: Blob; width: number; height: number; quality?: number }>
{
  const { outType, width, height, targetBytes, bgColor } = opts;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  if (outType === "image/jpeg") {
    ctx.fillStyle = bgColor || "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  if (outType === "image/png" || !targetBytes) {
    const blob = await canvasToBlob(canvas, outType, 0.92);
    return { blob, width, height };
  }

  let lo = 0.2, hi = 0.95, bestQ = hi, bestBlob: Blob | null = null;
  for (let i = 0; i < 12; i++) {
    const q = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, outType, q);
    if (blob.size <= targetBytes) { 
      bestQ = q; 
      bestBlob = blob; 
      hi = q - 0.05; 
    } else { 
      lo = q + 0.05; 
      bestBlob = blob; 
    }
  }
  const finalBlob = bestBlob || (await canvasToBlob(canvas, outType, bestQ));
  return { blob: finalBlob, width, height, quality: bestQ };
}

export default function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState<string>("");
  const [targetVal, setTargetVal] = useState<number>(100);
  const [unit, setUnit] = useState<Unit>("KB");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [fmt, setFmt] = useState<OutFmt>("image/webp");
  const [bg, setBg] = useState<string>("#ffffff");
  const [outURL, setOutURL] = useState<string | null>(null);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [outDim, setOutDim] = useState<string>("");
  const [outQ, setOutQ] = useState<number | undefined>(undefined);
  const [fileName, setFileName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    return () => { 
      if (imgURL) URL.revokeObjectURL(imgURL); 
      if (outURL) URL.revokeObjectURL(outURL); 
    }; 
  }, [imgURL, outURL]);

  async function onPick(f: File) {
    setUploading(true);
    setFile(f);
    setFileName(f.name.replace(/\.[^.]+$/, "") + "-resized");
    setOrigSize(bytesPretty(f.size));
    
    // Simulate upload progress
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const img = await fileToImage(f);
    // Don't auto-populate width and height - keep them blank
    const url = URL.createObjectURL(f);
    setImgURL(url);
    setUploading(false);
  }

  function reset() {
    setOutURL(null); 
    setOutBlob(null); 
    setOutDim(""); 
    setOutQ(undefined); 
    setShowModal(false);
  }

  async function process() {
    if (!file || !width || !height) return;
    reset();
    setBusy(true);
    try {
      const img = await fileToImage(file);
      const targetBytes = targetVal > 0 ? unitToBytes(targetVal, unit) : undefined;
      const w = parseInt(width, 10);
      const h = parseInt(height, 10);
      
      const res = await resizeAndCompress(img, { 
        outType: fmt, 
        width: w, 
        height: h, 
        targetBytes, 
        bgColor: bg 
      });
      
      const url = URL.createObjectURL(res.blob);
      setOutURL(url); 
      setOutBlob(res.blob); 
      setOutDim(`${res.width} x ${res.height}`); 
      setOutQ(res.quality);
      setShowModal(true);
    } catch (e) {
      alert((e as Error).message || "Processing failed");
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!outBlob) return;
    const a = document.createElement("a");
    const ext = fmt === "image/jpeg" ? ".jpg" : fmt === "image/webp" ? ".webp" : ".png";
    a.download = (fileName || "image") + ext;
    a.href = URL.createObjectURL(outBlob);
    a.click();
    setTimeout(()=> URL.revokeObjectURL(a.href), 2000);
    
    setTimeout(() => {
      if (imgURL) URL.revokeObjectURL(imgURL);
      if (outURL) URL.revokeObjectURL(outURL);
      
      setFile(null);
      setImgURL(null);
      setOrigSize("");
      setTargetVal(100);
      setUnit("KB");
      setWidth("");
      setHeight("");
      setFmt("image/webp");
      setBg("#ffffff");
      setOutURL(null);
      setOutBlob(null);
      setOutDim("");
      setOutQ(undefined);
      setFileName("");
      setShowModal(false);
      
      if (inputRef.current) inputRef.current.value = "";
    }, 500);
  }

  const canProcess = !!file && !!width && !!height && !busy;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Main Tool Card with Performance Marketing Background */}
        <div className="rounded-3xl bg-[#B8D4F7] shadow-lg p-6 md:p-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">Image Resizer</h1>
        <p className="text-sm md:text-base text-slate-700 mb-6">Upload an image, adjust dimensions and target file size, then download. Processing is 100% in your browser.</p>

        {/* Upload with Preview */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 mb-6 bg-white/50 backdrop-blur-sm">
          <input 
            ref={inputRef} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onPick(f); }} 
          />
          
          {uploading ? (
            <div className="py-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900 truncate">{file?.name}</p>
                    <span className="text-xs text-slate-500 ml-2">{origSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-xs text-slate-600 whitespace-nowrap">Uploading...</span>
                  </div>
                </div>
              </div>
            </div>
          ) : !imgURL ? (
            <div className="text-center py-8">
              <button 
                className="px-6 py-3 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-medium transition-colors shadow-sm" 
                onClick={()=>inputRef.current?.click()}
              >
                Choose Image
              </button>
              <p className="mt-3 text-sm text-slate-600">Click to upload an image</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="group relative flex items-center justify-center bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                <img src={imgURL} alt="preview" className="max-w-full max-h-64 h-auto object-contain"/>
                <button
                  onClick={() => {
                    if (imgURL) URL.revokeObjectURL(imgURL);
                    setFile(null);
                    setImgURL(null);
                    setOrigSize("");
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 text-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-200 hover:text-slate-900 shadow-md"
                  aria-label="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-900 mb-2">
                  <span className="font-medium">{file?.name}</span>
                </div>
                <div className="text-xs text-slate-600 mb-3">
                  Original: {origSize}
                </div>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors" 
                  onClick={()=>inputRef.current?.click()}
                >
                  Change Image
                </button>
              </div>
            </div>
        )}
        </div>

        {/* Controls */}
        {file && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-1 block">Target File Size</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min={0} 
                      value={targetVal} 
                      onChange={(e)=>setTargetVal(clamp(parseInt(e.target.value||"0"),0,100000))} 
                      className="w-full px-4 py-3 pr-20 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" 
                      placeholder="100"
                    />
                    <select 
                      value={unit} 
                      onChange={(e)=>setUnit(e.target.value as Unit)} 
                      className="absolute right-0 top-0 h-full px-3 pr-8 bg-transparent border-none text-slate-700 font-medium focus:ring-0 focus:outline-none cursor-pointer appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23475569' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25rem 1.25rem'
                      }}
                    >
                      <option>KB</option>
                      <option>MB</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-1 block">Width (pixels)</label>
                  <input 
                    type="number" 
                    min={1} 
                    value={width} 
                    onChange={(e)=>setWidth(e.target.value)} 
                    placeholder="Enter width"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" 
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-1 block">Output Format</label>
                  <div className="relative">
                    <select 
                      value={fmt} 
                      onChange={(e)=>setFmt(e.target.value as OutFmt)} 
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-white border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23475569' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25rem 1.25rem'
                      }}
                    >
                      <option value="image/webp">WEBP (smallest file size)</option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/png">PNG (no compression)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-1 block">Height (pixels)</label>
                  <input 
                    type="number" 
                    min={1} 
                    value={height} 
                    onChange={(e)=>setHeight(e.target.value)} 
                    placeholder="Enter height"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" 
                  />
                </div>
                
                {fmt === "image/jpeg" && (
                  <div>
                    <label className="text-sm font-medium text-slate-900 mb-1 block">Background Color (for transparent images)</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={bg} 
                        onChange={(e)=>setBg(e.target.value)} 
                        className="h-10 w-16 border border-slate-300 rounded cursor-pointer bg-white shadow-sm" 
                      />
                      <span className="text-sm text-slate-700">{bg}</span>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                disabled={!canProcess} 
                onClick={process} 
                className="px-8 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {busy ? "Processing..." : "Resize Image"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && outURL && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold">Preview & Download</h2>
              <button 
                onClick={()=>setShowModal(false)} 
                className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm"
              >
                Close
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 overflow-auto max-h-96">
                <img src={outURL} alt="preview" className="max-w-full h-auto mx-auto"/>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-blue-900 mb-1">Output Details</div>
                  <div className="text-sm text-blue-700">
                    <div><strong>Dimensions:</strong> {outDim}</div>
                    <div><strong>File Size:</strong> {outBlob ? bytesPretty(outBlob.size) : ""}</div>
                    <div><strong>Format:</strong> {fmtName[fmt]}</div>
                    {outQ && <div><strong>Quality:</strong> {(outQ * 100).toFixed(0)}%</div>}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">File Name</label>
                  <input 
                    value={fileName} 
                    onChange={(e)=>setFileName(e.target.value)} 
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter file name" 
                  />
                </div>
                
                <button 
                  onClick={download} 
                  className="w-full px-4 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                >
                  Download Image
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  After downloading, the tool will reset for a new image.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Features Section - Wrapped like "What We Do" */}
        <ScrollAnimatedSection bgColor="bg-[rgb(241,241,233)]">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-10 sm:mb-12"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase bg-slate-100 border border-slate-200 text-slate-700"
                >
                  Why Choose Our Tool
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
                >
                  Professional Image Resizing Made Simple
                </motion.h2>
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#24C5B9] to-[#0074ED]"
                />
              </motion.header>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Perfect Quality */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Perfect Quality</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The best online image resizer to resize your images at the highest quality.
                  </p>
                </div>

                {/* Lightning Fast */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This cloud-hosted, highly scalable tool can resize your images within seconds!
                  </p>
                </div>

                {/* Easy To Use */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Easy To Use</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Simply upload your image and enter a target size. It's as easy as that!
                  </p>
                </div>

                {/* Works Anywhere */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Works Anywhere</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    ImageResizer.com is browser-based (no software to install). It works on any platform (Windows, Linux, Mac).
                  </p>
                </div>

                {/* Privacy Guaranteed */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#3B82F6] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy Guaranteed</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your images are uploaded via a secure 256-bit encrypted SSL connection and deleted automatically within 6 hours.
                  </p>
                </div>

                {/* It's Free */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#EC4899] flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">It's Free</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Since 2012 we have resized millions of images for free! There is no software to install, registrations, or watermarks.
                  </p>
                </div>
              </motion.div>
            </div>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}
