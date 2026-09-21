import { CompanyInfo, SiteConfig, CategoryItem } from '../types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'DUOTEC',
  tradingName: 'DUOTEC - Loja de Componentes Electrónicos',
  nif: '5001293847',
  tagline: 'Loja de Componentes Electrónicos',
  description:
    'Loja especializada em componentes electrónicos para estudantes, técnicos de reparação, engenheiros e makers em Angola: Arduinos, módulos, sensores, circuitos integrados, resistores, LEDs e prototipagem com encomenda directa via WhatsApp.',
  phone: '+244 935 130 247',
  phoneFormatted: '+244 935 130 247',
  whatsappNumber: '244935130247',
  email: 'geral@duotec.ao',
  address: 'Disponível para levantamento nas instalações ou entrega ao domicílio',
  city: 'Luanda',
  country: 'Angola',
  businessHours: 'Segunda a Sexta: 08:30 às 17:30 | Sábado: 08:30 às 13:00',
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  currencySymbol: 'Kz',
  currencyName: 'Kwanzas (AOA)',
  currencyPosition: 'after',
  useDecimals: false,
  companyName: 'DUOTEC',
  tagline: 'Loja de Componentes Electrónicos',
  phone: '+244 935 130 247',
  phoneFormatted: '+244 935 130 247',
  whatsappNumber: '244935130247',
  email: 'geral@duotec.ao',
  address: 'Disponível para levantamento nas instalações ou entrega ao domicílio',
  city: 'Luanda',
  country: 'Angola',
  businessHours: 'Segunda a Sexta: 08:30 às 17:30 | Sábado: 08:30 às 13:00',
  customLogoUrl: '',
  deliveryFeeStandard: 2500,
  enableDelivery: true,
  enableStorePickup: true,
  whatsappGreeting: 'Olá DUOTEC! Gostaria de encomendar os seguintes componentes do catálogo:',
  ibanMCX: 'AO06.0040.0000.1234.5678.9012.3',
};

export const DEFAULT_CATEGORIES_LIST: CategoryItem[] = [
  { id: 'todos', name: 'Todos os Componentes' },
  { id: 'placas-micro', name: 'Placas & Microcontroladores', description: 'Arduinos, ESP32, shields e microcontroladores' },
  { id: 'modulos-comunicacao', name: 'Módulos & Comunicação', description: 'Bluetooth, Wi-Fi, RFID, GSM e IoT' },
  { id: 'sensores', name: 'Sensores & Medição', description: 'Sensores de temperatura, humidade, gás, ultrassom, fluxo e ópticos' },
  { id: 'motores-reles-atuadores', name: 'Motores, Relés & Atuadores', description: 'Servos SG90, motores DC, drivers L298N e relés' },
  { id: 'displays-sinalizacao', name: 'Displays & Sinalização', description: 'Displays LCD 1602/2004, OLED, 7 segmentos, buzzers e LEDs' },
  { id: 'circuitos-integrados', name: 'Circuitos Integrados (CIs)', description: 'Portas lógicas CMOS/TTL, amplificadores e temporizadores' },
  { id: 'reguladores-alimentacao', name: 'Reguladores & Alimentação', description: 'Reguladores LM78xx, LM2596, baterias e fontes' },
  { id: 'semicondutores', name: 'Diodos & Transístores', description: 'Transístores NPN/PNP, MOSFETs de potência e diodos' },
  { id: 'passivos-resistores-chaves', name: 'Passivos, Resistores & Chaves', description: 'Resistores de precisão, capacitores, potenciómetros e botões' },
  { id: 'prototipagem-solda', name: 'Prototipagem & Solda', description: 'Breadboards, fios jumpers, ferros de soldar e estanho' },
];

export const CATEGORIES_LIST: CategoryItem[] = DEFAULT_CATEGORIES_LIST;
