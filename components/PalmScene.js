// An original illustration: a sugar palm at sunrise, with a bamboo
// tube hanging from the crown to collect sap (how teuk tnaot is gathered).
export default function PalmScene() {
  const fronds = [-80, -55, -30, -8, 14, 36, 60, 84, 110, 135, 160, 185, 210, 235, 260];
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="A sugar palm tree at sunrise"
      style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde7c4" />
          <stop offset="1" stopColor="#f6c98b" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="400" rx="28" fill="url(#sky)" />
      <circle cx="290" cy="150" r="58" fill="#f3a53c" opacity="0.9" />
      {/* rice fields */}
      <path d="M0 300 Q200 270 400 300 V400 H0 Z" fill="#9cc27a" />
      <path d="M0 330 Q200 305 400 332 V400 H0 Z" fill="#6f9e55" />
      <path d="M0 362 Q200 345 400 364 V400 H0 Z" fill="#4f7f3e" />
      {/* trunk */}
      <path d="M176 330 C170 250 178 180 184 118 L198 118 C194 180 190 250 196 330 Z" fill="#6b4a2e" />
      {[140, 170, 200, 230, 260, 290].map((y) => (
        <line key={y} x1="176" y1={y} x2="196" y2={y - 4} stroke="#4e3420" strokeWidth="2" />
      ))}
      {/* fan-shaped crown */}
      <g transform="translate(191 112)">
        {fronds.map((a) => (
          <path key={a} d="M0 0 L70 -8 L74 0 L70 8 Z" fill={a % 2 ? "#2f6b3f" : "#3f8a50"}
            transform={`rotate(${a})`} />
        ))}
        <circle r="12" fill="#2a5a35" />
      </g>
      {/* bamboo sap tube and a cup of teuk tnaot */}
      <rect x="198" y="126" width="10" height="34" rx="3" fill="#c9a24f" stroke="#8d6b2a" />
      <path d="M86 318 h40 l-6 34 h-28 Z" fill="#fff8ec" stroke="#8d6b2a" strokeWidth="2" />
      <rect x="92" y="326" width="28" height="22" fill="#f1c77a" />
    </svg>
  );
}
