import { useArt, Crayon, Smudge } from "./Paper.js";

// A clay jar where palm sap is left to ferment into wine and vinegar,
// its mouth tied shut with a blue cloth and a golden string.
export default function ClayJar({ size = 120 }) {
  const art = useArt(11);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>{art.defs}</defs>
      <g filter={art.url("crayon")}>
        <Smudge art={art} rx={34} />
        <Crayon
          art={art}
          d="M46 30 Q30 38 29 62 Q28 88 46 100 L74 100 Q92 88 91 62 Q90 38 74 30 Z"
          color="#d9814f"
          shade="#9c4a26"
          shadeD="M68 30 L74 30 Q90 38 91 62 Q92 88 74 100 L66 100 Q80 86 80 62 Q79 40 68 30 Z"
          edge="#8a3f1d"
        />
        <Crayon art={art} d="M31 62 Q60 70 89 62 L89 70 Q60 78 31 70 Z" color="#a8502a" edge="#7a3416" />
        <path d="M40 42 Q35 56 40 76" stroke="#ffe0c8" strokeWidth="4" fill="none" opacity="0.75" strokeLinecap="round" />
        <Crayon art={art} d="M44 16 Q60 9 76 16 L74 32 Q60 37 46 32 Z" color="#5b7ed6" shade="#2a4fb2" shadeD="M62 11 Q70 12 76 16 L74 32 Q68 34 62 35 Z" edge="#1f3a8a" />
        <path d="M45 27 Q60 33 75 27 M75 27 Q82 32 79 39" stroke="#f3c76d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
