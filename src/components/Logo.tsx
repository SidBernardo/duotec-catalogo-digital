import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  customLogoUrl?: string;
  companyName?: string;
  tagline?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  customLogoUrl,
  companyName = 'DUOTEC',
  tagline = 'Loja de Componentes Electrónicos',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Imagem personalizada ou Monograma DT em Circuito Impresso PCB Vectorial Nítido */}
      {customLogoUrl ? (
        <div
          className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm shrink-0 overflow-hidden p-1`}
        >
          <img
            src={customLogoUrl}
            alt={companyName}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div
          className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 text-white shadow-sm shrink-0 overflow-hidden`}
        >
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pistas de circuito PCB */}
            <path
              d="M 6 12 H 14 L 18 16 V 26"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
            <circle cx="6" cy="12" r="1.5" fill="#60a5fa" />
            <path
              d="M 34 28 H 26 L 22 24 V 14"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
            <circle cx="34" cy="28" r="1.5" fill="#22d3ee" />

            {/* Monograma Estilizado DT */}
            <text
              x="50%"
              y="54%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="monospace, system-ui, sans-serif"
              fontWeight="900"
              fontSize="17"
              letterSpacing="-0.08em"
            >
              DT
            </text>

            {/* Ponto de via eletrónica */}
            <circle cx="28" cy="12" r="1.5" fill="#3b82f6" />
          </svg>
        </div>
      )}

      {/* Tipografia Oficial */}
      <div className="flex flex-col">
        <div className={`font-black tracking-wider leading-none ${textSizes[size]}`}>
          {companyName.toUpperCase().startsWith('DUO') && companyName.length >= 6 ? (
            <>
              <span className={isLight ? 'text-white' : 'text-slate-950'}>
                {companyName.substring(0, 3)}
              </span>
              <span className="text-blue-600">{companyName.substring(3)}</span>
            </>
          ) : (
            <span className={isLight ? 'text-white' : 'text-slate-950'}>{companyName}</span>
          )}
        </div>
        {showTagline && (
          <span
            className={`text-[8.5px] font-bold tracking-widest uppercase mt-0.5 ${
              isLight ? 'text-blue-200' : 'text-slate-500'
            }`}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};

