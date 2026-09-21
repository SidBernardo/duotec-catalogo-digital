import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, CartItem, SiteConfig, CategoryItem } from '../types';
import { CATEGORIES_LIST } from '../data/company';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/formatters';
import { resolveComponentImage } from '../data/componentImages';
import {
  SlidersHorizontal,
  PackageX,
  CheckCircle2,
  LayoutGrid,
  List,
  Plus,
  Minus,
  Check,
  AlertCircle
} from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProductDetails: (product: Product) => void;
  cart: CartItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'name') => void;
  siteConfig?: SiteConfig;
  categories?: CategoryItem[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onViewProductDetails,
  cart,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  siteConfig,
  categories = CATEGORIES_LIST,
}) => {
  // Modo de visualização: 'grid' (grelha de cartões compactos) ou 'table' (tabela menor)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [tableQuantities, setTableQuantities] = useState<Record<string, number>>({});
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  // Mapa de quantidades no carrinho
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((item) => {
      map.set(item.product.id, item.quantity);
    });
    return map;
  }, [cart]);

  // Filtragem e ordenação dos produtos
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'todos' || p.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        (p.specs && p.specs.some((spec) => spec.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const getRowQty = (productId: string) => tableQuantities[productId] || 1;

  const handleSetRowQty = (productId: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTableQuantities((prev) => {
      const current = prev[productId] || 1;
      return { ...prev, [productId]: Math.max(1, current + delta) };
    });
  };

  const handleTableAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = getRowQty(product.id);
    onAddToCart(product, qty);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="catalogo" className="py-4 sm:py-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Aviso no Topo do Catálogo */}
        <div className="mb-3 px-3 py-2 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">
              Catálogo de Componentes Electrónicos
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 text-[11px] sm:text-xs">
              Preços em Kwanzas (Kz)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Escolha as quantidades e envie o pedido pelo WhatsApp</span>
          </div>
        </div>

        {/* Filtros de Categorias */}
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'todos'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`cat-filtro-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id as ProductCategory)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Barra de Controlo: Contagem, Alternador de Vista e Ordenação */}
          <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
            <div className="text-[11px] sm:text-xs">
              {searchQuery ? (
                <span>
                  Resultados para &quot;<strong className="text-slate-700">{searchQuery}</strong>&quot; ({filteredProducts.length})
                </span>
              ) : (
                <span>{filteredProducts.length} componentes disponíveis</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Alternador de Modo de Exibição */}
              <div className="flex items-center bg-white border border-slate-200 rounded-md p-0.5 shadow-2xs">
                <button
                  type="button"
                  id="modo-vista-grelha"
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vista em Grelha Compacta"
                  aria-label="Grelha"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  id="modo-vista-tabela"
                  onClick={() => setViewMode('table')}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vista em Tabela Menor"
                  aria-label="Tabela"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Seletor de Ordenação */}
              <div className="flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                <select
                  id="select-ordenacao"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-md px-2 py-1 text-[11px] sm:text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Alfabética (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Estado Vazio */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-xl border border-slate-200 p-6 space-y-2.5 max-w-sm mx-auto my-6">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <PackageX className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Nenhum componente encontrado
            </h3>
            <p className="text-[11px] text-slate-500">
              Tente pesquisar por outro nome ou selecione todas as categorias.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('todos');
              }}
              className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
            >
              Ver Todos os Componentes
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grelha Compacta de Produtos (4 ou 5 colunas no desktop, 2 no telemóvel) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewProductDetails}
                currentQuantityInCart={cartQuantityMap.get(product.id) || 0}
                siteConfig={siteConfig}
              />
            ))}
          </div>
        ) : (
          /* Tabela Menor e Compacta com Selector de Quantidades */
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold border-b border-slate-200 tracking-wider">
                    <th className="py-2 px-2.5 w-14 text-center">Foto</th>
                    <th className="py-2 px-3">Componente</th>
                    <th className="py-2 px-2.5 hidden sm:table-cell">Categoria</th>
                    <th className="py-2 px-2.5 hidden md:table-cell">Especificação</th>
                    <th className="py-2 px-3 text-right">Preço Unitário</th>
                    <th className="py-2 px-2.5 text-center w-32">Quantidade & Compra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => {
                    const quantityInCart = cartQuantityMap.get(product.id) || 0;
                    const rowQty = getRowQty(product.id);
                    const isJustAdded = addedItemMap[product.id];
                    const isAvailable = product.inStock !== false && (product.stockQuantity === undefined || product.stockQuantity > 0);
                    const resolvedImg = resolveComponentImage(product.name, product.category, product.image);

                    return (
                      <tr
                        key={product.id}
                        onClick={() => onViewProductDetails(product)}
                        className={`hover:bg-blue-50/50 transition-colors cursor-pointer group ${!isAvailable ? 'opacity-75' : ''}`}
                      >
                        {/* Imagem Real */}
                        <td className="py-1.5 px-2.5 text-center">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded border border-slate-200 bg-slate-50 p-1 flex items-center justify-center mx-auto overflow-hidden">
                            <img
                              src={resolvedImg}
                              alt={product.name}
                              loading="lazy"
                              className={`max-h-full max-w-full object-contain ${!isAvailable ? 'grayscale opacity-60' : ''}`}
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                        </td>

                        {/* Nome & Descrição */}
                        <td className="py-1.5 px-3">
                          <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-xs flex items-center gap-1.5">
                            <span>{product.name}</span>
                            {!isAvailable && (
                              <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded">
                                Esgotado
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 line-clamp-1">
                            {product.shortDescription}
                          </div>
                        </td>

                        {/* Categoria */}
                        <td className="py-1.5 px-2.5 hidden sm:table-cell">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {product.categoryName}
                          </span>
                        </td>

                        {/* Especificação */}
                        <td className="py-1.5 px-2.5 hidden md:table-cell text-slate-600 text-[11px]">
                          {product.specs && product.specs[0] ? (
                            <span className="truncate max-w-[200px] block">
                              {product.specs[0]}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>

                        {/* Preço formatado com Moeda configurada */}
                        <td className="py-1.5 px-3 text-right font-black text-blue-950 text-xs sm:text-[13px] whitespace-nowrap">
                          {formatPrice(product.price, siteConfig)}
                        </td>

                        {/* Selector de Quantidades e Botão Adicionar na Tabela */}
                        <td className="py-1.5 px-2.5 text-center" onClick={(e) => e.stopPropagation()}>
                          {!isAvailable ? (
                            <span className="text-[11px] font-bold text-rose-600 px-2 py-1 rounded bg-rose-50 border border-rose-100 block text-center">
                              Esgotado
                            </span>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Stepper de Quantidades */}
                              <div className="flex items-center bg-slate-100 border border-slate-200 rounded p-0.5">
                                <button
                                  type="button"
                                  onClick={(e) => handleSetRowQty(product.id, -1, e)}
                                  className="w-4 h-4 rounded hover:bg-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                                  title="Diminuir"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="w-5 text-center font-bold text-slate-800 text-[11px]">
                                  {rowQty}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleSetRowQty(product.id, 1, e)}
                                  className="w-4 h-4 rounded hover:bg-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                                  title="Aumentar"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              {/* Botão de Adição */}
                              <button
                                type="button"
                                onClick={(e) => handleTableAdd(product, e)}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                                  isJustAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                                }`}
                                title={`Adicionar ${rowQty} ao carrinho`}
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span className="text-[10px]">Pronto</span>
                                  </>
                                ) : (
                                  <span>Adicionar</span>
                                )}
                              </button>

                              {quantityInCart > 0 && (
                                <span
                                  className="text-[9px] font-black bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full shrink-0"
                                  title={`${quantityInCart} já no carrinho`}
                                >
                                  +{quantityInCart}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
