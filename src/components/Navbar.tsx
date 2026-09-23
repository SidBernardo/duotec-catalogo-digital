import React from 'react';
import { Logo } from './Logo';
import { ShoppingCart, MessageCircle, Search, ShieldCheck, User } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { formatKzCompact } from '../utils/formatters';
import { UserRole, SiteConfig } from '../types';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenContactInfo?: () => void;
  currentRole: UserRole;
  onOpenRoleSwitcher: () => void;
  siteConfig?: SiteConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  currentRole,
  onOpenRoleSwitcher,
  siteConfig,
}) => {
  const whatsappNum = siteConfig?.whatsappNumber || COMPANY_INFO.whatsappNumber;
  const phoneDisplay = siteConfig?.phoneFormatted || COMPANY_INFO.phoneFormatted;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18 gap-2 sm:gap-6">
          
          {/* Logótipo Real da Marca */}
          <div className="shrink-0 flex items-center">
            <Logo
              size="sm"
              customLogoUrl={siteConfig?.customLogoUrl}
              companyName={siteConfig?.companyName}
              tagline={siteConfig?.tagline}
            />
          </div>

          {/* Barra de Pesquisa Rápida em Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar Arduino, LED, CI, resistor, sensor..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Ações à Direita: Modo Cliente/Gestor + WhatsApp + Carrinho */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Seletor de Modo (Cliente vs Gestor) */}
            <button
              type="button"
              id="btn-alternar-modo"
              onClick={onOpenRoleSwitcher}
              className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 rounded-lg text-xs font-bold border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="Aceder à Área do Gestor"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">Área do Gestor</span>
              <span className="sm:hidden text-[11px]">Gestor</span>
            </button>

            {/* Botão Oficial de Atendimento WhatsApp */}
            <a
              id="header-whatsapp-btn"
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(
                siteConfig?.whatsappGreeting ||
                  'Olá DUOTEC! Gostaria de consultar a disponibilidade de componentes electrónicos.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
              title={`Atendimento WhatsApp (${phoneDisplay})`}
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              <span className="hidden lg:inline">{phoneDisplay}</span>
              <span className="hidden sm:inline lg:hidden">WhatsApp</span>
            </a>

            {/* Botão do Carrinho de Compras */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
                cartItemCount > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              aria-label="Abrir carrinho"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 shrink-0" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartItemCount > 0
                  ? formatKzCompact(
                      cartTotal,
                      siteConfig?.currencySymbol,
                      siteConfig?.currencyPosition
                    )
                  : 'Carrinho'}
              </span>
            </button>
          </div>

        </div>

        {/* Barra de Pesquisa em Ecrãs Móveis */}
        <div className="md:hidden pb-2.5 pt-0.5">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar componentes, CIs, sensores..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
