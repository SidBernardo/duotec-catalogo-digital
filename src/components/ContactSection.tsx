import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { getWhatsAppUrl } from '../utils/formatters';
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Package,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Dúvida sobre Componentes',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Olá! Mensagem rápida da loja:
    
👤 Nome: ${formData.name || 'Cliente'}
📞 Telefone: ${formData.phone || 'Não informado'}
📌 Assunto: ${formData.subject}

💬 Mensagem / Peças pretendidas:
${formData.message || 'Gostaria de confirmar a disponibilidade de componentes electrónicos.'}`;

    const url = getWhatsAppUrl(COMPANY_INFO.whatsappNumber, formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section id="contactos" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Fale Connosco</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Canais de Atendimento
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Dúvidas sobre disponibilidade de peças, valores de frete ou especificações técnicas de circuitos.
          </p>
        </div>

        {/* 3 Quick Contact Cards - 3/4 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          
          {/* WhatsApp Direct Card */}
          <div className="p-5 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">WhatsApp</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Canal principal para encomendas e confirmação rápida de stock.
              </p>
              <p className="text-xs font-bold text-emerald-700 font-mono">
                {COMPANY_INFO.phone}
              </p>
            </div>

            <a
              id="contact-whatsapp-direct-btn"
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Olá, gostaria de saber sobre disponibilidade de componentes.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              <span>Conversar no WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Telefone Call Card */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Chamada Telefónica</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Linha directa para pedidos de esclarecimento ou contacto verbal.
              </p>
              <p className="text-xs font-semibold text-slate-800">
                {COMPANY_INFO.phoneFormatted}
              </p>
            </div>

            <a
              id="contact-phone-call-btn"
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              <span>Ligar</span>
              <Phone className="w-3 h-3" />
            </a>
          </div>

          {/* Email / Encomendas */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Correio Electrónico</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Envio de listas de componentes para projetos maiores ou orçamentos.
              </p>
              <p className="text-xs font-bold text-blue-700 font-mono truncate">
                {COMPANY_INFO.email}
              </p>
            </div>

            <a
              id="contact-email-btn"
              href={`mailto:${COMPANY_INFO.email}?subject=Pedido%20de%20Componentes`}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors"
            >
              <span>Enviar Email</span>
              <Mail className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Contact Message Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Enviar Pergunta Rápida
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Escreva o que procura ou a sua dúvida técnica. Ao clicar, a conversa abrirá no WhatsApp com o texto já preenchido.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 923 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Assunto
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              >
                <option value="Dúvida sobre Componentes">Dúvida sobre Componentes</option>
                <option value="Disponibilidade de Arduino / ESP32">Disponibilidade de Arduino / ESP32</option>
                <option value="Lista de Peças para Projecto">Lista de Peças para Projecto</option>
                <option value="Entrega e Envio">Entrega e Envio</option>
                <option value="Outro assunto">Outro assunto</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Mensagem ou Relação de Componentes
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Gostaria de saber se têm resistores de 220 ohms e se o display LCD vem com I2C já soldado..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              id="contact-form-submit-btn"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Conversa no WhatsApp</span>
            </button>

            {isSent && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>A abrir o WhatsApp...</span>
              </div>
            )}
          </form>

          {/* Simple delivery note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-blue-500" />
              Entregas e levantamento combinados directamente
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {COMPANY_INFO.businessHours}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
