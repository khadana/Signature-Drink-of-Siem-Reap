import { useId } from "react";

// Crayon / oil-pastel look, made only from SVG (no images, no packages):
// rough edges, paper "tooth" showing through the colour, and pale strokes.
export function useArt(seed = 2) {
  const base = useId().replace(/:/g, "");
  const id = (name) => `${base}-${name}`;
  const defs = (
    <filter id={id("crayon")} x="-15%" y="-15%" width="130%" height="130%">
      {/* rough, wobbly edges */}
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed={seed} result="wobble" />
      <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="rough" />
      {/* long irregular pale strokes, like pastel dragged across paper */}
      <feTurbulence type="fractalNoise" baseFrequency="0.18 0.03" numOctaves="3" seed={seed + 3} result="strokes" />
      <feColorMatrix in="strokes" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.3 0 0 0 -0.6" result="light" />
      <feComposite in="light" in2="rough" operator="in" result="lightOnPaint" />
      <feMerge result="painted"><feMergeNode in="rough" /><feMergeNode in="lightOnPaint" /></feMerge>
      {/* paper tooth: tiny gaps where the white paper shows through */}
      <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" seed={seed + 9} result="tooth" />
      <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.3" result="paper" />
      <feComposite in="painted" in2="paper" operator="in" />
    </filter>
  );
  return { id, url: (name) => `url(#${id(name)})`, defs };
}

// One crayon shape: colour, a darker side, and a rough edge.
export function Crayon({ d, color, shade, edge, art, shadeD }) {
  return (
    <>
      <path d={d} fill={color} />
      {shade && <path d={shadeD || d} fill={shade} opacity="0.55" />}
      <path d={d} fill="none" stroke={edge} strokeWidth="1.8" strokeLinejoin="round" opacity="0.85" />
    </>
  );
}

// A soft crayon smudge under each drawing, as its shadow.
export function Smudge({ art, cx = 60, rx = 40 }) {
  return (
    <>
      <ellipse cx={cx} cy="104" rx={rx} ry="7" fill="#b9a3e0" opacity="0.55" />
    </>
  );
}
