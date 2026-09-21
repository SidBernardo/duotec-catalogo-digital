import React from 'react';
import { Logo } from './Logo';
import { ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { UserRole } from '../types';

interface WelcomeRoleModalProps {
  isOpen: boolean;
  onSelectRole: (role: UserRole) => void;
  onClose?: () => void;
}

export const WelcomeRoleModal: React.FC<WelcomeRoleModalProps> = ({
  isOpen,
  onSelectRole,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Header with Brand */}
        <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex flex-col items-center text-center space-y-3">
          <Logo size="md" showTagline={false} />
          <div>
            <h2 className="text-xl font-black text-slate-950 tracking-tight">
              Bem-vindo à DUOTEC
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Loja especializada em componentes electrónicos em Angola. Como deseja aceder hoje?
            </p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="p-6 space-y-3.5">
          {/* Opção 1: Sou Cliente */}
          <div
            id="opcao-sou-cliente"
            onClick={() => onSelectRole('cliente')}
            className="group relative p-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/30 transition-all cursor-pointer shadow-2xs hover:shadow-md flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    Sou Cliente
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    Sem Login
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Consultar catálogo de peças, escolher quantidades e fazer compras via WhatsApp.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Opção 2: Sou Gestor */}
          <div
            id="opcao-sou-gestor"
            onClick={() => onSelectRole('gestor')}
            className="group relative p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-600 bg-white hover:bg-indigo-50/30 transition-all cursor-pointer shadow-2xs hover:shadow-md flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    Sou Gestor / Administração
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Requer Login
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Gerir stock de componentes, alterar preços em Kwanzas e acompanhar pedidos.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Poderá alternar de modo a qualquer momento no topo da página.</span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
            >
              Fechar
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
