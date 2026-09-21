import React, { useState } from 'react';
import { Product, OrderRecord, ProductCategory, SiteConfig, CategoryItem } from '../types';
import { Logo } from './Logo';
import { formatPrice } from '../utils/formatters';
import { COMPANY_INFO, CATEGORIES_LIST } from '../data/company';
import { SiteSettingsPanel } from './SiteSettingsPanel';
import { resolveComponentImage } from '../data/componentImages';
import {
  Package,
  ShoppingBag,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  LogOut,
  Eye,
  Store,
  MessageCircle,
  Phone,
  Clock,
  Edit2,
  Trash2,
  SlidersHorizontal,
  MapPin,
  Upload,
  AlertTriangle,
  FolderTree,
  FolderPlus,
  Image as ImageIcon,
  ChevronDown,
  Layers,
  RotateCcw,
  Sparkles,
  Check,
  Tag,
  Boxes,
  Truck,
  Copy,
  ExternalLink,
  Calendar,
  DollarSign,
  Filter,
  Receipt,
  User as UserIcon,
  CalendarDays,
  List,
  LayoutGrid,
} from 'lucide-react';

interface ManagerDashboardProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
  onSwitchToClient: () => void;
  onLogout: () => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (newConfig: SiteConfig) => void;
  onResetSiteConfig: () => void;
  categories?: CategoryItem[];
  onAddCategory?: (category: CategoryItem) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onResetCategories?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  onSwitchToClient,
  onLogout,
  siteConfig,
  onUpdateSiteConfig,
  onResetSiteConfig,
  categories = CATEGORIES_LIST,
  onAddCategory,
  onDeleteCategory,
  onResetCategories,
}) => {
  const [activeTab, setActiveTab] = useState<'produtos' | 'categorias' | 'pedidos' | 'config' | 'alertas' | 'familias'>('produtos');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Estado para edição rápida de preço
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Estado para edição completa de produto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductDesc, setEditProductDesc] = useState('');
  const [editProductPrice, setEditProductPrice] = useState<number>(0);
  const [editProductBrand, setEditProductBrand] = useState('');
  const [editProductInStock, setEditProductInStock] = useState<boolean>(true);
  const [editProductSpecs, setEditProductSpecs] = useState('');
  const [editProductImage, setEditProductImage] = useState('');
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // Estado para cadastro de nova categoria / família
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('⚡');
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  // Estado para cadastro de novo produto
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<string>(
    categories.find((c) => c.id !== 'todos')?.id || 'placas-micro'
  );
  const [newProductPrice, setNewProductPrice] = useState<number>(5000);
  const [newProductInStock, setNewProductInStock] = useState<boolean>(true);
  const [newProductBrand, setNewProductBrand] = useState('DUOTEC');
  const [newProductImage, setNewProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductSpecs, setNewProductSpecs] = useState('');

  // Métricas calculadas operacionais
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const activeCategories = categories.filter((c) => c.id !== 'todos');
  const activeCategoriesCount = activeCategories.length;

  // Estados e Métricas dos Pedidos
  const [orderSearchFilter, setOrderSearchFilter] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'todos' | OrderRecord['status']>('todos');
  const [orderTypeFilter, setOrderTypeFilter] = useState<'todos' | 'entrega' | 'coleta'>('todos');
  const [orderDateRange, setOrderDateRange] = useState<'todos' | 'hoje' | '7dias' | 'mes' | 'custom'>('todos');
  const [orderDateStart, setOrderDateStart] = useState('');
  const [orderDateEnd, setOrderDateEnd] = useState('');
  const [orderViewMode, setOrderViewMode] = useState<'tabela' | 'cards'>('tabela');
  const [viewingOrderDetails, setViewingOrderDetails] = useState<OrderRecord | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pendente').length;
  const confirmedOrdersCount = orders.filter((o) => o.status === 'Confirmado').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Entregue').length;
  const cancelledOrdersCount = orders.filter((o) => o.status === 'Cancelado').length;

  const totalRevenueAll = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalConfirmedRevenue = orders
    .filter((o) => o.status === 'Confirmado' || o.status === 'Entregue')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const averageTicket = totalOrdersCount > 0 ? Math.round(totalRevenueAll / totalOrdersCount) : 0;
  const deliveryOrdersCount = orders.filter((o) => o.customer.fulfillmentType === 'entrega').length;
  const pickupOrdersCount = orders.filter((o) => o.customer.fulfillmentType === 'coleta').length;

  // Filtragem Dinâmica dos Pedidos (com pesquisa, status, tipo e DATAS)
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = orderStatusFilter === 'todos' || order.status === orderStatusFilter;
    const matchesType = orderTypeFilter === 'todos' || order.customer.fulfillmentType === orderTypeFilter;
    const q = orderSearchFilter.toLowerCase().trim();
    const matchesQuery =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.phone.toLowerCase().includes(q) ||
      (order.customer.municipality && order.customer.municipality.toLowerCase().includes(q)) ||
      (order.customer.address && order.customer.address.toLowerCase().includes(q)) ||
      order.items.some((item) => item.product.name.toLowerCase().includes(q));

    const matchesDate = (() => {
      if (orderDateRange === 'todos') return true;
      const orderDate = new Date(order.createdAt);
      const now = new Date();

      if (orderDateRange === 'hoje') {
        return (
          orderDate.getDate() === now.getDate() &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      if (orderDateRange === '7dias') {
        const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7 && diffDays >= 0;
      }

      if (orderDateRange === 'mes') {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      if (orderDateRange === 'custom') {
        if (orderDateStart && orderDateEnd) {
          const start = new Date(`${orderDateStart}T00:00:00`);
          const end = new Date(`${orderDateEnd}T23:59:59`);
          return orderDate >= start && orderDate <= end;
        } else if (orderDateStart) {
          const start = new Date(`${orderDateStart}T00:00:00`);
          return orderDate >= start;
        } else if (orderDateEnd) {
          const end = new Date(`${orderDateEnd}T23:59:59`);
          return orderDate <= end;
        }
      }

      return true;
    })();

    return matchesStatus && matchesType && matchesQuery && matchesDate;
  });

  const handleCopyOrderSummary = (order: OrderRecord) => {
    const itemsText = order.items
      .map((i) => `• ${i.quantity}x ${i.product.name} (${formatPrice(i.product.price * i.quantity, siteConfig)})`)
      .join('\n');
    const summary = `*RESUMO DO PEDIDO ${order.id}*\nCliente: ${order.customer.name}\nContacto: ${order.customer.phone}\nTipo: ${
      order.customer.fulfillmentType === 'entrega' ? 'Entrega ao Domicílio' : 'Levantamento nas Instalações'
    }\n${order.customer.address ? `Endereço: ${order.customer.address} (${order.customer.municipality})\n` : ''}Pagamento: ${
      order.customer.paymentMethod || 'MCX'
    }\n\n*Itens:*\n${itemsText}\n\n*Total: ${formatPrice(order.totalAmount, siteConfig)}*\nEstado: ${order.status}`;

    navigator.clipboard.writeText(summary);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  // Filtros de produtos
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'todos' || p.category === selectedCategory;
    const q = searchFilter.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleCatNameChange = (name: string) => {
    setNewCatName(name);
    if (isAutoSlug) {
      setNewCatId(generateSlug(name));
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatId.trim() || generateSlug(newCatName);
    const newCategoryItem: CategoryItem = {
      id: slug,
      name: newCatName.trim(),
      description: newCatDesc.trim() || `Componentes e artigos de ${newCatName.trim()}`,
      icon: newCatIcon || '⚡',
    };

    if (onAddCategory) {
      onAddCategory(newCategoryItem);
    }

    setShowAddCategoryModal(false);
    setNewCatName('');
    setNewCatId('');
    setNewCatDesc('');
    setNewCatIcon('⚡');
    setIsAutoSlug(true);
  };

  const handleStartEditPrice = (product: Product) => {
    setEditingPriceId(product.id);
    setTempPrice(product.price);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductDesc(product.shortDescription || '');
    setEditProductPrice(product.price);
    setEditProductBrand(product.brand);
    setEditProductInStock(product.inStock);
    setEditProductSpecs(product.specs ? product.specs.join(', ') : '');
    setEditProductImage(product.image || '');
    setEditImagePreview(product.image || null);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editProductName.trim()) return;

    const catObj = categories.find((c) => c.id === editingProduct.category);
    const updated: Product = {
      ...editingProduct,
      name: editProductName.trim(),
      shortDescription: editProductDesc.trim() || editingProduct.shortDescription,
      price: Math.max(50, Number(editProductPrice)),
      brand: editProductBrand.trim() || editingProduct.brand,
      inStock: editProductInStock,
      stockQuantity: editProductInStock ? 999 : 0,
      image: editProductImage.trim() || editingProduct.image,
      categoryName: catObj ? catObj.name : editingProduct.categoryName,
      specs: editProductSpecs
        ? editProductSpecs.split(',').map((s) => s.trim())
        : editingProduct.specs,
    };

    onUpdateProduct(updated);
    setEditingProduct(null);
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditProductImage(result);
        setEditImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePrice = (product: Product) => {
    onUpdateProduct({ ...product, price: Math.max(100, tempPrice) });
    setEditingPriceId(null);
  };

  const handleStockSelectChange = (product: Product, value: string) => {
    const isNowInStock = value === 'em_stock';
    onUpdateProduct({
      ...product,
      inStock: isNowInStock,
      stockQuantity: isNowInStock ? 999 : 0,
    });
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setNewProductImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const catObj = categories.find((c) => c.id === newProductCategory);

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newProductName.trim(),
      category: newProductCategory,
      categoryName: catObj ? catObj.name : 'Geral',
      price: Number(newProductPrice) || 1000,
      shortDescription: newProductDesc.trim() || 'Componente eletrónico de alta precisão.',
      brand: newProductBrand.trim() || 'DUOTEC',
      inStock: newProductInStock,
      stockQuantity: newProductInStock ? 999 : 0,
      image: newProductImage.trim() || '',
      specs: newProductSpecs
        ? newProductSpecs.split(',').map((s) => s.trim())
        : ['Padrão industrial para electrónica', 'Garantia DUOTEC'],
    };

    onAddProduct(created);
    setShowAddModal(false);
    setNewProductName('');
    setNewProductDesc('');
    setNewProductSpecs('');
    setNewProductImage('');
    setImagePreview(null);
    setNewProductInStock(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Barra de Navegação do Gestor */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="light" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-indigo-900/80 text-indigo-200 text-[11px] font-bold border border-indigo-700/50">
              Painel de Gestão
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onSwitchToClient}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ver Loja do Cliente</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
              title="Sair da sessão de gestor"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Terminar Sessão</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Painel */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Cartões de Métricas e Navegação Operacional */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('produtos')}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'produtos'
                ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-xs'
            }`}
          >
            <span className="text-xs text-slate-500 font-semibold block">Total de Componentes</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{totalProducts}</span>
              <span className="text-xs text-emerald-600 font-bold">{inStockCount} disponíveis</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alertas')}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'alertas'
                ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
                : 'bg-white border-slate-200 shadow-2xs hover:border-amber-300 hover:shadow-xs'
            }`}
          >
            <span className="text-xs text-slate-500 font-semibold block">Alertas de Reposição</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">
                {outOfStockCount > 0 ? outOfStockCount : '0'}
              </span>
              {outOfStockCount > 0 ? (
                <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                  <AlertTriangle className="w-3 h-3" /> Esgotados
                </span>
              ) : (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> 100% Abastecido
                </span>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('familias')}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'familias'
                ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-xs'
            }`}
          >
            <span className="text-xs text-slate-500 font-semibold block">Famílias de Produtos</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{activeCategoriesCount}</span>
              <span className="text-xs text-blue-600 font-bold flex items-center gap-0.5">
                <FolderTree className="w-3 h-3" /> Gerir Famílias
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'pedidos'
                ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                : 'bg-white border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <span className="text-xs text-slate-500 font-semibold block">Pedidos via WhatsApp</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{orders.length}</span>
              <span className="text-xs text-indigo-600 font-bold">
                {pendingOrdersCount} pendentes
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-xs'
            }`}
          >
            <span className="text-xs text-slate-500 font-semibold block">Definições</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Loja & Site
              </span>
              <span className="text-xs text-blue-600 font-bold">
                Configurar
              </span>
            </div>
          </button>
        </div>

        {/* TAB 1: GESTÃO DE COMPONENTES */}
        {activeTab === 'produtos' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-4 sm:p-5">
            {/* Barra de Filtros e Botões */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Pesquisar componente ou marca..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium focus:outline-hidden"
                >
                  <option value="todos">Todas Famílias ({products.length})</option>
                  {categories.filter((c) => c.id !== 'todos').map((c) => {
                    const count = products.filter((p) => p.category === c.id).length;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.name} ({count})
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(true)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Adicionar nova família de produtos"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Nova Família</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Registar Novo Componente</span>
              </button>
            </div>

            {/* Tabela de Produtos para o Gestor */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Componente</th>
                    <th className="py-2.5 px-3">Família / Categoria</th>
                    <th className="py-2.5 px-3 text-right">Preço em Kwanzas (Kz)</th>
                    <th className="py-2.5 px-3 text-center">Estado do Stock</th>
                    <th className="py-2.5 px-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Nenhum componente encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const isEditingPrice = editingPriceId === product.id;
                      const productImgUrl = resolveComponentImage(product.name, product.category, product.image);

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                          onClick={(e) => {
                            // Não abrir edição se clicar nos controles inline
                            const target = e.target as HTMLElement;
                            if (
                              target.closest('select') ||
                              target.closest('button') ||
                              target.closest('input')
                            ) return;
                            handleOpenEditProduct(product);
                          }}
                          title="Clique para editar este componente"
                        >
                          {/* Nome & Miniatura com imagem correta */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-11 h-11 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                                <img
                                  src={productImgUrl}
                                  alt={product.name}
                                  className={`max-h-full max-w-full object-contain ${
                                    !product.inStock ? 'grayscale opacity-60' : ''
                                  }`}
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 text-xs leading-snug">
                                  {product.name}
                                </div>
                                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                  <span className="font-medium text-slate-600">{product.brand}</span>
                                  <span>•</span>
                                  <span className="truncate max-w-[140px]">{product.shortDescription}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Categoria */}
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-100">
                              {product.categoryName}
                            </span>
                          </td>

                          {/* Preço (com edição inline) */}
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                            {isEditingPrice ? (
                              <div className="flex items-center justify-end gap-1">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-24 px-2 py-1 text-xs border border-blue-500 rounded text-right font-bold"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSavePrice(product)}
                                  className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold cursor-pointer"
                                >
                                  Guardar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingPriceId(null)}
                                  className="px-1.5 py-1 rounded text-slate-500 text-[10px] cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1.5">
                                <span className="text-blue-950 font-black">
                                  {formatPrice(product.price, siteConfig)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleStartEditPrice(product)}
                                  className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 cursor-pointer"
                                  title="Editar preço"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Estado do Stock - Selecionável entre 'Em stock / Esgotado' */}
                          <td className="py-2.5 px-3 text-center">
                            <div className="relative inline-block">
                              <select
                                id={`stock-selector-${product.id}`}
                                value={product.inStock ? 'em_stock' : 'esgotado'}
                                onChange={(e) => handleStockSelectChange(product, e.target.value)}
                                className={`text-xs font-bold pl-2.5 pr-7 py-1 rounded-lg border cursor-pointer appearance-none transition-all shadow-2xs focus:outline-hidden focus:ring-2 ${
                                  product.inStock
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/80 focus:ring-emerald-400'
                                    : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100/80 focus:ring-rose-400'
                                }`}
                                title="Selecione: Em stock / Esgotado"
                              >
                                <option value="em_stock" className="bg-white text-emerald-800 font-bold">
                                  🟢 Em stock
                                </option>
                                <option value="esgotado" className="bg-white text-rose-800 font-bold">
                                  🔴 Esgotado
                                </option>
                              </select>
                              <ChevronDown
                                className={`w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                                  product.inStock ? 'text-emerald-700' : 'text-rose-700'
                                }`}
                              />
                            </div>
                          </td>

                          {/* Ações */}
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleOpenEditProduct(product); }}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Editar componente"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); onDeleteProduct(product.id); }}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar produto do catálogo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: HISTÓRICO DE ENCOMENDAS & ESTATÍSTICAS */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* PAINEL DE ESTATÍSTICAS DOS PEDIDOS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Card 1: Faturamento Confirmado */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Receita Confirmada</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 block truncate">
                    {formatPrice(totalConfirmedRevenue, siteConfig)}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Bruto potencial: {formatPrice(totalRevenueAll, siteConfig)}
                  </span>
                </div>
              </div>

              {/* Card 2: Total de Encomendas */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Total de Pedidos</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    {totalOrdersCount}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">
                    {deliveredOrdersCount} entregues
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {confirmedOrdersCount} confirmados em preparação
                </span>
              </div>

              {/* Card 3: Pedidos Pendentes */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Aguardam Confirmação</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    pendingOrdersCount > 0 ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className={`text-xl sm:text-2xl font-black ${
                    pendingOrdersCount > 0 ? 'text-amber-700' : 'text-slate-900'
                  }`}>
                    {pendingOrdersCount}
                  </span>
                  {pendingOrdersCount > 0 ? (
                    <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Ação Necessária
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold">
                      Em dia
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Mensagens pendentes no WhatsApp
                </span>
              </div>

              {/* Card 4: Ticket Médio */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Ticket Médio / Pedido</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 block truncate">
                    {formatPrice(averageTicket, siteConfig)}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {deliveryOrdersCount} entregas • {pickupOrdersCount} coletas
                  </span>
                </div>
              </div>

            </div>

            {/* BARRA DE CONTROLO: PESQUISA, DATAS E FILTROS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3.5">
              
              {/* Linha 1: Pesquisa, Tipo de Envio e Alternância de Vista */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Campo de Pesquisa por Código ou Cliente */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={orderSearchFilter}
                    onChange={(e) => setOrderSearchFilter(e.target.value)}
                    placeholder="Pesquisar por Código (#PED-...), Cliente, Telefone ou Item..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  {orderSearchFilter && (
                    <button
                      type="button"
                      onClick={() => setOrderSearchFilter('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Filtro por Tipo de Recebimento */}
                  <select
                    value={orderTypeFilter}
                    onChange={(e) => setOrderTypeFilter(e.target.value as 'todos' | 'entrega' | 'coleta')}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:outline-hidden"
                  >
                    <option value="todos">Todos os Envios ({orders.length})</option>
                    <option value="entrega">🛵 Entrega ao Domicílio ({deliveryOrdersCount})</option>
                    <option value="coleta">🏬 Levantamento ({pickupOrdersCount})</option>
                  </select>

                  {/* Alternador de Modo: Tabela Compacta vs Cards */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOrderViewMode('tabela')}
                      className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        orderViewMode === 'tabela'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                      title="Visualização em Tabela Compacta"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Tabela</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderViewMode('cards')}
                      className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        orderViewMode === 'cards'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                      title="Visualização em Cards"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Cards</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Linha 2: Filtros de Datas */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-bold flex items-center gap-1 text-[11px] mr-1">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
                    <span>Período:</span>
                  </span>

                  {[
                    { id: 'todos', label: 'Todas as Datas' },
                    { id: 'hoje', label: 'Hoje' },
                    { id: '7dias', label: 'Últimos 7 dias' },
                    { id: 'mes', label: 'Este Mês' },
                    { id: 'custom', label: 'Personalizado' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setOrderDateRange(preset.id as typeof orderDateRange)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                        orderDateRange === preset.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Intervalo de Datas Personalizado */}
                {orderDateRange === 'custom' && (
                  <div className="flex items-center gap-2 bg-blue-50/70 p-1.5 rounded-lg border border-blue-200 animate-in fade-in">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-500">De:</span>
                      <input
                        type="date"
                        value={orderDateStart}
                        onChange={(e) => setOrderDateStart(e.target.value)}
                        className="px-2 py-0.5 text-xs rounded border border-slate-300 bg-white font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-500">Até:</span>
                      <input
                        type="date"
                        value={orderDateEnd}
                        onChange={(e) => setOrderDateEnd(e.target.value)}
                        className="px-2 py-0.5 text-xs rounded border border-slate-300 bg-white font-medium"
                      />
                    </div>
                    {(orderDateStart || orderDateEnd) && (
                      <button
                        type="button"
                        onClick={() => {
                          setOrderDateStart('');
                          setOrderDateEnd('');
                        }}
                        className="text-[10px] font-bold text-slate-500 hover:text-red-600 px-1 cursor-pointer"
                        title="Limpar datas"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Linha 3: Botões de Filtro por Estado */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('todos')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors shrink-0 cursor-pointer ${
                    orderStatusFilter === 'todos'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todos ({totalOrdersCount})
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('Pendente')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    orderStatusFilter === 'Pendente'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Pendentes ({pendingOrdersCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('Confirmado')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    orderStatusFilter === 'Confirmado'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Confirmados ({confirmedOrdersCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('Entregue')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    orderStatusFilter === 'Entregue'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                  }`}
                >
                  <Package className="w-3 h-3" />
                  <span>Entregues ({deliveredOrdersCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('Cancelado')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    orderStatusFilter === 'Cancelado'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  <span>Cancelados ({cancelledOrdersCount})</span>
                </button>
              </div>
            </div>

            {/* LISTAGEM DOS PEDIDOS */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-12 text-center space-y-3">
                <Receipt className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">
                  {orders.length === 0 ? 'Ainda não foram registados pedidos nesta sessão' : 'Nenhum pedido encontrado com os filtros aplicados'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {orders.length === 0
                    ? 'Quando um cliente finalizar a encomenda pelo carrinho no WhatsApp, o pedido aparecerá aqui com todos os detalhes e o seu código único.'
                    : 'Tente alterar os termos de pesquisa, o período de datas ou o filtro de estado acima.'}
                </p>
                {orders.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrderSearchFilter('');
                      setOrderStatusFilter('todos');
                      setOrderTypeFilter('todos');
                      setOrderDateRange('todos');
                      setOrderDateStart('');
                      setOrderDateEnd('');
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Limpar todos os filtros
                  </button>
                )}
              </div>
            ) : orderViewMode === 'tabela' ? (
              
              /* VISTA 1: TABELA COMPACTA (MENOR, DINÂMICA E DIRETA AO PONTO) */
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold border-b border-slate-200">
                        <th className="py-2.5 px-3">Código & Data</th>
                        <th className="py-2.5 px-3">Cliente / Telefone</th>
                        <th className="py-2.5 px-3">Modalidade</th>
                        <th className="py-2.5 px-3">Componentes</th>
                        <th className="py-2.5 px-3 text-right">Valor Total</th>
                        <th className="py-2.5 px-3 text-center">Estado</th>
                        <th className="py-2.5 px-3 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((order) => {
                        const isDelivery = order.customer.fulfillmentType === 'entrega';
                        const cleanPhone = order.customer.phone.replace(/\D/g, '');
                        const customerGreeting = `Olá ${order.customer.name}, referente à sua encomenda *#${order.id}* na DUOTEC:`;
                        const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customerGreeting)}`;
                        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

                        return (
                          <tr
                            key={order.id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => setViewingOrderDetails(order)}
                          >
                            {/* Coluna 1: Código & Data */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-black text-slate-900 bg-slate-100 group-hover:bg-slate-200 px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">
                                  #{order.id}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(order.id);
                                    setCopiedOrderId(order.id);
                                    setTimeout(() => setCopiedOrderId(null), 2000);
                                  }}
                                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                                  title="Copiar código do pedido"
                                >
                                  {copiedOrderId === order.id ? (
                                    <Check className="w-3 h-3 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {new Date(order.createdAt).toLocaleString('pt-AO', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </td>

                            {/* Coluna 2: Cliente */}
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-slate-900 leading-tight">
                                {order.customer.name}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                <Phone className="w-2.5 h-2.5" />
                                <span>{order.customer.phone}</span>
                              </div>
                            </td>

                            {/* Coluna 3: Modalidade */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isDelivery
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}>
                                {isDelivery ? <Truck className="w-2.5 h-2.5" /> : <Store className="w-2.5 h-2.5" />}
                                <span>{isDelivery ? (order.customer.municipality || 'Entrega') : 'Coleta'}</span>
                              </span>
                            </td>

                            {/* Coluna 4: Componentes */}
                            <td className="py-2.5 px-3 max-w-[200px]">
                              <div className="truncate text-slate-700 font-medium text-[11px]" title={order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}>
                                <span className="font-bold text-slate-900">{totalQuantity}x</span>{' '}
                                {order.items.map((i) => i.product.name).join(', ')}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {order.items.length} {order.items.length === 1 ? 'modelo' : 'modelos'}
                              </span>
                            </td>

                            {/* Coluna 5: Valor Total */}
                            <td className="py-2.5 px-3 text-right whitespace-nowrap">
                              <span className="font-black text-xs text-blue-900 block">
                                {formatPrice(order.totalAmount, siteConfig)}
                              </span>
                              <span className="text-[9px] text-slate-400">
                                {order.customer.paymentMethod?.split(' ')[0] || 'MCX'}
                              </span>
                            </td>

                            {/* Coluna 6: Estado (Seletor Direto) */}
                            <td className="py-2.5 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  onUpdateOrderStatus(order.id, e.target.value as OrderRecord['status'])
                                }
                                className={`px-2 py-1 text-[11px] rounded-lg font-bold border focus:outline-hidden cursor-pointer ${
                                  order.status === 'Pendente'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : order.status === 'Confirmado'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : order.status === 'Entregue'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-rose-50 text-rose-800 border-rose-300'
                                }`}
                              >
                                <option value="Pendente">⏳ Pendente</option>
                                <option value="Confirmado">🔵 Confirmado</option>
                                <option value="Entregue">🟢 Entregue</option>
                                <option value="Cancelado">🔴 Cancelado</option>
                              </select>
                            </td>

                            {/* Coluna 7: Ações */}
                            <td className="py-2.5 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-1">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer border border-emerald-200"
                                  title={`Falar com ${order.customer.name} no WhatsApp`}
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleCopyOrderSummary(order)}
                                  className="p-1 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                                  title="Copiar resumo do pedido"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setViewingOrderDetails(order)}
                                  className="p-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer border border-blue-200"
                                  title="Ver todos os detalhes da encomenda"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>A exibir {filteredOrders.length} de {orders.length} pedidos</span>
                  <span>Clique em qualquer linha para abrir os detalhes completos</span>
                </div>
              </div>
            ) : (

              /* VISTA 2: CARDS DETALHADOS */
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isDelivery = order.customer.fulfillmentType === 'entrega';
                  const cleanPhone = order.customer.phone.replace(/\D/g, '');
                  const customerGreeting = `Olá ${order.customer.name}, estamos a processar a sua encomenda *#${order.id}* na DUOTEC!`;
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customerGreeting)}`;

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden hover:border-slate-300 transition-all"
                    >
                      {/* BARRA SUPERIOR DO PEDIDO: CÓDIGO, DATA E ESTADO */}
                      <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          
                          {/* Badge do Código do Pedido */}
                          <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                            <Receipt className="w-3.5 h-3.5 text-blue-400" />
                            <span className="font-mono font-black text-xs tracking-wide">
                              #{order.id}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(order.id);
                                setCopiedOrderId(order.id);
                                setTimeout(() => setCopiedOrderId(null), 2000);
                              }}
                              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
                              title="Copiar código do pedido"
                            >
                              {copiedOrderId === order.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>

                          {/* Data e Hora */}
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {new Date(order.createdAt).toLocaleString('pt-AO', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>

                          {/* Badge de Modalidade (Entrega / Levantamento) */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            isDelivery
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}>
                            {isDelivery ? <Truck className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                            {isDelivery ? 'Entrega ao Domicílio' : 'Levantamento'}
                          </span>
                        </div>

                        {/* Controlo de Estado e WhatsApp */}
                        <div className="flex items-center gap-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                            title={`Conversar com ${order.customer.name} no WhatsApp`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Seletor Dinâmico de Estado */}
                          <select
                            value={order.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(order.id, e.target.value as OrderRecord['status'])
                            }
                            className={`px-2.5 py-1.5 text-xs rounded-lg font-bold border focus:outline-hidden cursor-pointer ${
                              order.status === 'Pendente'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : order.status === 'Confirmado'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : order.status === 'Entregue'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            <option value="Pendente">⏳ Pendente</option>
                            <option value="Confirmado">🔵 Confirmado</option>
                            <option value="Entregue">🟢 Entregue</option>
                            <option value="Cancelado">🔴 Cancelado</option>
                          </select>
                        </div>
                      </div>

                      {/* CORPO DO PEDIDO: DADOS DO CLIENTE & PRODUTOS */}
                      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
                        
                        {/* Bloco 1: Informações do Cliente (5 colunas) */}
                        <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-5">
                          <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                            Dados do Cliente & Logística
                          </span>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                                <UserIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900 text-sm">{order.customer.name}</h5>
                                <a
                                  href={`tel:${order.customer.phone}`}
                                  className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{order.customer.phone}</span>
                                </a>
                              </div>
                            </div>

                            {/* Informações de Localização / Entrega */}
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1 text-slate-700">
                              <span className="font-bold text-slate-900 flex items-center gap-1">
                                {isDelivery ? (
                                  <>
                                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Destino de Entrega:</span>
                                  </>
                                ) : (
                                  <>
                                    <Store className="w-3.5 h-3.5 text-purple-600" />
                                    <span>Ponto de Levantamento:</span>
                                  </>
                                )}
                              </span>

                              {isDelivery ? (
                                <div className="text-[11px] space-y-0.5 text-slate-600 pl-4.5">
                                  {order.customer.municipality && (
                                    <p><strong>Município/Bairro:</strong> {order.customer.municipality}</p>
                                  )}
                                  {order.customer.address && (
                                    <p><strong>Endereço / Referência:</strong> {order.customer.address}</p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-[11px] text-slate-600 pl-4.5">
                                  O cliente irá levantar nas instalações da DUOTEC.
                                </p>
                              )}
                            </div>

                            {/* Pagamento */}
                            <div className="flex items-center justify-between text-[11px] px-2 text-slate-600">
                              <span>Forma de Pagamento:</span>
                              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                                {order.customer.paymentMethod || 'Multicaixa Express (MCX)'}
                              </span>
                            </div>

                            {/* Notas do Cliente */}
                            {order.customer.notes && (
                              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                                <span className="font-bold block mb-0.5">Observação do Cliente:</span>
                                <span>{order.customer.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bloco 2: Itens do Pedido & Valores (7 colunas) */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400">
                                Componentes Encomendados ({order.items.reduce((s, i) => s + i.quantity, 0)} itens)
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyOrderSummary(order)}
                                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copiedOrderId === order.id ? 'Resumo Copiado!' : 'Copiar Resumo'}</span>
                              </button>
                            </div>

                            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                              {order.items.map((item, idx) => {
                                const itemTotal = item.product.price * item.quantity;
                                return (
                                  <div
                                    key={idx}
                                    className="p-2.5 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 text-xs"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="w-6 h-6 rounded bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                                        {item.quantity}x
                                      </span>
                                      <div className="min-w-0 truncate">
                                        <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                                        <span className="text-[10px] text-slate-400">
                                          {formatPrice(item.product.price, siteConfig)} cada
                                        </span>
                                      </div>
                                    </div>
                                    <span className="font-bold text-slate-900 shrink-0 text-right">
                                      {formatPrice(itemTotal, siteConfig)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Resumo Financeiro Final */}
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-600">
                              <span>Subtotal de Componentes:</span>
                              <span className="font-semibold text-slate-800">
                                {formatPrice(
                                  order.items.reduce((s, i) => s + i.product.price * i.quantity, 0),
                                  siteConfig
                                )}
                              </span>
                            </div>

                            {isDelivery && (
                              <div className="flex items-center justify-between text-[11px] text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Truck className="w-3 h-3 text-blue-600" />
                                  Taxa de Entrega:
                                </span>
                                <span className="font-semibold text-slate-800">
                                  {formatPrice(siteConfig.deliveryFeeStandard, siteConfig)}
                                </span>
                              </div>
                            )}

                            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                              <span className="font-black text-xs text-slate-900 uppercase">
                                Valor Total do Pedido
                              </span>
                              <span className="text-base font-black text-blue-900">
                                {formatPrice(order.totalAmount, siteConfig)}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* MODAL DE DETALHES COMPLETOS DO PEDIDO */}
            {viewingOrderDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 animate-in fade-in">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-4 max-h-[90vh] flex flex-col animate-in zoom-in-95">
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-blue-400" />
                      <div>
                        <h4 className="font-bold text-sm text-white">
                          Detalhes da Encomenda #{viewingOrderDetails.id}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {new Date(viewingOrderDetails.createdAt).toLocaleString('pt-AO')}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingOrderDetails(null)}
                      className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-5 overflow-y-auto space-y-4 text-xs">
                    {/* Estado e WhatsApp */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Estado da Encomenda</span>
                        <select
                          value={viewingOrderDetails.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as OrderRecord['status'];
                            onUpdateOrderStatus(viewingOrderDetails.id, newStatus);
                            setViewingOrderDetails({ ...viewingOrderDetails, status: newStatus });
                          }}
                          className={`mt-1 px-2.5 py-1 text-xs rounded-lg font-bold border ${
                            viewingOrderDetails.status === 'Pendente'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : viewingOrderDetails.status === 'Confirmado'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : viewingOrderDetails.status === 'Entregue'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="Pendente">⏳ Pendente</option>
                          <option value="Confirmado">🔵 Confirmado</option>
                          <option value="Entregue">🟢 Entregue</option>
                          <option value="Cancelado">🔴 Cancelado</option>
                        </select>
                      </div>

                      <a
                        href={`https://wa.me/${viewingOrderDetails.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Olá ${viewingOrderDetails.customer.name}, referente ao seu pedido #${viewingOrderDetails.id} na DUOTEC:`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Abrir WhatsApp</span>
                      </a>
                    </div>

                    {/* Dados do Cliente */}
                    <div className="space-y-2 p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-900 block text-xs">Dados do Cliente</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div>
                          <span className="text-slate-400 block">Nome:</span>
                          <span className="font-bold text-slate-900">{viewingOrderDetails.customer.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Telefone:</span>
                          <span className="font-bold text-slate-900">{viewingOrderDetails.customer.phone}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Modalidade:</span>
                          <span className="font-bold text-slate-900">
                            {viewingOrderDetails.customer.fulfillmentType === 'entrega'
                              ? `🛵 Entrega ao Domicílio (${viewingOrderDetails.customer.municipality || 'Luanda'})`
                              : '🏬 Levantamento nas Instalações da DUOTEC'}
                          </span>
                        </div>
                        {viewingOrderDetails.customer.address && (
                          <div className="col-span-2">
                            <span className="text-slate-400 block">Endereço / Referência:</span>
                            <span className="font-bold text-slate-900">{viewingOrderDetails.customer.address}</span>
                          </div>
                        )}
                        {viewingOrderDetails.customer.notes && (
                          <div className="col-span-2 p-2 rounded bg-amber-50 border border-amber-200 text-amber-900">
                            <span className="font-bold block">Observações:</span>
                            <span>{viewingOrderDetails.customer.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Componentes */}
                    <div className="space-y-2 p-3 rounded-xl border border-slate-200 bg-white">
                      <span className="font-bold text-slate-900 block text-xs">Componentes Encomendados</span>
                      <div className="divide-y divide-slate-100">
                        {viewingOrderDetails.items.map((item, idx) => (
                          <div key={idx} className="py-1.5 flex justify-between items-center text-[11px]">
                            <span>
                              <strong>{item.quantity}x</strong> {item.product.name}
                            </span>
                            <span className="font-bold text-slate-900">
                              {formatPrice(item.product.price * item.quantity, siteConfig)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-blue-950">
                        <span>Total da Encomenda:</span>
                        <span>{formatPrice(viewingOrderDetails.totalAmount, siteConfig)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCopyOrderSummary(viewingOrderDetails)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedOrderId === viewingOrderDetails.id ? 'Copiado!' : 'Copiar Resumo'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewingOrderDetails(null)}
                      className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: FAMÍLIAS DE PRODUTOS */}
        {activeTab === 'familias' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Famílias de Produtos</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{activeCategoriesCount} famílias ativas no catálogo</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onResetCategories && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Restaurar famílias para o padrão DUOTEC? As famílias personalizadas serão removidas.')) {
                        onResetCategories();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restaurar Padrão
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  Nova Família
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Ícone</th>
                    <th className="py-2.5 px-3">Nome da Família</th>
                    <th className="py-2.5 px-3">ID / Slug</th>
                    <th className="py-2.5 px-3 text-right">Componentes</th>
                    <th className="py-2.5 px-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.filter((c) => c.id !== 'todos').map((cat) => {
                    const catProductCount = products.filter((p) => p.category === cat.id).length;
                    return (
                      <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3">
                          <span className="text-xl">{cat.icon || '📦'}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">{cat.name}</div>
                          {cat.description && (
                            <div className="text-[10px] text-slate-400 truncate max-w-[200px] mt-0.5">{cat.description}</div>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">{cat.id}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`font-bold text-xs ${
                            catProductCount > 0 ? 'text-blue-700' : 'text-slate-400'
                          }`}>
                            {catProductCount} produto(s)
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {onDeleteCategory && (
                            <button
                              type="button"
                              onClick={() => {
                                if (catProductCount > 0) {
                                  alert(`Esta família tem ${catProductCount} produto(s) associado(s). Remova ou reatribua-os antes de eliminar a família.`);
                                  return;
                                }
                                if (window.confirm(`Eliminar a família "${cat.name}"?`)) {
                                  onDeleteCategory(cat.id);
                                }
                              }}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                catProductCount > 0
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              title={catProductCount > 0 ? 'Família tem produtos — não pode ser eliminada' : 'Eliminar família'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {activeCategoriesCount === 0 && (
              <div className="py-8 text-center text-slate-400">
                <FolderTree className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-semibold">Nenhuma família criada ainda.</p>
                <p className="text-[11px] mt-0.5">Clique em "Nova Família" para começar.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: ALERTAS DE REPOSIÇÃO */}
        {activeTab === 'alertas' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-900">Alertas de Reposição de Stock</h3>
              </div>
              <span className="text-xs text-slate-500">
                {outOfStockCount} componente(s) esgotado(s)
              </span>
            </div>

            {outOfStockCount === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-emerald-700">Todos os componentes estão em stock!</p>
                <p className="text-[11px] text-slate-400">
                  Não há componentes esgotados neste momento. O armazém está 100% abastecido.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-amber-200 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50 text-amber-800 text-[10px] uppercase font-bold border-b border-amber-200">
                      <th className="py-2.5 px-3">Componente Esgotado</th>
                      <th className="py-2.5 px-3">Família / Categoria</th>
                      <th className="py-2.5 px-3 text-right">Preço (Kz)</th>
                      <th className="py-2.5 px-3 text-center">Repor Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {products.filter((p) => !p.inStock).map((product) => {
                      const productImgUrl = resolveComponentImage(product.name, product.category, product.image);
                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-amber-50/60 transition-colors cursor-pointer"
                          onClick={(e) => {
                            const target = e.target as HTMLElement;
                            if (target.closest('button') || target.closest('select')) return;
                            handleOpenEditProduct(product);
                          }}
                          title="Clique para editar"
                        >
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                                <img
                                  src={productImgUrl}
                                  alt={product.name}
                                  className="max-h-full max-w-full object-contain grayscale opacity-60"
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-xs">{product.name}</div>
                                <div className="text-[10px] text-slate-400">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold text-[10px] border border-amber-200">
                              {product.categoryName}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-700">
                            {formatPrice(product.price, siteConfig)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleStockSelectChange(product, 'em_stock'); }}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer transition-colors shadow-xs"
                            >
                              ✓ Marcar Em Stock
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONFIGURAÇÕES E DADOS DA LOJA (Moeda, Logótipo, WhatsApp, Logística) */}
        {activeTab === 'config' && (
          <SiteSettingsPanel
            config={siteConfig}
            onSaveConfig={onUpdateSiteConfig}
            onResetDefault={onResetSiteConfig}
          />
        )}

      </main>

      {/* Modal para Editar Componente Existente */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" />
                Editar Componente
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Componente</label>
                <input
                  type="text"
                  required
                  value={editProductName}
                  onChange={(e) => setEditProductName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Marca / Fabricante</label>
                  <input
                    type="text"
                    value={editProductBrand}
                    onChange={(e) => setEditProductBrand(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preço ({siteConfig.currencySymbol})</label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={editProductPrice}
                    onChange={(e) => setEditProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Disponibilidade</label>
                <select
                  value={editProductInStock ? 'em_stock' : 'esgotado'}
                  onChange={(e) => setEditProductInStock(e.target.value === 'em_stock')}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="em_stock">🟢 Em stock</option>
                  <option value="esgotado">🔴 Esgotado</option>
                </select>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  Imagem do Componente
                </label>
                {editImagePreview && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 mb-2">
                    <img
                      src={editImagePreview}
                      alt="Pré-visualização"
                      className="w-12 h-12 object-contain rounded border border-slate-100 bg-slate-50 p-1"
                      onError={() => setEditImagePreview(null)}
                    />
                    <button
                      type="button"
                      onClick={() => { setEditImagePreview(null); setEditProductImage(''); }}
                      className="text-[10px] text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                    >
                      Remover imagem
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg bg-white hover:bg-blue-50/50 cursor-pointer transition-colors text-slate-600 hover:text-blue-600">
                  <Upload className="w-4 h-4" />
                  <span className="text-xs font-semibold">Carregar nova foto</span>
                  <input type="file" accept="image/*" onChange={handleEditImageUpload} className="hidden" />
                </label>
                <input
                  type="url"
                  placeholder="Ou colar link da imagem (URL https://...)"
                  value={editProductImage.startsWith('data:') ? '' : editProductImage}
                  onChange={(e) => {
                    setEditProductImage(e.target.value);
                    setEditImagePreview(e.target.value.trim() || null);
                  }}
                  className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição Curta</label>
                <input
                  type="text"
                  value={editProductDesc}
                  onChange={(e) => setEditProductDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Especificações Técnicas (separadas por vírgula)</label>
                <input
                  type="text"
                  value={editProductSpecs}
                  onChange={(e) => setEditProductSpecs(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  Guardar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Novo Componente */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Registar Novo Componente</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Componente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Regulador de Tensão LM7805"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoria</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as ProductCategory)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {CATEGORIES_LIST.filter((c) => c.id !== 'todos').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Marca / Fabricante</label>
                  <input
                    type="text"
                    placeholder="Ex: Texas Instruments, Arduino, etc."
                    value={newProductBrand}
                    onChange={(e) => setNewProductBrand(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Preço ({siteConfig.currencySymbol})
                  </label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Disponibilidade</label>
                  <select
                    value={newProductInStock ? 'em_stock' : 'esgotado'}
                    onChange={(e) => setNewProductInStock(e.target.value === 'em_stock')}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="em_stock">🟢 Em stock</option>
                    <option value="esgotado">🔴 Esgotado</option>
                  </select>
                </div>
              </div>

              {/* CAMPO PARA ADICIONAR IMAGEM */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="font-bold text-slate-800 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    Imagem do Componente
                  </span>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setNewProductImage('');
                      }}
                      className="text-[10px] text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                    >
                      Remover imagem
                    </button>
                  )}
                </label>

                {/* Pré-visualização caso exista */}
                {imagePreview ? (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200">
                    <img
                      src={imagePreview}
                      alt="Pré-visualização"
                      className="w-14 h-14 object-contain rounded-md border border-slate-100 bg-slate-50 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-emerald-700 block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Imagem carregada com sucesso
                      </span>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {newProductImage.startsWith('data:') ? 'Ficheiro local' : newProductImage}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Botão de Upload de Ficheiro do Computador/Telemóvel */}
                    <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg bg-white hover:bg-blue-50/50 cursor-pointer transition-colors text-slate-600 hover:text-blue-600">
                      <Upload className="w-4 h-4" />
                      <span className="text-xs font-semibold">Carregar foto do dispositivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Ou Inserir URL Web */}
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Ou colar link da imagem (URL https://...)"
                        value={newProductImage}
                        onChange={(e) => {
                          setNewProductImage(e.target.value);
                          setImagePreview(e.target.value.trim() || null);
                        }}
                        className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-white"
                      />
                    </div>

                    {/* Presets Rápidos de Eletrónica */}
                    <div className="pt-1">
                      <span className="text-[10px] text-slate-400 block mb-1 font-semibold">
                        Ou escolha um modelo rápido:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          { label: 'Arduino', url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=300&q=80' },
                          { label: 'Circuito CI', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80' },
                          { label: 'Sensor', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80' },
                          { label: 'Display LCD', url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=300&q=80' },
                          { label: 'Relé / Potência', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80' }
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setNewProductImage(preset.url);
                              setImagePreview(preset.url);
                            }}
                            className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium cursor-pointer"
                          >
                            + {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição Curta</label>
                <input
                  type="text"
                  placeholder="Ex: Saída fixa de 5V, corrente até 1.5A."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Especificações Técnicas (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: Entrada 7V-35V, Saída 5V, TO-220"
                  value={newProductSpecs}
                  onChange={(e) => setNewProductSpecs(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  Adicionar ao Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Nova Família */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-blue-600" />
                Nova Família de Produtos
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div className="grid grid-cols-[2.5rem_1fr] gap-2 items-start">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ícone</label>
                  <input
                    type="text"
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value)}
                    maxLength={2}
                    className="w-full px-2 py-1.5 text-center text-lg rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    placeholder="⚡"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nome da Família <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sensores, Baterias, Motores..."
                    value={newCatName}
                    onChange={(e) => handleCatNameChange(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>ID / Slug (identificador único)</span>
                  <button
                    type="button"
                    onClick={() => setIsAutoSlug(!isAutoSlug)}
                    className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer font-semibold ${
                      isAutoSlug ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isAutoSlug ? '🔗 Auto' : '✏️ Manual'}
                  </button>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: sensores-digitais"
                  value={newCatId}
                  onChange={(e) => {
                    setIsAutoSlug(false);
                    setNewCatId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Apenas letras minúsculas, números e hífens</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Componentes de deteção e medição"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  Criar Família
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
