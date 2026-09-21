export type ProductCategory = string;

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isCustom?: boolean;
}

export interface SiteConfig {
  currencySymbol: string;
  currencyName: string;
  currencyPosition: 'before' | 'after';
  useDecimals: boolean;
  companyName: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  businessHours: string;
  customLogoUrl: string;
  deliveryFeeStandard: number;
  enableDelivery: boolean;
  enableStorePickup: boolean;
  whatsappGreeting: string;
  ibanMCX: string;
  managerUsername?: string;
  managerPassword?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number; // em Kwanzas (Kz)
  originalPrice?: number;
  shortDescription: string;
  detailedDescription?: string;
  image: string;
  brand: string;
  inStock: boolean;
  stockQuantity?: number;
  featured?: boolean;
  specs?: string[];
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FulfillmentType = 'entrega' | 'coleta';

export interface CustomerDetails {
  name: string;
  phone: string;
  fulfillmentType: FulfillmentType;
  address: string;
  municipality: string;
  paymentMethod: string;
  notes: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  totalAmount: number;
  status: 'Pendente' | 'Confirmado' | 'Entregue' | 'Cancelado';
}

export type UserRole = 'cliente' | 'gestor';

export interface CompanyInfo {
  name: string;
  tradingName: string;
  nif: string;
  tagline: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  businessHours: string;
}
