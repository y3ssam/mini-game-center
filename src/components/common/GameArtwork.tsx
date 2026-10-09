import { useId } from 'react';
import type { SVGProps } from 'react';

export type ArtworkKind = 'dice' | 'highlow' | 'roulette' | 'blackjack' | 'claw' | 'gacha' | 'counter' | 'collection';

type Props = SVGProps<SVGSVGElement> & { kind: ArtworkKind };

function Plush({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="31" rx="40" ry="8" fill="#000" opacity=".2" />
      <circle cx="-23" cy="-19" r="12" fill={color} />
      <circle cx="23" cy="-19" r="12" fill={color} />
      <ellipse cx="0" cy="14" rx="33" ry="34" fill={color} />
      <circle cx="0" cy="-6" r="30" fill={color} />
      <ellipse cx="-11" cy="-8" rx="3" ry="4" fill="#263050" />
      <ellipse cx="11" cy="-8" rx="3" ry="4" fill="#263050" />
      <ellipse cx="0" cy="4" rx="6" ry="4" fill="#fff4e6" />
      <path d="M-3 6Q0 10 3 6" stroke="#263050" strokeWidth="2" fill="none" />
      <ellipse cx="-14" cy="5" rx="6" ry="3" fill="#ff9eaa" opacity=".7" />
      <ellipse cx="14" cy="5" rx="6" ry="3" fill="#ff9eaa" opacity=".7" />
    </g>
  );
}

