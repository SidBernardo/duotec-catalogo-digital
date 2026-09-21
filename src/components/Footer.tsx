import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { MessageCircle, Phone, Mail, Clock, ShoppingCart, Send } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  onOpenCart?: () => void;
  siteConfig?: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCart, siteConfig }) => {
  const whatsappNum = siteConfig?.whatsappNumber || COMPANY_INFO.whatsappNumber;
  const phoneDisplay = siteConfig?.phoneFormatted || COMPANY_INFO.phoneFormatted;
  const companyName = siteConfig?.companyName || COMPANY_INFO.name;
  const currencySymbol = siteConfig?.currencySymbol || 'Kz';
  const businessHours = siteConfig?.businessHours || COMPANY_INFO.businessHours;
  const email = siteConfig?.email || COMPANY_INFO.email;

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Simple How-it-works Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Escolha as Peças</p>
              <p className="text-[11px] text-slate-500">Adicione os componentes pretendidos ao carrinho.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Revise o Pedido</p>
              <p className="text-[11px] text-slate-500">Ajuste quantidades e confira o total em {currencySymbol}.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Envie no WhatsApp</p>
              <p className="text-[11px] text-slate-500">Gere a mensagem formatada e envie com 1 clique.</p>
            </div>
          </div>
        </div>

        {/* Contact Links & Information */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
            <a
              href={`https://wa.me/${whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: {phoneDisplay}</span>
            </a>

            <a
              href={`tel:${whatsappNum}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{phoneDisplay}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{email}</span>
            </a>

            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{businessHours}</span>
            </span>
          </div>

          <div className="text-slate-400 text-[11px] text-center sm:text-right">
            <span>© {new Date().getFullYear()} {companyName} • Preços em {currencySymbol}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
