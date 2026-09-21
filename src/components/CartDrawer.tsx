import React, { useState } from 'react';
import { CartItem, CustomerDetails, OrderRecord, SiteConfig } from '../types';
import { COMPANY_INFO } from '../data/company';
import { formatPrice, formatKz, buildWhatsAppOrderMessage, getWhatsAppUrl } from '../utils/formatters';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  MapPin,
  User,
  Phone,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle2,
  Building2,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
  customerDetails: CustomerDetails;
  onUpdateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  onSaveOrder?: (order: OrderRecord) => void;
  siteConfig?: SiteConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  customerDetails,
  onUpdateCustomerDetails,
  onSaveOrder,
  siteConfig,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee =
    customerDetails.fulfillmentType === 'entrega' && siteConfig?.deliveryFeeStandard
      ? siteConfig.deliveryFeeStandard
      : 0;
  const totalAmount = itemsSubtotal + deliveryFee;

  const whatsappPhone = siteConfig?.whatsappNumber || COMPANY_INFO.whatsappNumber;
  const displayPhone = siteConfig?.phoneFormatted || COMPANY_INFO.phoneFormatted;

  const handleCheckoutWhatsApp = () => {
    // Validação obrigatória dos dados pessoais do cliente
    if (!customerDetails.name || customerDetails.name.trim().length < 2) {
      setErrorMessage('Por favor, informe o seu Nome Completo para finalizar a encomenda.');
      return;
    }

    if (!customerDetails.phone || customerDetails.phone.trim().length < 7) {
      setErrorMessage('Por favor, informe o seu Contacto Telefónico ou WhatsApp.');
      return;
    }

    if (
      customerDetails.fulfillmentType === 'entrega' &&
      (!customerDetails.address || customerDetails.address.trim().length < 4)
    ) {
      setErrorMessage('Para entrega ao domicílio, por favor preencha o seu endereço ou ponto de referência.');
      return;
    }

    setErrorMessage(null);

    const generatedOrderId = `PED-${Date.now().toString().slice(-6)}`;
    setLastOrderId(generatedOrderId);

    // Registar o pedido no histórico da loja com o código oficial
    if (onSaveOrder) {
      const newOrder: OrderRecord = {
        id: generatedOrderId,
        createdAt: new Date().toISOString(),
        customer: { ...customerDetails },
        items: [...cart],
        totalAmount,
        status: 'Pendente',
      };
      onSaveOrder(newOrder);
    }

    // Criar mensagem do WhatsApp com o CÓDIGO DO PEDIDO incluído e abrir
    const formattedWhatsAppMessage = buildWhatsAppOrderMessage(cart, customerDetails, siteConfig, generatedOrderId);
    const whatsAppUrl = getWhatsAppUrl(whatsappPhone, formattedWhatsAppMessage);

    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    setOrderSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Clique fora para fechar */}
      <div className="flex-1 hidden sm:block" onClick={onClose} />

      <div
        id="painel-carrinho"
        className="w-full sm:w-[520px] lg:w-[580px] bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10 animate-in slide-in-from-right duration-250"
      >
        {/* Cabeçalho do Carrinho */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Carrinho de Compras
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {totalItems === 0
                  ? 'Nenhum componente selecionado'
                  : `${totalItems} ${totalItems === 1 ? 'componente' : 'componentes'} no pedido`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {cart.length > 0 && (
              <button
                id="btn-limpar-carrinho"
                onClick={onClearCart}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Limpar todos os produtos"
              >
                Limpar
              </button>
            )}
            <button
              id="btn-fechar-carrinho"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Carrinho */}
        {orderSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-black text-slate-900">
                Pedido Gerado com Sucesso!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A sua mensagem foi estruturada e enviada para o atendimento WhatsApp da DUOTEC com o código de identificação do pedido.
              </p>
            </div>

            {/* Caixa com o Código do Pedido */}
            {lastOrderId && (
              <div className="w-full max-w-xs p-4 rounded-xl bg-slate-900 text-white shadow-md space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Código de Rastreio do Pedido
                </span>
                <span className="text-xl font-mono font-black text-emerald-400 tracking-wide block">
                  {lastOrderId}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Guarde este código para acompanhar o seu pedido
                </span>
              </div>
            )}

            <div className="w-full max-w-xs pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  const formattedWhatsAppMessage = buildWhatsAppOrderMessage(cart, customerDetails, siteConfig, lastOrderId || undefined);
                  const whatsAppUrl = getWhatsAppUrl(whatsappPhone, formattedWhatsAppMessage);
                  window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reabrir WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrderSuccess(false);
                  onClearCart();
                  onClose();
                  onContinueShopping();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Concluir & Novo Pedido
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h3 className="text-base font-bold text-slate-900">
                O seu carrinho está vazio
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Navegue pelo nosso catálogo de componentes electrónicos e adicione as quantidades desejadas ao seu pedido.
              </p>
            </div>
            <button
              id="btn-explorar-catalogo"
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <span>Ver Catálogo de Peças</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Lista dos Componentes Selecionados */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Componentes Escolhidos ({cart.length})
                </span>
                <span className="text-xs font-black text-blue-900">
                  Subtotal: {formatKz(totalAmount)}
                </span>
              </div>

              {cart.map((item) => {
                const subtotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    id={`item-carrinho-${item.product.id}`}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex gap-3"
                  >
                    {/* Miniatura do Componente */}
                    <div className="w-16 h-16 rounded-lg bg-white overflow-hidden border border-slate-200 flex-shrink-0 p-1 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Detalhes & Controlo de Quantidade */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="truncate">
                          <span className="text-[9px] font-bold text-blue-600 uppercase">
                            {item.product.categoryName}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            Unitário: {formatPrice(item.product.price, siteConfig)}
                          </span>
                        </div>

                        {/* Botão Remover */}
                        <button
                          id={`btn-remover-${item.product.id}`}
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer flex-shrink-0"
                          title="Remover componente"
                          aria-label={`Remover ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Contador de Quantidade e Subtotal */}
                      <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-200/80">
                        <div className="flex items-center border border-slate-300 rounded-md bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Diminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-900 min-w-[1.8rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-blue-900">
                            {formatPrice(subtotal, siteConfig)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FORMULÁRIO OBRIGATÓRIO DE DADOS DO CLIENTE */}
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50/40 p-4 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  Dados do Cliente & Finalização da Compra
                </h3>
              </div>

              {/* Mensagem de Erro de Validação */}
              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Campo Nome Completo */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="campo-nome-cliente"
                  placeholder="Ex: João Silva ou Nome da Empresa"
                  value={customerDetails.name}
                  onChange={(e) => {
                    setErrorMessage(null);
                    onUpdateCustomerDetails({ name: e.target.value });
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              {/* Campo Contacto Telefónico */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Número de Contacto / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="campo-contacto-cliente"
                    placeholder="Ex: 935 130 247 ou +244 9..."
                    value={customerDetails.phone}
                    onChange={(e) => {
                      setErrorMessage(null);
                      onUpdateCustomerDetails({ phone: e.target.value });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Modo de Recebimento: Coleta vs Entrega */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Modalidade de Recebimento <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateCustomerDetails({ fulfillmentType: 'coleta' })
                    }
                    className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      customerDetails.fulfillmentType === 'coleta'
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs font-bold'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-bold">Levantamento / Coleta</span>
                    </div>
                    <span
                      className={`text-[10px] ${
                        customerDetails.fulfillmentType === 'coleta'
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}
                    >
                      Levantar nas instalações
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdateCustomerDetails({ fulfillmentType: 'entrega' })
                    }
                    className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      customerDetails.fulfillmentType === 'entrega'
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs font-bold'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span className="text-xs font-bold">Entrega ao Domicílio</span>
                    </div>
                    <span
                      className={`text-[10px] ${
                        customerDetails.fulfillmentType === 'entrega'
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}
                    >
                      Envio para o seu endereço
                    </span>
                  </button>
                </div>
              </div>

              {/* Se Entrega selecionada: Campos de Endereço */}
              {customerDetails.fulfillmentType === 'entrega' && (
                <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-2.5 animate-in fade-in">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Município / Bairro <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Talatona, Maianga, Viana, Cazenga, Belas..."
                      value={customerDetails.municipality}
                      onChange={(e) =>
                        onUpdateCustomerDetails({ municipality: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Endereço Completo & Ponto de Referência <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rua Direita, Casa nº 12, próximo à paragem do banco"
                      value={customerDetails.address}
                      onChange={(e) => {
                        setErrorMessage(null);
                        onUpdateCustomerDetails({ address: e.target.value });
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Método de Pagamento Pretendido */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Forma de Pagamento Pretendida
                </label>
                <select
                  value={customerDetails.paymentMethod}
                  onChange={(e) =>
                    onUpdateCustomerDetails({ paymentMethod: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Multicaixa Express (MCX)">Multicaixa Express (MCX)</option>
                  <option value="Transferência Bancária / IBAN">Transferência Bancária / IBAN</option>
                  <option value="Pagamento na Entrega / Coleta (Dinheiro)">Pagamento na Entrega ou Coleta (Dinheiro)</option>
                </select>
              </div>

              {/* Observações Opcionais */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Observações ou Requisitos Especiais (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Preciso de nota fiscal em nome da empresa, ou entregar no período da manhã..."
                  value={customerDetails.notes}
                  onChange={(e) =>
                    onUpdateCustomerDetails({ notes: e.target.value })
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Aviso de Envio Direto ao WhatsApp Oficial */}
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contacto WhatsApp {siteConfig?.companyName || 'DUOTEC'}: {displayPhone}</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Ao clicar no botão abaixo, a sua lista com os componentes e dados pessoais será enviada automaticamente para o nosso atendimento oficial.
              </p>
            </div>
          </div>
        )}

        {/* Rodapé Fixo com Total e Botão de Finalização */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3 shadow-lg">
            <div className="space-y-1.5">
              {deliveryFee > 0 && (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Subtotal Componentes:</span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(itemsSubtotal, siteConfig)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      Taxa de Entrega:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(deliveryFee, siteConfig)}
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Total da Encomenda
                </span>
                <span className="text-lg font-black text-blue-950">
                  {formatPrice(totalAmount, siteConfig)}
                </span>
              </div>
            </div>

            <button
              id="btn-finalizar-whatsapp"
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Finalizar Encomenda no WhatsApp</span>
            </button>

            <p className="text-center text-[10px] text-slate-400 font-medium">
              Atendimento rápido para toda Angola • Luanda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