export function GameArtwork({ kind, ...props }: Props) {
  const uid = useId().replace(/:/g, '');
  const bg = `art-bg-${uid}`;
  const glow = `art-glow-${uid}`;
  const glass = `art-glass-${uid}`;
  const palette: Record<ArtworkKind, [string, string, string]> = {
    dice: ['#082d49', '#0d4775', '#62c4fb'],
    highlow: ['#402038', '#7a284a', '#ff9fbd'],
    roulette: ['#152e35', '#124b4a', '#eec184'],
    blackjack: ['#222b47', '#474273', '#b3acff'],
    claw: ['#24305f', '#54529a', '#b4abff'],
    gacha: ['#4b254b', '#7d3e72', '#ff9dc3'],
    counter: ['#39293a', '#685043', '#ffc08b'],
    collection: ['#283044', '#324965', '#c5afff'],
  };
  const [dark, mid, bright] = palette[kind];

  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={`시안용 ${kind} 게임 일러스트`} preserveAspectRatio="xMidYMid slice" {...props}>
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={dark} />
          <stop offset=".58" stopColor={mid} />
          <stop offset="1" stopColor="#13182b" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop stopColor={bright} stopOpacity=".38" />
          <stop offset="1" stopColor={bright} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={glass} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#e7f8ff" stopOpacity=".28" />
          <stop offset=".4" stopColor="#e7f8ff" stopOpacity=".03" />
          <stop offset="1" stopColor="#e7f8ff" stopOpacity=".18" />
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill={`url(#${bg})`} />
      <ellipse cx="248" cy="158" rx="250" ry="170" fill={`url(#${glow})`} />
      <path d="M0 250 240 180 480 252V300H0Z" fill="#080e1b" opacity=".26" />
      <path d="M0 269 240 191 480 269M0 291 240 208 480 291" stroke="#ffffff" opacity=".045" strokeWidth="2" fill="none" />
      {kind === 'dice' && (
        <g>
          <ellipse cx="241" cy="246" rx="199" ry="66" fill="#071924" stroke="#bd8b61" strokeWidth="13" />
          <ellipse cx="241" cy="236" rx="172" ry="51" fill="#0e595b" stroke="#2c8589" strokeWidth="3" />
          <g transform="translate(144 105) rotate(-14)">
            <rect x="8" y="10" width="104" height="110" rx="19" fill="#061b34" opacity=".45" />
            <rect width="104" height="110" rx="19" fill="#f5f6ff" />
            <path d="M76 0h9q19 0 19 19v70q0 21-21 21H76Z" fill="#cbd5f2" opacity=".65" />
            <circle cx="28" cy="26" r="8" fill="#284574" />
            <circle cx="74" cy="29" r="8" fill="#284574" />
            <circle cx="50" cy="55" r="8" fill="#284574" />
            <circle cx="28" cy="83" r="8" fill="#284574" />
            <circle cx="74" cy="82" r="8" fill="#284574" />
          </g>
          <g transform="translate(270 116) rotate(12)">
            <rect x="7" y="10" width="95" height="101" rx="18" fill="#051a32" opacity=".4" />
            <rect width="95" height="101" rx="18" fill="#fcfcff" />
            <path d="M70 0h8q17 0 17 18v67q0 16-16 16h-9Z" fill="#cdd4f1" opacity=".7" />
            <circle cx="26" cy="26" r="8" fill="#335181" />
            <circle cx="68" cy="71" r="8" fill="#335181" />
            <circle cx="47" cy="50" r="8" fill="#335181" />
          </g>
          <path d="M61 80 76 67M405 68 422 53M392 98l10 7" stroke="#a9ecff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        </g>
      )}
      {kind === 'highlow' && (
        <g>
          <ellipse cx="242" cy="265" rx="177" ry="30" fill="#0e0d24" opacity=".48" />
          <g transform="translate(102 61) rotate(-16 87 99)">
            <rect x="8" y="9" width="145" height="202" rx="13" fill="#150d26" opacity=".5" />
            <rect width="145" height="202" rx="13" fill="#f8f1ef" stroke="#ffefdf" strokeWidth="3" />
            <text x="18" y="40" fill="#cf4665" fontSize="31" fontWeight="bold" fontFamily="Georgia">A</text>
            <text x="70" y="128" fill="#da4e6c" fontSize="91" textAnchor="middle">♥</text>
          </g>
          <g transform="translate(245 48) rotate(12 75 104)">
            <rect x="7" y="10" width="145" height="202" rx="13" fill="#150d26" opacity=".45" />
            <rect width="145" height="202" rx="13" fill="#f6f4fa" stroke="#fff" strokeWidth="3" />
            <text x="18" y="42" fill="#20233b" fontSize="32" fontWeight="bold" fontFamily="Georgia">K</text>
            <text x="72" y="140" fill="#30324d" fontSize="99" textAnchor="middle">♠</text>
          </g>
          <circle cx="388" cy="85" r="17" fill="#f0c778" opacity=".32" />
        </g>
      )}
      {kind === 'roulette' && (
        <g transform="translate(239 143)">
          <circle r="126" fill="#100d18" stroke="#d6a36a" strokeWidth="9" />
          <circle r="113" fill="#351e22" stroke="#dbb27f" strokeWidth="6" />
          {Array.from({ length: 18 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 20})`}>
              <path d="M0 -106 18 -91 12 -53 -12 -53 -18 -91Z" fill={i === 0 ? '#39a37c' : i % 2 ? '#e25c62' : '#131a29'} stroke="#dcb687" strokeWidth="1.5" />
            </g>
          ))}
          <circle r="51" fill="#735030" stroke="#f1ca8b" strokeWidth="5" />
          <circle r="40" fill="#2b1f25" stroke="#b69162" strokeWidth="3" />
          <path d="M0-44V44M-44 0H44" stroke="#be9c66" strokeWidth="4" />
          <circle r="11" fill="#f4d2a0" />
          <path d="M0 -158 15 -127 -15 -127Z" fill="#f3dfb9" />
        </g>
      )}
      {kind === 'blackjack' && (
        <g>
          <ellipse cx="240" cy="242" rx="195" ry="76" fill="#143f3b" stroke="#cba16b" strokeWidth="11" />
          <ellipse cx="240" cy="238" rx="175" ry="60" fill="#145453" stroke="#ffffff" strokeOpacity=".17" strokeWidth="2" />
          <g transform="translate(122 80) rotate(-13)">
            <rect width="128" height="164" rx="12" fill="#faf8f9" />
            <text x="14" y="37" fontSize="27" fontWeight="bold" fill="#cf3b60" fontFamily="Georgia">A</text>
            <text x="60" y="113" fontSize="72" textAnchor="middle" fill="#ce3b64">♦</text>
          </g>
          <g transform="translate(240 66) rotate(13)">
            <rect width="128" height="164" rx="12" fill="#f9f7ff" />
            <text x="14" y="37" fontSize="27" fontWeight="bold" fill="#242b49" fontFamily="Georgia">J</text>
            <text x="60" y="113" fontSize="72" textAnchor="middle" fill="#222f51">♣</text>
          </g>
        </g>
      )}
      {kind === 'claw' && (
        <g>
          <rect x="67" y="20" width="346" height="262" rx="19" fill="#7389bd" stroke="#bed6ff" strokeWidth="6" />
          <rect x="82" y="33" width="315" height="201" rx="9" fill="#223a63" stroke="#aac9f5" strokeWidth="4" />
          <rect x="82" y="33" width="315" height="201" rx="9" fill={`url(#${glass})`} />
          <path d="M93 49 171 49 102 185" stroke="#effbff" strokeWidth="13" opacity=".08" />
          <g opacity=".66"><Plush x={149} y={177} color="#b7b7ff" scale={.88} /><Plush x={327} y={178} color="#f9c5d5" scale={.91} /></g>
          <Plush x={237} y={183} color="#ffe29d" scale={1.13} />
          <path d="M245 34V87" stroke="#dbeaff" strokeWidth="7" />
          <rect x="218" y="69" width="53" height="29" rx="7" fill="#d9e6fc" stroke="#344467" strokeWidth="6" />
          <path d="M227 93Q196 105 206 141M263 93Q292 105 280 141" fill="none" stroke="#edf5ff" strokeWidth="12" strokeLinecap="round" />
          <path d="M202 140l16 7m66-7-16 7" stroke="#e2edff" strokeWidth="7" strokeLinecap="round" />
          <rect x="67" y="238" width="346" height="44" rx="11" fill="#788ee1" />
          <rect x="100" y="248" width="92" height="25" rx="5" fill="#17254e" />
          <circle cx="351" cy="257" r="13" fill="#ff83ac" stroke="#fff0fa" strokeWidth="3" />
        </g>
      )}
      {kind === 'gacha' && (
        <g>
          <ellipse cx="241" cy="269" rx="141" ry="25" fill="#140e24" opacity=".35" />
          <path d="M134 65Q134 20 179 20h124q44 0 44 45v119H134Z" fill="#f3b1d5" stroke="#ffe2f2" strokeWidth="7" />
          <rect x="153" y="46" width="175" height="136" rx="34" fill="#5d4f92" stroke="#ffeaf7" strokeWidth="6" />
          {[[190,84,'#99dafa'],[242,91,'#ffbd76'],[294,89,'#cfb0ff'],[179,131,'#f7a9d7'],[230,144,'#b4dc89'],[281,138,'#89bafa']].map(([x,y,color],i) => (
            <g key={i}>
              <circle cx={Number(x)} cy={Number(y)} r="24" fill={String(color)} stroke="#e9e5ff" strokeWidth="3" />
              <path d={`M${Number(x)-20} ${y}h40`} stroke="#fff" strokeWidth="3" opacity=".72" />
            </g>
          ))}
          <rect x="117" y="180" width="250" height="82" rx="15" fill="#eb80bd" stroke="#ffdbed" strokeWidth="6" />
          <circle cx="238" cy="221" r="30" fill="#2e365c" stroke="#ffd5eb" strokeWidth="7" />
          <path d="M239 193v53M216 218h45" stroke="#d1d7f4" strokeWidth="8" strokeLinecap="round" />
          <rect x="185" y="247" width="109" height="21" rx="7" fill="#253052" />
        </g>
      )}
      {kind === 'counter' && (
        <g>
          <rect x="28" y="33" width="424" height="172" rx="7" fill="#3d354d" opacity=".7" />
          <path d="M56 53h115v130H56Zm254 0h115v130H310Z" fill="#c59a76" stroke="#ebc2a1" strokeWidth="5" />
          <path d="M72 86h83M72 118h83M328 86h79M328 118h79" stroke="#ffdcba" strokeWidth="5" opacity=".5" />
          <rect x="171" y="40" width="135" height="143" rx="11" fill="#403751" />
          <circle cx="238" cy="115" r="38" fill="#f7c29f" />
          <path d="M193 100q0-61 45-61 45 0 45 61-47-20-90 0" fill="#b45d60" />
          <path d="M207 117h7m43 0h7" stroke="#3d2935" strokeWidth="6" strokeLinecap="round" />
          <path d="M225 132q13 14 26 0" stroke="#ab5865" strokeWidth="4" fill="none" />
          <path d="M171 184q26-41 67-39 42-1 68 39" fill="#aa505d" />
          <rect x="0" y="188" width="480" height="112" fill="#5d3f3c" />
          <rect x="0" y="190" width="480" height="18" fill="#e4a47e" />
          <rect x="323" y="151" width="75" height="50" rx="6" fill="#202b3d" />
          <rect x="336" y="160" width="49" height="25" rx="4" fill="#b8e5d4" />
        </g>
      )}
      {kind === 'collection' && (
        <g>
          <path d="M45 59h390v195H45Z" fill="#1a243e" stroke="#7a8bba" strokeWidth="9" />
          <path d="M45 147h390M175 59v195m130-195v195" stroke="#a2b1dd" strokeWidth="5" />
          <Plush x={106} y={117} color="#b1cbff" scale={.65} />
          <Plush x={237} y={117} color="#ffcae4" scale={.65} />
          <Plush x={368} y={117} color="#fae2a8" scale={.65} />
          <circle cx="108" cy="203" r="33" fill="#aac2f8" />
          <circle cx="237" cy="203" r="33" fill="#efb4dc" />
          <circle cx="368" cy="203" r="33" fill="#b3dbbc" />
          <path d="M87 203h42m-21-21v42M216 203h42m-21-21v42M348 203h40" stroke="#fff" strokeOpacity=".65" strokeWidth="5" />
        </g>
      )}
    </svg>
  );
}
