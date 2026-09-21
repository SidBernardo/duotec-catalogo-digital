import { CartItem, CustomerDetails, SiteConfig } from '../types';

/**
 * Formata números para a moeda configurada (padrão: Kwanza Angolano Kz)
 * Exemplo: 8500 -> "8.500,00 Kz" ou "Kz 8.500,00"
 */
export function formatKz(
  amount: number,
  symbol: string = 'Kz',
  position: 'before' | 'after' = 'after'
): string {
  const parts = amount.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  const formatted = `${integerPart},${decimalPart}`;
  return position === 'before' ? `${symbol} ${formatted}` : `${formatted} ${symbol}`;
}

/**
 * Formata números em moeda compacto sem decimais
 * Exemplo: 8500 -> "8.500 Kz" ou "Kz 8.500"
 */
export function formatKzCompact(
  amount: number,
  symbol: string = 'Kz',
  position: 'before' | 'after' = 'after'
): string {
  const parts = Math.round(amount).toString();
  const integerPart = parts.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return position === 'before' ? `${symbol} ${integerPart}` : `${integerPart} ${symbol}`;
}

/**
 * Helper com base no SiteConfig completo
 */
export function formatPrice(amount: number, config?: Partial<SiteConfig>): string {
  const symbol = config?.currencySymbol || 'Kz';
  const position = config?.currencyPosition || 'after';
  const useDecimals = config?.useDecimals ?? false;

  if (useDecimals) {
    return formatKz(amount, symbol, position);
  }
  return formatKzCompact(amount, symbol, position);
}

/**
 * Constrói a mensagem estruturada e em português para envio no WhatsApp
 */
export function buildWhatsAppOrderMessage(
  cart: CartItem[],
  customer: CustomerDetails,
  siteConfig?: SiteConfig,
  orderId?: string
): string {
  const deliveryFee =
    customer.fulfillmentType === 'entrega' && siteConfig?.deliveryFeeStandard
      ? siteConfig.deliveryFeeStandard
      : 0;

  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = itemsTotal + deliveryFee;

  const companyName = siteConfig?.companyName || 'DUOTEC';
  let message = `*NOVA ENCOMENDA - ${companyName.toUpperCase()}*\n`;
  if (orderId) {
    message += `🔖 *CÓDIGO DO PEDIDO: ${orderId}*\n`;
  }
  message += `--------------------------------\n`;

  // Dados Pessoais do Cliente
  message += `*DADOS DO CLIENTE:*\n`;
  message += `👤 Nome: ${customer.name ? customer.name.trim() : 'Não informado'}\n`;
  message += `📱 Contacto: ${customer.phone ? customer.phone.trim() : 'Não informado'}\n`;
  message += `📦 Recebimento: ${
    customer.fulfillmentType === 'entrega'
      ? '🛵 Entrega ao Domicílio'
      : '🏬 Levantamento / Coleta nas Instalações'
  }\n`;

  if (customer.fulfillmentType === 'entrega') {
    if (customer.municipality?.trim()) {
      message += `📍 Município/Bairro: ${customer.municipality.trim()}\n`;
    }
    if (customer.address?.trim()) {
      message += `🏠 Endereço de Entrega: ${customer.address.trim()}\n`;
    }
  }

  if (customer.paymentMethod?.trim()) {
    message += `💳 Método de Pagamento: ${customer.paymentMethod}\n`;
  }

  if (customer.notes?.trim()) {
    message += `📝 Observações: ${customer.notes.trim()}\n`;
  }

  // Lista dos Itens
  message += `\n*COMPONENTES ENCOMENDADOS:*\n`;
  cart.forEach((item) => {
    const itemSubtotal = item.product.price * item.quantity;
    message += `• ${item.quantity}x ${item.product.name} = ${formatPrice(itemSubtotal, siteConfig)}`;
    if (item.quantity > 1) {
      message += ` (${formatPrice(item.product.price, siteConfig)} un)`;
    }
    message += `\n`;
  });

  if (deliveryFee > 0) {
    message += `🛵 Taxa de Entrega: ${formatPrice(deliveryFee, siteConfig)}\n`;
  }

  message += `--------------------------------\n`;
  message += `*VALOR TOTAL: ${formatPrice(total, siteConfig)}*\n`;
  message += `--------------------------------\n`;
  message += `Por favor, confirmem a disponibilidade do pedido para procedermos com o pagamento. Obrigado!`;

  return message;
}

/**
 * Gera URL oficial do WhatsApp (wa.me)
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
