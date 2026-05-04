// Compact, reliable maps (no weird blackletter/script exceptions).
// We cover: normal, bold, italic, bold-italic, sans, bold-sans, sans-italic,
// monospace, fullwidth, underline (combining), strikethrough (combining).

export type StyleKey =
  | "normal" | "bold" | "italic" | "boldItalic"
  | "sans" | "sansBold" | "sansItalic"
  | "mono" | "fullwidth"
  | "underline" | "strike";

export const styleList: { key: StyleKey; label: string }[] = [
  { key: "normal",      label: "Normal" },
  { key: "bold",        label: "Bold" },
  { key: "italic",      label: "Italic" },
  { key: "boldItalic",  label: "Bold Italic" },
  { key: "sans",        label: "Sans" },
  { key: "sansBold",    label: "Bold Sans" },
  { key: "sansItalic",  label: "Sans Italic" },
  { key: "mono",        label: "Monospace" },
  { key: "fullwidth",   label: "Fullwidth" },
  { key: "underline",   label: "Underline" },
  { key: "strike",      label: "Strikethrough" },
];

// Helpers to build contiguous Unicode ranges
const makeMap = (upperStart?: number, lowerStart?: number, digitStart?: number) => {
  const map: Record<string, string> = {};
  if (upperStart) for (let i = 0; i < 26; i++) map[String.fromCharCode(65+i)] = String.fromCodePoint(upperStart + i);
  if (lowerStart) for (let i = 0; i < 26; i++) map[String.fromCharCode(97+i)] = String.fromCodePoint(lowerStart + i);
  if (digitStart) for (let i = 0; i < 10; i++) map[String.fromCharCode(48+i)] = String.fromCodePoint(digitStart + i);
  return map;
};

// Math Alphabets (no exception sets used)
const MAP_BOLD       = makeMap(0x1D400, 0x1D41A, 0x1D7CE);
const MAP_ITALIC     = makeMap(0x1D434, 0x1D44E, undefined);
const MAP_BOLDITALIC = makeMap(0x1D468, 0x1D482, undefined);
const MAP_SANS       = makeMap(0x1D5A0, 0x1D5BA, 0x1D7E2);
const MAP_SANSBOLD   = makeMap(0x1D5D4, 0x1D5EE, 0x1D7EC);
const MAP_SANSITALIC = makeMap(0x1D608, 0x1D622, undefined);
const MAP_MONO       = makeMap(0x1D670, 0x1D68A, 0x1D7F6);

// Fullwidth ASCII
const MAP_FULL = (() => {
  const m: Record<string,string> = {};
  for (let i=0;i<26;i++){
    m[String.fromCharCode(65+i)] = String.fromCodePoint(0xFF21+i);
    m[String.fromCharCode(97+i)] = String.fromCodePoint(0xFF41+i);
  }
  for (let i=0;i<10;i++) m[String.fromCharCode(48+i)] = String.fromCodePoint(0xFF10+i);
  m[" "] = "\u3000";
  return m;
})();

const COMB_UNDER = "\u0332";   // combining low line
const COMB_STRIKE = "\u0336";  // combining long stroke overlay

function mapText(s: string, map: Record<string,string>) {
  let out = "";
  for (const ch of s) out += map[ch] ?? ch;
  return out;
}

export function applyStyle(text: string, key: StyleKey): string {
  switch (key) {
    case "bold":        return mapText(text, MAP_BOLD);
    case "italic":      return mapText(text, MAP_ITALIC);
    case "boldItalic":  return mapText(text, MAP_BOLDITALIC);
    case "sans":        return mapText(text, MAP_SANS);
    case "sansBold":    return mapText(text, MAP_SANSBOLD);
    case "sansItalic":  return mapText(text, MAP_SANSITALIC);
    case "mono":        return mapText(text, MAP_MONO);
    case "fullwidth":   return mapText(text, MAP_FULL);
    case "underline":   return Array.from(text).map(c => c + COMB_UNDER).join("");
    case "strike":      return Array.from(text).map(c => c + COMB_STRIKE).join("");
    default:            return text;
  }
}
