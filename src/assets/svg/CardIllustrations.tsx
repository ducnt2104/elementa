// src/assets/svg/CardIllustrations.tsx
// High-Fidelity Vector Art Illustrations for ELEMENTA Tactical TCG Cards

import React from 'react';

interface CardIllustrationProps {
  cardId: string;
  chemicalFormula?: string;
  attribute?: string;
  className?: string;
}

export const CardIllustration: React.FC<CardIllustrationProps> = ({
  cardId,
  chemicalFormula,
  attribute = 'PYRO',
  className = 'w-full h-full'
}) => {
  // 1. Natri (Na) — Hiệp Sĩ Kiềm Tác
  if (cardId === 'card_elem_11_na' || chemicalFormula === 'Na') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="naGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="naArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#naGlow)" />
        {/* Orbital rings */}
        <ellipse cx="80" cy="80" rx="65" ry="24" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" transform="rotate(-25 80 80)" />
        <ellipse cx="80" cy="80" rx="65" ry="24" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" transform="rotate(35 80 80)" />
        {/* Valence 3s1 electron */}
        <circle cx="135" cy="55" r="4.5" fill="#fef08a" filter="drop-shadow(0 0 6px #fbbf24)" />
        {/* Alkali Knight Helmet & Core */}
        <path d="M80 32 L105 60 L98 96 L80 114 L62 96 L55 60 Z" fill="url(#naArmor)" stroke="#fef08a" strokeWidth="2" />
        <path d="M80 42 L95 62 L90 88 L80 100 L70 88 L65 62 Z" fill="#1e1b4b" />
        {/* Glowing Visor (Na Yellow flame emission) */}
        <path d="M68 66 L92 66 L88 74 L72 74 Z" fill="#fde047" filter="drop-shadow(0 0 5px #facc15)" />
        {/* Crown of Plasma Flame */}
        <path d="M65 35 L72 20 L80 28 L88 18 L95 35 Z" fill="#f59e0b" />
        <circle cx="80" cy="80" r="12" fill="#fbbf24" opacity="0.3" />
      </svg>
    );
  }

  // 2. Clo (Cl) — Hắc Xà Ăn Mòn
  if (cardId === 'card_elem_17_cl' || chemicalFormula === 'Cl') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="clMist" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#4d7c0f" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#clMist)" />
        {/* Toxic Halogen Mist Plumes */}
        <path d="M30 110 Q50 80 70 100 T120 75 T140 120" stroke="#84cc16" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
        <path d="M20 70 Q60 50 80 80 T130 50" stroke="#bef264" strokeWidth="2" opacity="0.5" strokeDasharray="4 4" />
        {/* Halogen Serpent Head */}
        <path d="M50 85 Q75 40 105 60 Q120 70 115 90 Q110 115 85 105 Q60 95 50 85 Z" fill="#365314" stroke="#a3e635" strokeWidth="2" />
        <path d="M65 75 Q85 55 105 70" stroke="#ecfccb" strokeWidth="2" fill="none" />
        {/* Slit Eye */}
        <ellipse cx="96" cy="74" rx="4" ry="7" fill="#facc15" transform="rotate(15 96 74)" />
        <line x1="96" y1="69" x2="96" y2="79" stroke="#000" strokeWidth="1.5" />
        {/* 7 Valence Electrons ring */}
        {[0, 51, 102, 154, 205, 257, 308].map((deg, i) => (
          <circle
            key={i}
            cx={80 + 55 * Math.cos((deg * Math.PI) / 180)}
            cy={80 + 55 * Math.sin((deg * Math.PI) / 180)}
            r="3.5"
            fill="#a3e635"
            stroke="#14532d"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  }

  // 3. Sắt (Fe) — Chiến Binh Đa Hóa Trị
  if (cardId === 'card_elem_26_fe' || chemicalFormula === 'Fe') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="feSteel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="68" fill="#0f172a" />
        {/* Ferromagnetic Flux Arcs */}
        <path d="M25 80 C25 40, 135 40, 135 80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M35 80 C35 50, 125 50, 125 80" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
        <path d="M25 80 C25 120, 135 120, 135 80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Iron Anvil & Sword Crest */}
        <polygon points="80,30 115,55 105,105 80,130 55,105 45,55" fill="url(#feSteel)" stroke="#94a3b8" strokeWidth="2.5" />
        {/* Central Core Fe2+/Fe3+ */}
        <circle cx="80" cy="80" r="16" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
        <text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace" fontWeight="900">
          Fe
        </text>
      </svg>
    );
  }

  // 4. Thủy Long H2O — Phân Tử Nước 104.5°
  if (cardId === 'card_comp_h2o' || chemicalFormula === 'H2O') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0369a1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#waterGlow)" />
        {/* Swirling Aqua Dragon Serpent Body */}
        <path
          d="M25 115 C40 60, 70 45, 110 50 C140 55, 140 105, 105 120 C70 135, 45 110, 55 90 C65 70, 95 75, 95 85"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #0284c7)"
        />
        {/* Central Oxygen Atom with 104.5 degree covalent bonds to 2 H atoms */}
        <circle cx="80" cy="72" r="18" fill="#ef4444" stroke="#fecaca" strokeWidth="2" />
        <text x="80" y="77" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900">
          O
        </text>
        {/* Bond lines at 104.5 degrees */}
        <line x1="68" y1="84" x2="48" y2="105" stroke="#bae6fd" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="92" y1="84" x2="112" y2="105" stroke="#bae6fd" strokeWidth="3.5" strokeLinecap="round" />
        {/* Hydrogen 1 */}
        <circle cx="45" cy="108" r="11" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
        <text x="45" y="112" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">
          H
        </text>
        {/* Hydrogen 2 */}
        <circle cx="115" cy="108" r="11" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
        <text x="115" y="112" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">
          H
        </text>
        {/* Angle indicator 104.5° */}
        <path d="M60 88 A20 20 0 0 0 100 88" stroke="#fde047" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        <text x="80" y="102" textAnchor="middle" fill="#fde047" fontSize="8" fontFamily="monospace">
          104.5°
        </text>
      </svg>
    );
  }

  // 5. Kim Thần Muối NaCl — Mạng Tinh Thể Lập Phương (FCC Lattice)
  if (cardId === 'card_comp_nacl' || chemicalFormula === 'NaCl') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#090d16" />
        {/* Isometric Cubic Lattice Wireframe */}
        <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.7">
          <polygon points="80,30 125,55 80,80 35,55" fill="#0284c7" fillOpacity="0.2" />
          <polygon points="35,55 80,80 80,130 35,105" fill="#0369a1" fillOpacity="0.3" />
          <polygon points="80,80 125,55 125,105 80,130" fill="#075985" fillOpacity="0.25" />
        </g>
        {/* Na+ Ions (Amber Gold) */}
        <circle cx="80" cy="30" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
        <circle cx="80" cy="130" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
        {/* Cl- Ions (Chlorine Green) */}
        <circle cx="35" cy="55" r="9" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />
        <circle cx="125" cy="55" r="9" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />
        <circle cx="35" cy="105" r="9" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />
        <circle cx="125" cy="105" r="9" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />
        {/* Center label */}
        <rect x="58" y="70" width="44" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="80" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="monospace">
          NaCl
        </text>
      </svg>
    );
  }

  // 6. Cự Thần Rỉ Sét Fe2O3 (Rust Behemoth)
  if (cardId === 'card_comp_fe2o3' || chemicalFormula === 'Fe2O3') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="68" fill="#1c1917" />
        {/* Jagged Spiked Armor of Oxidized Hematite */}
        <path
          d="M80 20 L100 45 L135 40 L125 75 L145 105 L110 115 L95 145 L80 135 L65 145 L50 115 L15 105 L35 75 L25 40 L60 45 Z"
          fill="url(#rustGrad)"
          stroke="#ea580c"
          strokeWidth="2.5"
        />
        {/* Molten / Rust Glowing Cracks */}
        <path d="M80 40 L85 70 L105 85 L90 115" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M85 70 L65 85 L70 115" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="75" r="8" fill="#ffedd5" filter="drop-shadow(0 0 6px #ea580c)" />
      </svg>
    );
  }

  // 7. Bạo Chúa Axit H2SO4 (Sulfuric Sovereign)
  if (cardId === 'card_comp_h2so4' || chemicalFormula === 'H2SO4') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="acidMist" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#581c87" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#acidMist)" />
        {/* Acidic Flask with Crown & Droplets */}
        <path d="M68 35 L92 35 L92 55 L115 115 A12 12 0 0 1 105 130 L55 130 A12 12 0 0 1 45 115 L68 55 Z" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
        {/* Bubbling Sulfur Yellow / Violet Acid Liquid */}
        <path d="M52 110 Q80 100 108 110 L105 125 L55 125 Z" fill="#eab308" opacity="0.8" />
        <circle cx="70" cy="115" r="3" fill="#fff" />
        <circle cx="85" cy="112" r="2.5" fill="#fff" />
        <circle cx="95" cy="118" r="2" fill="#fff" />
        {/* Tetrahedral Sulfate Core SO4(2-) */}
        <circle cx="80" cy="75" r="10" fill="#eab308" stroke="#fff" strokeWidth="1.5" />
        <text x="80" y="79" textAnchor="middle" fill="#000" fontSize="10" fontWeight="900">S</text>
      </svg>
    );
  }

  // 8. Link Monster: Tứ Hóa Trị Kim Cương Link-4
  if (cardId === 'card_link_4_diamond') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="diamondCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0891b2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#diamondCyan)" />
        {/* Tetrahedral 3D Diamond Geometry */}
        <polygon points="80,25 125,75 80,135 35,75" fill="#06b6d4" fillOpacity="0.3" stroke="#a5f3fc" strokeWidth="2" />
        <line x1="80" y1="25" x2="80" y2="135" stroke="#ecfeff" strokeWidth="2" />
        <line x1="35" y1="75" x2="125" y2="75" stroke="#ecfeff" strokeWidth="2" />
        <polygon points="80,55 105,75 80,105 55,75" fill="#cffafe" fillOpacity="0.7" stroke="#fff" strokeWidth="1.5" />
        {/* 4 Link Arrows (TOP, BOTTOM, LEFT, RIGHT) Glowing Neon */}
        <polygon points="80,8 88,18 72,18" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="80,152 88,142 72,142" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="8,80 18,72 18,88" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="152,80 142,72 142,88" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
      </svg>
    );
  }

  // 9. Bẫy Nhận Thức Cu + HCl (Cognitive Trap)
  if (cardId === 'card_trap_cognitive_copper') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#1e1026" />
        {/* Magic Arcane Trap Runes */}
        <circle cx="80" cy="80" r="55" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="80" cy="80" r="42" stroke="#fb7185" strokeWidth="1" />
        {/* Diagonal Warning Slash (E° > 0 NO REACTION) */}
        <circle cx="80" cy="80" r="30" fill="#881337" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="58" y1="58" x2="102" y2="102" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <text x="80" y="74" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="900" fontFamily="monospace">
          E° &gt; 0
        </text>
        <text x="80" y="94" textAnchor="middle" fill="#ffe4e6" fontSize="9" fontWeight="bold">
          CẤM KỴ
        </text>
      </svg>
    );
  }

  // 10. Hỏa Thần Nhiệt Nhôm Al2O3 + 2Fe (Thermite Titan 3000°C)
  if (cardId === 'card_comp_thermite' || chemicalFormula === 'Al2O3 + Fe') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="thermiteBlast" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#180402" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#thermiteBlast)" />
        {/* Molten iron splash arcs (3000°C) */}
        <path d="M40 120 Q80 20 120 120" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 8px #f97316)" />
        <path d="M20 90 Q80 40 140 90" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" />
        {/* Incinerator Titan Helm */}
        <polygon points="80,35 110,65 95,115 80,130 65,115 50,65" fill="#7c2d12" stroke="#fdba74" strokeWidth="2.5" />
        <polygon points="80,45 100,70 90,110 80,120 70,110 60,70" fill="#451a03" />
        {/* White-hot 3000°C furnace core */}
        <circle cx="80" cy="80" r="14" fill="#fff" filter="drop-shadow(0 0 10px #f59e0b)" />
        <text x="80" y="84" textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="900" fontFamily="monospace">
          3000°C
        </text>
      </svg>
    );
  }

  // 11. Băng Phong Kết Tủa AgCl (Silver Chloride Stun)
  if (cardId === 'card_comp_agcl' || chemicalFormula === 'AgCl') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="agclGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#031525" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#agclGlow)" />
        {/* Freezing frost needle crystals */}
        <line x1="80" y1="20" x2="80" y2="140" stroke="#fff" strokeWidth="3" strokeLinecap="round" filter="drop-shadow(0 0 6px #38bdf8)" />
        <line x1="20" y1="80" x2="140" y2="80" stroke="#fff" strokeWidth="3" strokeLinecap="round" filter="drop-shadow(0 0 6px #38bdf8)" />
        <line x1="38" y1="38" x2="122" y2="122" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="122" y1="38" x2="38" y2="122" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
        {/* Hexagonal Frost Core */}
        <polygon points="80,55 102,67 102,93 80,105 58,93 58,67" fill="#0369a1" stroke="#f0f9ff" strokeWidth="2" />
        <text x="80" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="monospace">
          AgCl↓
        </text>
      </svg>
    );
  }

  // 12. Link-1: Tiên Phong Liên Kết Đơn H–H
  if (cardId === 'card_link_1_h_bond') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#082f49" />
        {/* Single covalent sigma bond cylinder */}
        <line x1="45" y1="80" x2="115" y2="80" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="drop-shadow(0 0 8px #0284c7)" />
        <line x1="50" y1="80" x2="110" y2="80" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        {/* 2 Hydrogen spheres */}
        <circle cx="45" cy="80" r="20" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
        <text x="45" y="86" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">H</text>
        <circle cx="115" cy="80" r="20" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
        <text x="115" y="86" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">H</text>
        {/* Single Link Arrow (BOTTOM) */}
        <polygon points="80,150 88,138 72,138" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
      </svg>
    );
  }

  // 13. Link-2: Song Trụ Khí Hóa C=C (Ethylene Double Bond)
  if (cardId === 'card_link_2_ethylene') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#0a192f" />
        {/* Double Bond (Sigma + Pi cloud) */}
        <line x1="50" y1="72" x2="110" y2="72" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
        <line x1="50" y1="88" x2="110" y2="88" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
        {/* Pi orbital electron density lobes */}
        <ellipse cx="80" cy="52" rx="28" ry="12" fill="#06b6d4" fillOpacity="0.4" stroke="#67e8f9" strokeDasharray="3 3" />
        <ellipse cx="80" cy="108" rx="28" ry="12" fill="#06b6d4" fillOpacity="0.4" stroke="#67e8f9" strokeDasharray="3 3" />
        {/* Two Carbon atoms */}
        <circle cx="50" cy="80" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="50" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">C</text>
        <circle cx="110" cy="80" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="110" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">C</text>
        {/* 2 Link Arrows (LEFT, RIGHT) */}
        <polygon points="10,80 22,72 22,88" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="150,80 138,72 138,88" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
      </svg>
    );
  }

  // 14. Link-3: Tam Trọng Tinh Thể N≡N (Nitrogen Triple Bond)
  if (cardId === 'card_link_3_nitrogen') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#022c22" />
        {/* Triple bond beams (945 kJ/mol) */}
        <line x1="52" y1="68" x2="108" y2="68" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="80" x2="110" y2="80" stroke="#fff" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 0 8px #10b981)" />
        <line x1="52" y1="92" x2="108" y2="92" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
        {/* 2 Nitrogen atoms */}
        <circle cx="50" cy="80" r="19" fill="#065f46" stroke="#6ee7b7" strokeWidth="2" />
        <text x="50" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">N</text>
        <circle cx="110" cy="80" r="19" fill="#065f46" stroke="#6ee7b7" strokeWidth="2" />
        <text x="110" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">N</text>
        {/* 3 Link Arrows (TOP, BOTTOM_LEFT, BOTTOM_RIGHT) */}
        <polygon points="80,10 88,22 72,22" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="20,140 32,132 30,146" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="140,140 128,132 130,146" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
      </svg>
    );
  }

  // 15. Sắc Ký Khí GC (Gas Chromatography Turbo Draw)
  if (cardId === 'card_spell_gas_chromatography') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#1e1b4b" />
        {/* Chromatogram Baseline & Sharp Analytical Peaks */}
        <line x1="25" y1="120" x2="135" y2="120" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M30 120 L50 120 Q55 120 60 40 Q65 120 70 120 L85 120 Q92 120 98 60 Q104 120 110 120 L130 120"
          stroke="#38bdf8"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #0ea5e9)"
        />
        {/* Capillary coil background */}
        <circle cx="80" cy="80" r="45" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <text x="60" y="32" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="900" fontFamily="monospace">
          Tr₁
        </text>
        <text x="98" y="52" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="900" fontFamily="monospace">
          Tr₂
        </text>
      </svg>
    );
  }

  // 16. Điện Phân Catot Tái Sinh (Cathodic Electro-Rebirth)
  if (cardId === 'card_spell_cathode_rebirth') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#111827" />
        {/* Electro-plating cathode bath */}
        <rect x="40" y="30" width="16" height="100" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
        {/* Depositing shiny metallic crystal clusters */}
        <polygon points="56,70 70,62 82,75 72,85" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
        <polygon points="56,90 74,84 86,96 68,105" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
        {/* Electron flow arrows */}
        <path d="M120 40 C100 40, 80 50, 60 70" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="80" y="145" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
          Mⁿ⁺ + ne⁻ → M⁰
        </text>
      </svg>
    );
  }

  // 17. Phân Rã Hạt Nhân Trục Xuất (Nuclear Decay Banish)
  if (cardId === 'card_spell_nuclear_decay') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#18181b" />
        {/* Radioactive trefoil blades */}
        <circle cx="80" cy="80" r="14" fill="#facc15" stroke="#000" strokeWidth="2" />
        <path d="M80 66 L65 30 A48 48 0 0 1 95 30 Z" fill="#facc15" />
        <path d="M68 87 L35 106 A48 48 0 0 1 20 76 Z" fill="#facc15" />
        <path d="M92 87 L125 106 A48 48 0 0 0 140 76 Z" fill="#facc15" />
        {/* Irreversible banish rift */}
        <ellipse cx="80" cy="80" rx="60" ry="20" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" transform="rotate(-35 80 80)" />
      </svg>
    );
  }

  // 18. Nitơ Nguyên Tử & Phân Tử N₂ (Nitrogen Elemental)
  if (cardId === 'card_elem_7_n' || chemicalFormula === 'N' || chemicalFormula === 'N2') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="nCyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0f766e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="68" fill="url(#nCyanGlow)" />
        {/* 2s2 2p3 orbital lobes */}
        <ellipse cx="80" cy="80" rx="48" ry="18" stroke="#5eead4" strokeWidth="2" strokeDasharray="4 2" transform="rotate(0 80 80)" />
        <ellipse cx="80" cy="80" rx="48" ry="18" stroke="#5eead4" strokeWidth="2" strokeDasharray="4 2" transform="rotate(60 80 80)" />
        <ellipse cx="80" cy="80" rx="48" ry="18" stroke="#5eead4" strokeWidth="2" strokeDasharray="4 2" transform="rotate(120 80 80)" />
        {/* Nucleus Z=7 */}
        <circle cx="80" cy="80" r="16" fill="#134e4a" stroke="#2dd4bf" strokeWidth="2.5" />
        <text x="80" y="85" textAnchor="middle" fill="#f0fdfa" fontSize="13" fontWeight="900" fontFamily="sans-serif">
          N
        </text>
        {/* 5 Valence Electrons */}
        {[30, 90, 150, 210, 270].map((deg, i) => (
          <circle
            key={i}
            cx={80 + 38 * Math.cos((deg * Math.PI) / 180)}
            cy={80 + 38 * Math.sin((deg * Math.PI) / 180)}
            r="3.5"
            fill="#a7f3d0"
            filter="drop-shadow(0 0 4px #34d399)"
          />
        ))}
      </svg>
    );
  }

  // 19. Lưu Huỳnh S₈ (Vương Miện Lưu Huỳnh Octasulfur Crown)
  if (cardId === 'card_elem_16_s' || cardId === 'card_elem_16_s_crown' || chemicalFormula === 'S' || chemicalFormula === 'S8') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sAmberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#854d0e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="68" fill="url(#sAmberGlow)" />
        {/* S8 Puckered Crown Ring (W-shape projection) */}
        <polygon
          points="40,95 55,60 70,85 80,55 90,85 105,60 120,95 80,110"
          stroke="#fef08a"
          strokeWidth="3"
          fill="#713f12"
          fillOpacity="0.6"
          strokeLinejoin="round"
          filter="drop-shadow(0 0 8px #eab308)"
        />
        {/* Sulfur atom nodes */}
        {[[40, 95], [55, 60], [70, 85], [80, 55], [90, 85], [105, 60], [120, 95], [80, 110]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="2" fill="#fff" />
          </g>
        ))}
        {/* Rhombic crystalline facets */}
        <path d="M80 30 L95 45 L80 60 L65 45 Z" fill="#eab308" opacity="0.7" />
        <text x="80" y="135" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="monospace">
          S₈ CROWN RING
        </text>
      </svg>
    );
  }

  // 20. Amoniac NH₃ (Kim Tự Tháp Đóa Hoa Amoniac)
  if (cardId === 'card_comp_nh3' || cardId === 'card_comp_nh3_spire' || chemicalFormula === 'NH3') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#042f2e" />
        {/* Lone pair electron lobe pointing upward */}
        <path d="M80 48 C70 20, 90 20, 80 48" fill="#5eead4" opacity="0.7" filter="drop-shadow(0 0 6px #14b8a6)" />
        {/* Trigonal Pyramidal Bonds */}
        <line x1="80" y1="58" x2="45" y2="105" stroke="#2dd4bf" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="80" y1="58" x2="80" y2="115" stroke="#2dd4bf" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="80" y1="58" x2="115" y2="105" stroke="#2dd4bf" strokeWidth="3.5" strokeLinecap="round" />
        {/* Central N atom */}
        <circle cx="80" cy="58" r="16" fill="#0f766e" stroke="#5eead4" strokeWidth="2.5" />
        <text x="80" y="63" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900">N</text>
        {/* 3 Hydrogen atoms */}
        <circle cx="45" cy="105" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="45" y="108" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">H</text>
        <circle cx="80" cy="115" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="80" y="118" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">H</text>
        <circle cx="115" cy="105" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="115" y="108" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">H</text>
        <text x="80" y="142" textAnchor="middle" fill="#5eead4" fontSize="9" fontWeight="bold" fontFamily="monospace">
          107.8° PYRAMIDAL
        </text>
      </svg>
    );
  }

  // 21. Axit Sunfuric H₂SO₄ (Vua Hóa Chất Than Hóa Háo Nước)
  if (cardId === 'card_comp_h2so4' || cardId === 'card_comp_h2so4_oleum' || chemicalFormula === 'H2SO4') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="acidFlame" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#7f1d1d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="68" fill="url(#acidFlame)" />
        {/* Tetrahedral SO4^2- geometry */}
        <line x1="80" y1="80" x2="80" y2="40" stroke="#f59e0b" strokeWidth="4" />
        <line x1="80" y1="80" x2="80" y2="120" stroke="#f59e0b" strokeWidth="4" />
        <line x1="80" y1="80" x2="40" y2="80" stroke="#38bdf8" strokeWidth="3" />
        <line x1="80" y1="80" x2="120" y2="80" stroke="#38bdf8" strokeWidth="3" />
        {/* Central Sulfur atom */}
        <circle cx="80" cy="80" r="17" fill="#b45309" stroke="#fef08a" strokeWidth="2.5" />
        <text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900">S</text>
        {/* Double-bonded Oxygens (Top & Bottom) */}
        <circle cx="80" cy="40" r="10" fill="#dc2626" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="80" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">=O</text>
        <circle cx="80" cy="120" r="10" fill="#dc2626" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="80" y="124" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">=O</text>
        {/* Single-bonded OH groups (Left & Right) */}
        <circle cx="40" cy="80" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="40" y="83" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">-OH</text>
        <circle cx="120" cy="80" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="120" y="83" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">-OH</text>
        {/* Corrosive droplets */}
        <path d="M60 135 Q65 145 60 148 Q55 145 60 135 Z" fill="#ef4444" />
        <path d="M100 135 Q105 145 100 148 Q95 145 100 135 Z" fill="#ef4444" />
      </svg>
    );
  }

  // 22. Hoàng Đế Axit Nitric HNO₃ (Ostwald Process Titan)
  if (cardId === 'card_comp_hno3' || cardId === 'card_comp_hno3_acid' || chemicalFormula === 'HNO3') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#1e1b4b" />
        {/* Oxidizing Energy Nova */}
        <polygon points="80,25 95,65 135,80 95,95 80,135 65,95 25,80 65,65" fill="#a855f7" opacity="0.3" />
        {/* Trigonal Planar NO3 core */}
        <line x1="80" y1="80" x2="80" y2="45" stroke="#f43f5e" strokeWidth="3.5" />
        <line x1="80" y1="80" x2="48" y2="105" stroke="#f43f5e" strokeWidth="3.5" />
        <line x1="80" y1="80" x2="112" y2="105" stroke="#38bdf8" strokeWidth="3" />
        {/* N atom */}
        <circle cx="80" cy="80" r="16" fill="#4338ca" stroke="#818cf8" strokeWidth="2.5" />
        <text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="900">N⁺</text>
        {/* O atoms */}
        <circle cx="80" cy="45" r="9" fill="#e11d48" stroke="#fecdd3" strokeWidth="1.5" />
        <circle cx="48" cy="105" r="9" fill="#e11d48" stroke="#fecdd3" strokeWidth="1.5" />
        <circle cx="112" cy="105" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <text x="112" y="108" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">OH</text>
        <text x="80" y="142" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">
          OXIDIZING POWER +5
        </text>
      </svg>
    );
  }

  // 23. Cầu Disulfide S–S Link Monster (Link-2 Disulfide Bridge)
  if (cardId === 'card_link_disulfide_bridge') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#1c1917" />
        {/* Covalent S-S single bond beam */}
        <line x1="50" y1="80" x2="110" y2="80" stroke="#facc15" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 0 6px #eab308)" />
        {/* 2 Sulfur atoms */}
        <circle cx="50" cy="80" r="19" fill="#854d0e" stroke="#fde047" strokeWidth="2.5" />
        <text x="50" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">S</text>
        <circle cx="110" cy="80" r="19" fill="#854d0e" stroke="#fde047" strokeWidth="2.5" />
        <text x="110" y="86" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900">S</text>
        {/* 2 Link Arrows (TOP_LEFT, BOTTOM_RIGHT) */}
        <polygon points="25,25 38,28 28,38" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <polygon points="135,135 122,132 132,122" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" />
        <text x="80" y="135" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          DISULFIDE BRIDGE
        </text>
      </svg>
    );
  }

  // 24. Phép Than Hóa Đường Háo Nước (Charring Dehydration Banish)
  if (cardId === 'card_spell_charring_dehydration') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#09090b" />
        {/* Laboratory beaker */}
        <rect x="50" y="55" width="60" height="75" rx="3" fill="#18181b" stroke="#94a3b8" strokeWidth="2" />
        {/* Rising porous black carbon sponge column */}
        <path
          d="M60 120 Q55 80 62 45 Q70 25 80 20 Q90 25 98 45 Q105 80 100 120 Z"
          fill="#171717"
          stroke="#525252"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px #000)"
        />
        {/* Steam vapor escaping (11H2O) */}
        <path d="M65 35 Q60 15 70 10" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M80 30 Q80 10 90 5" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M95 35 Q100 15 90 10" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
        <text x="80" y="145" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
          C₁₂H₂₂O₁₁ → 12C + 11H₂O
        </text>
      </svg>
    );
  }

  // 25. Phép Buồng Phản Ứng Haber-Bosch
  if (cardId === 'card_spell_haber_synthesis') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="68" fill="#0c4a6e" />
        {/* High Pressure Steel Chamber */}
        <rect x="45" y="30" width="70" height="100" rx="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
        {/* Pressure Gauge */}
        <circle cx="80" cy="50" r="12" fill="#0f172a" stroke="#facc15" strokeWidth="2" />
        <line x1="80" y1="50" x2="88" y2="44" stroke="#ef4444" strokeWidth="2" />
        <text x="80" y="75" textAnchor="middle" fill="#f0f9ff" fontSize="10" fontWeight="900" fontFamily="monospace">
          200 ATM
        </text>
        <text x="80" y="90" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="900" fontFamily="monospace">
          450°C [Fe]
        </text>
        <text x="80" y="115" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
          N₂ + 3H₂ ⇌ 2NH₃
        </text>
      </svg>
    );
  }

  // 26. Default Archetype Geometric Core (Fallback for other cards)
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="65" fill="#0f172a" />
      {/* Dynamic orbital tracks */}
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#00f0ff" strokeWidth="1.5" opacity="0.6" transform="rotate(-30 80 80)" />
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#00f0ff" strokeWidth="1.5" opacity="0.6" transform="rotate(30 80 80)" />
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#00f0ff" strokeWidth="1.5" opacity="0.6" transform="rotate(90 80 80)" />
      {/* Central Atomic Nucleus */}
      <circle cx="80" cy="80" r="16" fill="url(#coreGrad)" stroke="#38bdf8" strokeWidth="2" />
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>
      <text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" fontFamily="monospace">
        {chemicalFormula || '⚛'}
      </text>
    </svg>
  );
};
