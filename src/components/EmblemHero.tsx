import React from 'react';

interface EmblemHeroProps {
  className?: string;
  size?: number;
}

export const EmblemHero: React.FC<EmblemHeroProps> = ({ className = '', size = 180 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Radiant Glow Behind Emblem */}
      <div 
        className="absolute rounded-full blur-2xl opacity-40 animate-pulse"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          background: 'radial-gradient(circle, #FFCD00 0%, #C8102E 40%, #002654 80%)'
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-2xl select-none"
        role="img"
        aria-label="Emblème Tadamoun Tchad - Protection, Solidarité et Espoir"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B3B7E" />
            <stop offset="50%" stopColor="#002654" />
            <stop offset="100%" stopColor="#021735" />
          </linearGradient>

          <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="40%" stopColor="#FFCD00" />
            <stop offset="100%" stopColor="#D4A000" />
          </linearGradient>

          <linearGradient id="chadBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00357B" />
            <stop offset="100%" stopColor="#001D45" />
          </linearGradient>

          <linearGradient id="chadYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE033" />
            <stop offset="100%" stopColor="#FFCD00" />
          </linearGradient>

          <linearGradient id="chadRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E61C3D" />
            <stop offset="100%" stopColor="#A80721" />
          </linearGradient>

          <linearGradient id="handLeftGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9D3B4" />
            <stop offset="50%" stopColor="#D49B6A" />
            <stop offset="100%" stopColor="#9C663C" />
          </linearGradient>

          <linearGradient id="handRightGrad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0C39E" />
            <stop offset="50%" stopColor="#C98B58" />
            <stop offset="100%" stopColor="#8C552D" />
          </linearGradient>

          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Outer Circular Laurel / Protective Halo */}
        <circle cx="160" cy="160" r="148" stroke="url(#goldBorder)" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="160" cy="160" r="140" fill="#001738" fillOpacity="0.85" />

        {/* Decorative Golden Star Constellation of Hope */}
        <g opacity="0.75">
          <polygon points="160,28 163,37 172,37 165,42 167,51 160,46 153,51 155,42 148,37 157,37" fill="#FFCD00" />
          <circle cx="115" cy="42" r="2.5" fill="#FFE066" />
          <circle cx="205" cy="42" r="2.5" fill="#FFE066" />
        </g>

        {/* 1. CENTRAL DIPLOMATIC / CONSULAR SHIELD (Protection) */}
        <g filter="url(#shadowFilter)">
          {/* Shield Outer Gold Rim */}
          <path
            d="M160 52 C215 52 235 68 235 125 C235 200 185 240 160 254 C135 240 85 200 85 125 C85 68 105 52 160 52 Z"
            fill="url(#goldBorder)"
          />
          {/* Shield Inner Dark Body */}
          <path
            d="M160 58 C208 58 227 72 227 125 C227 194 180 232 160 246 C140 232 93 194 93 125 C93 72 112 58 160 58 Z"
            fill="url(#shieldGrad)"
          />

          {/* 3. SUBTLE CHADIAN TRICOLOR VERTICAL ACCENTS (Blue, Yellow, Red) */}
          <g>
            {/* Chadian Blue Section (Left) */}
            <path
              d="M115 72 C101 88 98 108 98 126 C98 178 130 214 140 226 L140 72 Z"
              fill="url(#chadBlue)"
              opacity="0.95"
            />
            {/* Chadian Gold/Yellow Section (Center) */}
            <path
              d="M140 68 L180 68 L180 240 C173 243 167 245 160 246 C153 245 147 243 140 240 Z"
              fill="url(#chadYellow)"
              opacity="0.95"
            />
            {/* Chadian Crimson Red Section (Right) */}
            <path
              d="M180 72 L205 72 C219 88 222 108 222 126 C222 178 190 214 180 226 Z"
              fill="url(#chadRed)"
              opacity="0.95"
            />
          </g>

          {/* Diplomatic Olive / Palm Branch of Peace inside Shield */}
          <g transform="translate(160, 138) scale(0.9)" opacity="0.95">
            {/* Central Consular Scale of Justice & Torch */}
            <path d="M0 -38 L0 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-24 -24 L24 -24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            
            {/* Left Balance Pan */}
            <path d="M-24 -24 L-32 -10 L-16 -10 Z" fill="#FFCD00" />
            {/* Right Balance Pan */}
            <path d="M24 -24 L16 -10 L32 -10 Z" fill="#FFCD00" />

            {/* Radiant Flame of Hope / Protection on top */}
            <path d="M0 -46 C-5 -40 -3 -36 0 -34 C3 -36 5 -40 0 -46 Z" fill="#FFCD00" />
            <circle cx="0" cy="-38" r="1.5" fill="#C8102E" />

            {/* Small Chadian Star */}
            <polygon points="0,5 2,11 8,11 3,14 5,20 0,16 -5,20 -3,14 -8,11 -2,11" fill="#FFFFFF" />
          </g>
        </g>

        {/* 2. TWO SUPPORTIVE HANDS HOLDING THE SHIELD (Solidarity & Unity) */}
        {/* Left Protective Hand Wrapping the Base of Shield */}
        <g filter="url(#shadowFilter)">
          <path
            d="M52 235 C62 205 88 200 120 220 C138 232 152 248 156 262 C158 268 155 275 146 276 C132 277 114 266 94 274 C78 280 65 264 52 235 Z"
            fill="url(#handLeftGrad)"
          />
          {/* Gentle supportive fingers clasping upward */}
          <path
            d="M106 214 C116 206 130 216 138 226 C144 233 138 240 130 238 C122 236 112 226 106 214 Z"
            fill="#F6CEAC"
            opacity="0.9"
          />
          {/* Cuff in Chadian Blue */}
          <path
            d="M48 238 L68 285 L42 275 Z"
            fill="#002654"
            stroke="#FFCD00"
            strokeWidth="1.5"
          />
        </g>

        {/* Right Protective Hand Wrapping the Base of Shield in Fraternity */}
        <g filter="url(#shadowFilter)">
          <path
            d="M268 235 C258 205 232 200 200 220 C182 232 168 248 164 262 C162 268 165 275 174 276 C188 277 206 266 226 274 C242 280 255 264 268 235 Z"
            fill="url(#handRightGrad)"
          />
          {/* Gentle supportive fingers clasping upward */}
          <path
            d="M214 214 C204 206 190 216 182 226 C176 233 182 240 190 238 C198 236 208 226 214 214 Z"
            fill="#EDBA91"
            opacity="0.9"
          />
          {/* Cuff in Chadian Red */}
          <path
            d="M272 238 L252 285 L278 275 Z"
            fill="#C8102E"
            stroke="#FFCD00"
            strokeWidth="1.5"
          />
        </g>

        {/* Bottom Banner Ribbon with Motto "TADAMOUN - تضامن" */}
        <g transform="translate(160, 290)">
          {/* Banner Ribbon Path */}
          <path
            d="M-90 -6 L-70 12 L70 12 L90 -6 L80 -14 L-80 -14 Z"
            fill="#001B3D"
            stroke="#FFCD00"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#FFCD00"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily="sans-serif"
          >
            TADAMOUN • تضامن
          </text>
        </g>
      </svg>
    </div>
  );
};
