// src/assets/svg/ElementalCrests.tsx
// Bespoke Scalable Vector Graphics (SVG) Crests for the 8 Elemental Champions of ELEMENTA
// Conforms to IUPAC GDPT 2018 chemical identities, atomic shell structures, and tactical MOBA roles.

import React from 'react';

interface CrestProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
}

/**
 * 1. NATRI (Na, Z=11) — Hiệp Sĩ Kiềm Tác (Alkali Brawler)
 * Visual Motif: 3 concentric electron shells (2, 8, 1), single energetic valence electron flare,
 * rapid water reaction shockwave ring, amber-cyan radiant alkali glow.
 */
export const NaCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="naGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <radialGradient id="naCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="60%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </radialGradient>
      {glow && (
        <filter id="naGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Outer Shell & Water Ripple */}
    <circle cx="50" cy="50" r="44" stroke="url(#naGrad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
    <circle cx="50" cy="50" r="36" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4" />
    <circle cx="50" cy="50" r="26" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />

    {/* Energetic 3s1 Valence Electron Orbit Arc */}
    <path
      d="M 50 6 A 44 44 0 0 1 94 50"
      stroke="#38bdf8"
      strokeWidth="3.5"
      strokeLinecap="round"
      filter={glow ? 'url(#naGlow)' : undefined}
    />
    <circle cx="94" cy="50" r="4.5" fill="#38bdf8" filter={glow ? 'url(#naGlow)' : undefined} />

    {/* Central Atomic Core */}
    <circle cx="50" cy="50" r="18" fill="url(#naCore)" stroke="#fef3c7" strokeWidth="2" />

    {/* Element Symbol */}
    <text
      x="50"
      y="56"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      fill="#0f172a"
      letterSpacing="-0.5"
    >
      Na
    </text>

    {/* Valence Badge: 3s¹ */}
    <rect x="36" y="74" width="28" height="12" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
    <text x="50" y="83" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#fbbf24">
      [Ne] 3s¹
    </text>
  </svg>
);

/**
 * 2. SẮT (Fe, Z=26) — Giám Ngục Kim Loại (Ferrous Juggernaut)
 * Visual Motif: Heavy hexagonal iron fortress plate, 3d6 magnetic flux lines,
 * oxidation state indicators (+2 / +3), metallic hematite crimson & steel silver.
 */
export const FeCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="fePlate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="feRust" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#7c2d12" />
      </linearGradient>
      {glow && (
        <filter id="feGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Hexagonal Armor Plate */}
    <polygon
      points="50,6 88,28 88,72 50,94 12,72 12,28"
      fill="url(#fePlate)"
      stroke="url(#feRust)"
      strokeWidth="3.5"
    />

    {/* Magnetic Flux Lines */}
    <path d="M 24 35 Q 50 20 76 35" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.7" />
    <path d="M 24 65 Q 50 80 76 65" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.7" />

    {/* Central Core Shield */}
    <circle cx="50" cy="50" r="19" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

    {/* Fe Typography */}
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#f8fafc"
      filter={glow ? 'url(#feGlow)' : undefined}
    >
      Fe
    </text>

    {/* Magnetic North / South Poles */}
    <circle cx="50" cy="18" r="3.5" fill="#ef4444" />
    <circle cx="50" cy="82" r="3.5" fill="#3b82f6" />
  </svg>
);

/**
 * 3. CLO (Cl, Z=17) — Sát Thủ Khí Độc (Halogen Assassin)
 * Visual Motif: Dense diatomic vortex (Cl2), 7 valence electrons in outer shell,
 * toxic emerald-yellow aerosol tendrils, corrosive sharpness.
 */
export const ClCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="clToxin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#84cc16" />
        <stop offset="60%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      {glow && (
        <filter id="clGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Corrosive Swirling Gas Tendrils */}
    <circle cx="50" cy="50" r="42" stroke="url(#clToxin)" strokeWidth="2.5" strokeDasharray="14 6" opacity="0.8" />
    <path
      d="M 50 10 Q 75 25 70 50 T 50 90 Q 25 75 30 50 Z"
      fill="none"
      stroke="#a3e635"
      strokeWidth="1.5"
      opacity="0.4"
    />

    {/* 7 Valence Electron Pairs & Radical Dot */}
    {[0, 51.4, 102.8, 154.2, 205.6, 257.0, 308.4].map((deg, idx) => {
      const rad = (deg * Math.PI) / 180;
      const ex = 50 + 38 * Math.cos(rad);
      const ey = 50 + 38 * Math.sin(rad);
      return (
        <circle
          key={idx}
          cx={ex}
          cy={ey}
          r={idx === 6 ? 3.5 : 2.5}
          fill={idx === 6 ? '#facc15' : '#a3e635'}
          filter={glow ? 'url(#clGlow)' : undefined}
        />
      );
    })}

    {/* Central Diatomic Core */}
    <circle cx="50" cy="50" r="20" fill="#022c22" stroke="#10b981" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#bef264"
    >
      Cl
    </text>
  </svg>
);

/**
 * 4. ĐỒNG (Cu, Z=29) — Xạ Thủ Dẫn Điện (Galvanic Marksman)
 * Visual Motif: High-conductivity galvanic copper coil, fully filled 3d10 shell,
 * conductive sparks, metallic polished copper/bronze luster.
 */
export const CuCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cuLuster" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      {glow && (
        <filter id="cuGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Conductive Spiral Coil */}
    <circle cx="50" cy="50" r="43" stroke="url(#cuLuster)" strokeWidth="3" />
    <circle cx="50" cy="50" r="33" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />

    {/* Galvanic Cathode / Anode Marks */}
    <path d="M 50 14 L 50 26 M 50 74 L 50 86 M 14 50 L 26 50 M 74 50 L 86 50" stroke="#38bdf8" strokeWidth="2.5" />

    {/* Central Copper Coin / Ring */}
    <circle cx="50" cy="50" r="21" fill="#451a03" stroke="#f97316" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#fdba74"
      filter={glow ? 'url(#cuGlow)' : undefined}
    >
      Cu
    </text>

    {/* Electron conduction arc */}
    <path d="M 68 32 A 28 28 0 0 1 78 55" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * 5. NHÔM (Al, Z=13) — Pháp Sư Lưỡng Tính (Amphoteric Mage)
 * Visual Motif: Amphoteric dual nature (Acid/Base prism), triangular crystal lattice,
 * protective Al2O3 passivation shimmer, silver-cyan crystalline prism.
 */
export const AlCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="alPrism" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      {glow && (
        <filter id="alGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Inverted Interlocking Triangles (Amphoteric Balance: Acid ⇋ Base) */}
    <polygon points="50,10 88,78 12,78" stroke="url(#alPrism)" strokeWidth="3" fill="none" opacity="0.8" />
    <polygon points="50,90 88,22 12,22" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.5" />

    {/* Central Core Octahedron */}
    <circle cx="50" cy="50" r="19" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#f1f5f9"
    >
      Al
    </text>

    {/* Oxide Passivation Aura */}
    <circle cx="50" cy="50" r="44" stroke="#e0f2fe" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" />
  </svg>
);

/**
 * 6. OXI (O, Z=8) — Hộ Vệ Oxi Hóa (Paramagnetic Enchanter)
 * Visual Motif: Diradical paramagnetic electron pair (2 unpaired electrons in π* orbitals),
 * high electronegativity combustion corona, vibrant crimson-rose aura.
 */
export const OCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="oCombustion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="60%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#881337" />
      </radialGradient>
      {glow && (
        <filter id="oGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Dynamic Combustion Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
        y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
        stroke="#f43f5e"
        strokeWidth={i % 2 === 0 ? '2' : '1'}
        opacity="0.6"
      />
    ))}

    {/* Diradical Paramagnetic Spin Markers (↑ ↑) */}
    <circle cx="32" cy="24" r="3.5" fill="#f43f5e" filter={glow ? 'url(#oGlow)' : undefined} />
    <circle cx="68" cy="24" r="3.5" fill="#f43f5e" filter={glow ? 'url(#oGlow)' : undefined} />

    {/* Central Core */}
    <circle cx="50" cy="50" r="21" fill="url(#oCombustion)" stroke="#ffe4e6" strokeWidth="2.5" />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="22"
      fill="#ffffff"
    >
      O
    </text>
  </svg>
);

