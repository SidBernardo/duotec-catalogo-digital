import React from 'react';
import { ArrowRight, MessageCircle, Cpu, Zap, Radio, CheckCircle2, Wrench, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onOpenCart: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCatalog }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Subtle circuit background grid */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Component Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Loja de Componentes Electrónicos & Robótica</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Leds, Resistores, CIs, Arduinos & Módulos Electrónicos.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Tudo o que precisa para a sua bancada de montagem, aulas práticas de automação, robótica e manutenção de circuitos. Escolha os seus componentes e feche o pedido directamente no WhatsApp.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all cursor-pointer group"
              >
                <span>Ver Catálogo de Componentes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-whatsapp-consult-btn"
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Olá, tenho interesse em comprar componentes electrónicos pelo catálogo.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>

            {/* Quick key highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Arduinos & Placas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Sensores & Relés</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>CIs, Leds & Diodos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Protoboards & Solda</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Tech Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-800/85 border border-slate-700/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Bancada Electrónica</h3>
                    <p className="text-[11px] text-slate-400">Estudantes, Makers & Técnicos</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  Pronto a Encomendar
                </span>
              </div>

              {/* Pillars in Card */}
              <div className="space-y-2.5 py-4">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <Layers className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Componentes Individuais & Kits</h4>
                    <p className="text-[11px] text-slate-300">Compre unidades avulsas de resistores, CIs, sensores ou caixas organizadoras completas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <Zap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Preços Acessíveis em Kwanzas</h4>
                    <p className="text-[11px] text-slate-300">Sem burocracias ou conversões cambiais: preços claros e actualizados em Kz.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <Radio className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Encomenda Rápida via WhatsApp</h4>
                    <p className="text-[11px] text-slate-300">Monte a lista no carrinho e envie com 1 clique para confirmação de disponibilidade.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Search Prompt */}
              <button
                onClick={onExploreCatalog}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-600 transition-colors"
              >
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>Explorar Todos os 24+ Componentes</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
