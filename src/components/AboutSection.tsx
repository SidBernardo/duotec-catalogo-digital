import React from 'react';
import {
  ShoppingCart,
  MessageCircle,
  PackageCheck,
  Truck,
  GraduationCap,
  Bot,
  Wrench,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
  onExploreCatalog: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onContactClick,
  onExploreCatalog,
}) => {
  const steps = [
    {
      step: '1',
      icon: ShoppingCart,
      title: '1. Selecione os Itens',
      description: 'Escolha resistores, Arduinos, CIs ou sensores no catálogo e adicione as quantidades desejadas.',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      step: '2',
      icon: PackageCheck,
      title: '2. Verifique o Carrinho',
      description: 'Veja o total em Kwanzas (Kz), ajuste quantidades e inclua o seu nome ou observações se preferir.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      step: '3',
      icon: MessageCircle,
      title: '3. Envie para o WhatsApp',
      description: 'Com 1 toque, o pedido é formatado em mensagem limpa e aberta directamente no WhatsApp de atendimento.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      step: '4',
      icon: Truck,
      title: '4. Receba ou Levante',
      description: 'Confirme a disponibilidade e combine a entrega ou levantamento dos seus componentes com agilidade.',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  const targetAudience = [
    {
      icon: GraduationCap,
      title: 'Estudantes & Cursos Técnicos',
      description: 'Kits e peças para práticas de laboratório, cadeiras de eletrónica analógica, digital e projetos de fim de curso.',
    },
    {
      icon: Bot,
      title: 'Makers & Robótica',
      description: 'Sensores de linha, ultrassom, módulos relé, pontes H, ESP32 e Arduinos para projetos DIY e automação.',
    },
    {
      icon: Wrench,
      title: 'Técnicos & Reparação',
      description: 'Componentes discretos para bancada: transistores, reguladores de tensão, CIs, solda e ferramentas essenciais.',
    },
  ];

  return (
    <section id="sobre" className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Processo Simples & Prático</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Como Fazer o Seu Pedido de Componentes
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Sem cadastros complicados ou burocracias: monte a sua lista no carrinho e feche tudo pelo WhatsApp em poucos segundos.
          </p>
        </div>

        {/* 4 Steps Grid (4 items per line on desktop) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Etapa {item.step}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Target Audience Cards */}
        <div className="mt-12 pt-10 border-t border-slate-100">
          <h3 className="text-center text-lg sm:text-xl font-bold text-slate-900 mb-6">
            Componentes Disponíveis para Todos os Níveis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {targetAudience.map((target, idx) => {
              const Icon = target.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{target.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {target.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Ver Lista Completa de Peças</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