/**
 * 7. HIĐRO (H, Z=1) — Tiên Phong Lượng Tử (Quantum Skirmisher)
 * Visual Motif: 1s1 quantum probability wave cloud, single electron rapid orbital dance,
 * primordial hydrogen star ignition, deep celestial blue-violet.
 */
export const HCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="hWave" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      {glow && (
        <filter id="hGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Quantum 1s Orbital Probability Ellipses */}
    <ellipse
      cx="50"
      cy="50"
      rx="42"
      ry="22"
      stroke="url(#hWave)"
      strokeWidth="2"
      transform="rotate(-30 50 50)"
      opacity="0.7"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="42"
      ry="22"
      stroke="url(#hWave)"
      strokeWidth="2"
      transform="rotate(30 50 50)"
      opacity="0.7"
    />

    {/* Fast Orbiting Electron Node */}
    <circle cx="82" cy="32" r="4.5" fill="#67e8f9" filter={glow ? 'url(#hGlow)' : undefined} />

    {/* Single Proton Nucleus */}
    <circle cx="50" cy="50" r="18" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="20"
      fill="#e0e7ff"
    >
      H
    </text>
  </svg>
);

/**
 * 8. BARI (Ba, Z=56) — Khổng Lồ Kiềm Thổ (Alkaline Earth Colossus)
 * Visual Motif: 6 electron shells (s2 valence pair), dense crystalline precipitate lattice (BaSO4),
 * apple-green flame test emissions, monolithic heavy armor.
 */
export const BaCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="baFlame" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="60%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
      {glow && (
        <filter id="baGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Heavy Octagonal Defensive Bulwark */}
    <polygon
      points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32"
      fill="#052e16"
      stroke="url(#baFlame)"
      strokeWidth="3.5"
    />

    {/* 6s² Valence Electron Pair at Zenith */}
    <circle cx="44" cy="18" r="3.5" fill="#4ade80" filter={glow ? 'url(#baGlow)' : undefined} />
    <circle cx="56" cy="18" r="3.5" fill="#4ade80" filter={glow ? 'url(#baGlow)' : undefined} />

    {/* Insoluble Crystal Facets */}
    <line x1="32" y1="32" x2="68" y2="68" stroke="#16a34a" strokeWidth="1.5" opacity="0.6" />
    <line x1="68" y1="32" x2="32" y2="68" stroke="#16a34a" strokeWidth="1.5" opacity="0.6" />

    {/* Heavy Core */}
    <circle cx="50" cy="50" r="20" fill="#022c22" stroke="#22c55e" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      fill="#bbf7d0"
    >
      Ba
    </text>
  </svg>
);

/**
 * 9. CARBON (C, Z=6) — Pháp Sư Cấu Trúc (Allotrope Weaver)
 * Visual Motif: Tetrahedral sp³ coordinate bonds, diamond crystalline geometry,
 * graphite hexagonal layers, emerald/carbon nano-glow.
 */
export const CCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#022c22" />
      </linearGradient>
      {glow && (
        <filter id="cGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Outer Hexagonal Graphene Ring */}
    <polygon
      points="50,6 88,28 88,72 50,94 12,72 12,28"
      stroke="url(#cGrad)"
      strokeWidth="2.5"
      fill="#064e3b"
      fillOpacity="0.3"
    />

    {/* Tetrahedral Bond Nodes (Diamond sp3 hybridization) */}
    <line x1="50" y1="20" x2="50" y2="50" stroke="#6ee7b7" strokeWidth="2" opacity="0.8" />
    <line x1="25" y1="70" x2="50" y2="50" stroke="#6ee7b7" strokeWidth="2" opacity="0.8" />
    <line x1="75" y1="70" x2="50" y2="50" stroke="#6ee7b7" strokeWidth="2" opacity="0.8" />
    <line x1="50" y1="50" x2="50" y2="82" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* 4 Valence Nodes */}
    <circle cx="50" cy="20" r="4" fill="#34d399" filter={glow ? 'url(#cGlow)' : undefined} />
    <circle cx="25" cy="70" r="4" fill="#34d399" filter={glow ? 'url(#cGlow)' : undefined} />
    <circle cx="75" cy="70" r="4" fill="#34d399" filter={glow ? 'url(#cGlow)' : undefined} />
    <circle cx="50" cy="82" r="3" fill="#6ee7b7" opacity="0.7" />

    {/* Central Carbon Core */}
    <circle cx="50" cy="50" r="18" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="19"
      fill="#a7f3d0"
    >
      C
    </text>

    {/* Electron Shell Badge */}
    <rect x="34" y="86" width="32" height="11" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1" />
    <text x="50" y="94.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#6ee7b7">
      [He] 2s²2p²
    </text>
  </svg>
);

/**
 * 10. LƯU HUỲNH (S, Z=16) — Sát Thủ Lưu Huỳnh (Sulfuric Shadow)
 * Visual Motif: Crown-shaped S8 puckered ring, pungent brimstone yellow-amber energy,
 * sulfuric acid droplet stingers, sharp DoT corrosion aesthetic.
 */
export const SCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>
      {glow && (
        <filter id="sGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Octasulfur Crown Geometry (S8 Ring) */}
    <polygon
      points="50,10 74,22 90,46 76,78 50,90 24,78 10,46 26,22"
      stroke="url(#sGrad)"
      strokeWidth="2.5"
      fill="#422006"
      fillOpacity="0.4"
    />

    {/* Crown Inner Cross Links */}
    <path
      d="M 26 22 L 50 42 L 74 22 M 10 46 L 50 62 L 90 46"
      stroke="#facc15"
      strokeWidth="1.5"
      opacity="0.6"
    />

    {/* Brimstone Spark Orbitals */}
    <circle cx="50" cy="10" r="3.5" fill="#fef08a" filter={glow ? 'url(#sGlow)' : undefined} />
    <circle cx="90" cy="46" r="3.5" fill="#fef08a" filter={glow ? 'url(#sGlow)' : undefined} />
    <circle cx="10" cy="46" r="3.5" fill="#fef08a" filter={glow ? 'url(#sGlow)' : undefined} />
    <circle cx="50" cy="90" r="3.5" fill="#fef08a" filter={glow ? 'url(#sGlow)' : undefined} />

    {/* Central Core */}
    <circle cx="50" cy="50" r="18" fill="#18181b" stroke="#eab308" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="19"
      fill="#fde047"
    >
      S
    </text>

    {/* Valence Badge */}
    <rect x="34" y="86" width="32" height="11" rx="3" fill="#292524" stroke="#eab308" strokeWidth="1" />
    <text x="50" y="94.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#fde047">
      [Ne] 3s²3p⁴
    </text>
  </svg>
);

/**
 * 11. CANXI (Ca, Z=20) — Hộ Vệ Thạch Vôi (Calcite Bastion)
 * Visual Motif: Rhombohedral calcite mineral lattice, brick-red flame reaction flare,
 * limestone rampart shield, alkaline earth heavy plate.
 */
export const CaCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="caGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
      {glow && (
        <filter id="caGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Rhombohedral Calcite Shield Border */}
    <polygon
      points="50,6 88,24 88,68 50,94 12,68 12,24"
      stroke="url(#caGrad)"
      strokeWidth="3.5"
      fill="#1c1917"
      fillOpacity="0.6"
    />

    {/* Crystalline Limestone Cleavage Planes */}
    <line x1="12" y1="24" x2="88" y2="68" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
    <line x1="88" y1="24" x2="12" y2="68" stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
    <line x1="50" y1="6" x2="50" y2="94" stroke="#fdba74" strokeWidth="1.5" opacity="0.5" />

    {/* 4s² Valence Electron Pair at Peak */}
    <circle cx="44" cy="14" r="3.5" fill="#ffedd5" filter={glow ? 'url(#caGlow)' : undefined} />
    <circle cx="56" cy="14" r="3.5" fill="#ffedd5" filter={glow ? 'url(#caGlow)' : undefined} />

    {/* Central Stone Core */}
    <circle cx="50" cy="50" r="19" fill="#292524" stroke="#f97316" strokeWidth="2" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      fill="#ffedd5"
    >
      Ca
    </text>

    {/* Valence Badge */}
    <rect x="34" y="86" width="32" height="11" rx="3" fill="#1c1917" stroke="#ea580c" strokeWidth="1" />
    <text x="50" y="94.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#fdba74">
      [Ar] 4s²
    </text>
  </svg>
);

/**
 * 12. NITƠ (N, Z=7) — Xạ Thủ Áp Suất (Cryo Dragoon)
 * Visual Motif: Triple-bond N≡N cylinders, cryogenic nitrogen frost vortex (-196°C),
 * pneumatic sniper crosshairs, piercing cobalt/cyan energetic trail.
 */
export const NCrest: React.FC<CrestProps> = ({ size = 48, className = '', glow = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="nGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="50%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      {glow && (
        <filter id="nGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>

    {/* Sniper Reticle Outer Ring */}
    <circle cx="50" cy="50" r="44" stroke="url(#nGrad)" strokeWidth="2" strokeDasharray="14 6" />
    <circle cx="50" cy="50" r="34" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />

    {/* Cryogenic Crosshairs */}
    <line x1="50" y1="6" x2="50" y2="24" stroke="#38bdf8" strokeWidth="2.5" />
    <line x1="50" y1="76" x2="50" y2="94" stroke="#38bdf8" strokeWidth="2.5" />
    <line x1="6" y1="50" x2="24" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
    <line x1="76" y1="50" x2="94" y2="50" stroke="#38bdf8" strokeWidth="2.5" />

    {/* N≡N Triple Bond Bars in background */}
    <line x1="28" y1="43" x2="72" y2="43" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.5" />
    <line x1="28" y1="50" x2="72" y2="50" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
    <line x1="28" y1="57" x2="72" y2="57" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.5" />

    {/* High-Pressure Core */}
    <circle cx="50" cy="50" r="18" fill="#082f49" stroke="#38bdf8" strokeWidth="2" filter={glow ? 'url(#nGlow)' : undefined} />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="19"
      fill="#e0f2fe"
    >
      N
    </text>

    {/* Valence Badge */}
    <rect x="34" y="86" width="32" height="11" rx="3" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
    <text x="50" y="94.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#7dd3fc">
      [He] 2s²2p³
    </text>
  </svg>
);

/**
 * Universal Champion Crest Component
 */
export const ElementalCrest: React.FC<{
  heroIdOrSymbol: string;
  size?: number | string;
  className?: string;
  glow?: boolean;
}> = ({ heroIdOrSymbol, size = 48, className = '', glow = true }) => {
  const norm = heroIdOrSymbol.toLowerCase();

  // Multi-character matches first to prevent substring collision
  if (norm.includes('ca')) return <CaCrest size={size} className={className} glow={glow} />;
  if (norm.includes('na')) return <NaCrest size={size} className={className} glow={glow} />;
  if (norm.includes('fe')) return <FeCrest size={size} className={className} glow={glow} />;
  if (norm.includes('cl')) return <ClCrest size={size} className={className} glow={glow} />;
  if (norm.includes('cu')) return <CuCrest size={size} className={className} glow={glow} />;
  if (norm.includes('al')) return <AlCrest size={size} className={className} glow={glow} />;
  if (norm.includes('ba')) return <BaCrest size={size} className={className} glow={glow} />;

  // Single-character or hero-prefixed matches
  if (norm.includes('hero_c') || norm === 'c' || norm.includes('_c_')) return <CCrest size={size} className={className} glow={glow} />;
  if (norm.includes('hero_s') || norm === 's' || norm.includes('_s_')) return <SCrest size={size} className={className} glow={glow} />;
  if (norm.includes('hero_n') || norm === 'n' || norm.includes('_n_')) return <NCrest size={size} className={className} glow={glow} />;
  if (norm.includes('hero_h') || norm === 'h' || norm.includes('_h_')) return <HCrest size={size} className={className} glow={glow} />;
  if (norm.includes('hero_o') || norm === 'o' || norm.includes('_o_')) return <OCrest size={size} className={className} glow={glow} />;

  // Default fallback Na
  return <NaCrest size={size} className={className} glow={glow} />;
};
