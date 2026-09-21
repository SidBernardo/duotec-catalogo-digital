import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { formatPrice } from '../utils/formatters';
import { Logo } from './Logo';
import {
  Coins,
  Image as ImageIcon,
  Phone,
  Truck,
  Building2,
  Save,
  RotateCcw,
  CheckCircle2,
  Upload,
  AlertCircle,
  Eye,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface SiteSettingsPanelProps {
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
  onResetDefault: () => void;
}

export const SiteSettingsPanel: React.FC<SiteSettingsPanelProps> = ({
  config,
  onSaveConfig,
  onResetDefault,
}) => {
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<'moeda' | 'logo' | 'whatsapp' | 'logistica' | 'seguranca'>('moeda');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(config.managerPassword || '');
  const [securityError, setSecurityError] = useState<string | null>(null);

  const handleChange = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleChange('customLogoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // Validação de credenciais caso fornecidas
    if (formData.managerPassword) {
      if (formData.managerPassword.length < 4) {
        setActiveSection('seguranca');
        setSecurityError('A palavra-passe exclusiva deve ter pelo menos 4 caracteres.');
        return;
      }

      if (formData.managerPassword !== confirmPassword) {
        setActiveSection('seguranca');
        setSecurityError('A confirmação da palavra-passe não coincide com a nova palavra-passe.');
        return;
      }
    }

    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem a certeza que deseja restaurar as configurações padrão da DUOTEC?')) {
      onResetDefault();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Cabeçalho da Área de Configuração */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold text-[11px] uppercase tracking-wider border border-blue-500/30">
              Painel de Gestão
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Configurações Gerais do Site
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Personalize a moeda, logótipo da loja, contacto de WhatsApp e opções de entrega em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Guardado com sucesso!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
            title="Restaurar valores de origem"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>
        </div>
      </div>

      {/* Navegação de Secções de Configuração */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto scrollbar-none px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setActiveSection('moeda')}
          className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeSection === 'moeda'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Moeda & Preços</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('logo')}
          className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeSection === 'logo'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Logótipo & Identidade</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('whatsapp')}
          className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeSection === 'whatsapp'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp & Contactos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('logistica')}
          className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeSection === 'logistica'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Entrega & Pagamentos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('seguranca')}
          className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
            activeSection === 'seguranca'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Segurança &amp; Acesso</span>
        </button>
      </div>

      {/* Formulário Principal */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        {/* SECÇÃO 1: MOEDA E PREÇOS */}
        {activeSection === 'moeda' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Coins className="w-4 h-4 text-blue-600" />
                Configuração da Moeda do Catálogo
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina como os preços dos componentes são exibidos para os clientes em toda a loja.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Símbolo da Moeda
                </label>
                <input
                  type="text"
                  required
                  value={formData.currencySymbol}
                  onChange={(e) => handleChange('currencySymbol', e.target.value)}
                  placeholder="Ex: Kz, AOA, $, €"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-bold bg-white"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ex: <strong>Kz</strong> (Kwanza Angolano) ou <strong>AOA</strong>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome por Extenso da Moeda
                </label>
                <input
                  type="text"
                  value={formData.currencyName}
                  onChange={(e) => handleChange('currencyName', e.target.value)}
                  placeholder="Ex: Kwanzas Angolanos"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Posição do Símbolo
                </label>
                <select
                  value={formData.currencyPosition}
                  onChange={(e) =>
                    handleChange('currencyPosition', e.target.value as 'before' | 'after')
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="after">Depois do valor (ex: 5.000 Kz)</option>
                  <option value="before">Antes do valor (ex: Kz 5.000)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Em Angola o formato habitual é &quot;5.000 Kz&quot;
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Exibição de Decimais
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.useDecimals}
                      onChange={(e) => handleChange('useDecimals', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Exibir cêntimos com vírgula (ex: ,00)</span>
                  </label>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Recomendado desligado para valores inteiros em Kwanzas.
                </span>
              </div>
            </div>

            {/* Pré-visualização em Tempo Real do Preço */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-blue-950">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Pré-visualização do Formato:</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Exemplo (Arduino Uno):</span>
                <span className="text-base font-black text-blue-900 bg-white px-3 py-1 rounded-lg border border-blue-200 shadow-2xs">
                  {formatPrice(3900, formData)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECÇÃO 2: LOGÓTIPO & IDENTIDADE */}
        {activeSection === 'logo' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                Identidade Visual e Logótipo
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Faça o upload do logótipo da sua loja ou use o vetor oficial da DUOTEC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opções de Logótipo */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload de Logótipo do Dispositivo
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl bg-slate-50 hover:bg-blue-50/30 cursor-pointer transition-colors text-center">
                    <Upload className="w-6 h-6 text-blue-600 mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      Clique para escolher imagem do logótipo
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PNG, JPG ou SVG (fundo transparente ou branco recomendado)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ou Inserir URL do Logótipo Web
                  </label>
                  <input
                    type="url"
                    value={formData.customLogoUrl}
                    onChange={(e) => handleChange('customLogoUrl', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                {formData.customLogoUrl && (
                  <button
                    type="button"
                    onClick={() => handleChange('customLogoUrl', '')}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ✕ Restaurar Logótipo Vetorial Oficial DUOTEC
                  </button>
                )}
              </div>

              {/* Pré-visualização do Logótipo */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-4 text-center">
                <span className="text-xs font-bold text-slate-500">
                  Pré-visualização do Logótipo (Cabeçalho)
                </span>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <Logo
                    size="lg"
                    customLogoUrl={formData.customLogoUrl}
                    companyName={formData.companyName}
                    tagline={formData.tagline}
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xs w-full flex items-center justify-center">
                  <Logo
                    size="md"
                    variant="light"
                    customLogoUrl={formData.customLogoUrl}
                    companyName={formData.companyName}
                    tagline={formData.tagline}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome da Loja
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="DUOTEC"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Slogan / Subtítulo
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Loja de Componentes Electrónicos"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECÇÃO 3: WHATSAPP E CONTACTOS */}
        {activeSection === 'whatsapp' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                WhatsApp para Receção de Pedidos e Contactos
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Para este número serão direcionadas todas as encomendas e listas de compras com as quantidades enviadas pelos clientes.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900">
                <span className="font-bold block">Contacto Oficial DUOTEC:</span>
                O número oficial configurado é <strong>+244 935 130 247</strong>. Ao clicar em &quot;Enviar Pedido no WhatsApp&quot;, o cliente abre a conversa direta com este número com a lista detalhada e cálculos totais em português.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de WhatsApp (com indicativo internacional)
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9+]/g, '');
                    handleChange('whatsappNumber', raw);
                  }}
                  placeholder="+244935130247"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white font-mono font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ex: <strong>244935130247</strong> ou <strong>+244935130247</strong>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefone Formatado para Exibição
                </label>
                <input
                  type="text"
                  value={formData.phoneFormatted}
                  onChange={(e) => handleChange('phoneFormatted', e.target.value)}
                  placeholder="+244 935 130 247"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-mail Comercial
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="geral@duotec.ao"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Horário de Atendimento
                </label>
                <input
                  type="text"
                  value={formData.businessHours}
                  onChange={(e) => handleChange('businessHours', e.target.value)}
                  placeholder="Segunda a Sexta: 08:30 às 17:30 | Sábado: 08:30 às 13:00"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Saudação Inicial da Mensagem do WhatsApp
              </label>
              <textarea
                rows={2}
                value={formData.whatsappGreeting}
                onChange={(e) => handleChange('whatsappGreeting', e.target.value)}
                placeholder="Olá DUOTEC! Gostaria de encomendar os seguintes componentes do catálogo:"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>
        )}

        {/* SECÇÃO 4: LOGÍSTICA & PAGAMENTOS */}
        {activeSection === 'logistica' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                Opções de Entrega, Levantamento e Pagamento
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina as modalidades de entrega em Luanda e dados para pagamento por Multicaixa Express.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Taxa Padrão de Entrega ao Domicílio ({formData.currencySymbol})
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={formData.deliveryFeeStandard}
                  onChange={(e) => handleChange('deliveryFeeStandard', Number(e.target.value))}
                  placeholder="2500"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Valor cobrado se o cliente optar por entrega ao domicílio.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  IBAN / Dados Multicaixa Express (MCX)
                </label>
                <input
                  type="text"
                  value={formData.ibanMCX}
                  onChange={(e) => handleChange('ibanMCX', e.target.value)}
                  placeholder="AO06.0040.0000.1234.5678.9012.3"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Endereço para Levantamento
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Luanda, Angola"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cidade e Província
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Luanda"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Modalidades Disponíveis para o Cliente:
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.enableStorePickup}
                    onChange={(e) => handleChange('enableStorePickup', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Permitir Levantamento nas Instalações (Grátis)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.enableDelivery}
                    onChange={(e) => handleChange('enableDelivery', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Permitir Entrega ao Domicílio ({formatPrice(formData.deliveryFeeStandard, formData)})</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* SECÇÃO 5: SEGURANÇA & ACESSO */}
        {activeSection === 'seguranca' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Credenciais de Acesso ao Painel de Gestão
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina um nome de utilizador e palavra-passe exclusivos para proteger o acesso ao painel de gestão.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold block">Atenção:</span>
                Guarde as suas credenciais num local seguro. Se as perder, não conseguirá aceder ao painel de gestão.
                {!formData.managerUsername && !formData.managerPassword && (
                  <span className="block mt-1 font-semibold text-amber-800">
                    ⚠ Nenhuma credencial personalizada definida ainda. Defina as suas credenciais e guarde para ativar o acesso seguro.
                  </span>
                )}
              </div>
            </div>

            {securityError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold">{securityError}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome de Utilizador <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.managerUsername || ''}
                  onChange={(e) => {
                    setSecurityError(null);
                    handleChange('managerUsername', e.target.value.trim() || undefined);
                  }}
                  placeholder="Escolha um nome de utilizador único"
                  autoComplete="off"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
                {formData.managerUsername && (
                  <span className="text-[11px] text-emerald-600 mt-1 block font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Utilizador definido: <strong>{formData.managerUsername}</strong>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nova Palavra-passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.managerPassword || ''}
                      onChange={(e) => {
                        setSecurityError(null);
                        handleChange('managerPassword', e.target.value || undefined);
                      }}
                      placeholder="Mínimo 4 caracteres"
                      autoComplete="new-password"
                      className="w-full pl-3 pr-9 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirmar Nova Palavra-passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setSecurityError(null);
                        setConfirmPassword(e.target.value);
                      }}
                      placeholder="Repita a nova palavra-passe"
                      autoComplete="new-password"
                      className="w-full pl-3 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Estado da Proteção de Acesso:
              </span>
              <div className="flex items-center gap-3">
                {formData.managerUsername && formData.managerPassword ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 w-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Acesso protegido com credenciais personalizadas. Utilizador: <strong>{formData.managerUsername}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 w-full">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Credenciais personalizadas não configuradas. Defina utilizador e palavra-passe acima.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Barra de Ações Inferior */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            As alterações guardadas são aplicadas instantaneamente em toda a loja.
          </span>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Todas as Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
