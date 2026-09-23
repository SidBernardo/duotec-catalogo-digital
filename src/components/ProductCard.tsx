import React, { useState } from 'react';
import { Product, SiteConfig } from '../types';
import { formatPrice } from '../utils/formatters';
import { Check, Info, Plus, Minus, Cpu, AlertCircle } from 'lucide-react';
import { resolveComponentImage } from '../data/componentImages';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  currentQuantityInCart?: number;
  siteConfig?: SiteConfig;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  currentQuantityInCart = 0,
  siteConfig,
}) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isAvailable = product.inStock !== false && (product.stockQuantity === undefined || product.stockQuantity > 0);
  const resolvedImg = resolveComponentImage(product.name, product.category, product.image);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAvailable) return;
    onAddToCart(product, selectedQty);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAvailable) return;
    if (currentQuantityInCart > 0) {
      onAddToCart(product, 1);
    } else {
      setSelectedQty((prev) => prev + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuantityInCart > 0) {
      onAddToCart(product, -1);
    } else {
      setSelectedQty((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div
      id={`cartao-produto-${product.id}`}
      onClick={() => onViewDetails(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-sm transition-all duration-200 overflow-hidden cursor-pointer h-full"
    >
      {/* Imagem do Componente Real com Tratamento Responsivo e Fallback Seguro */}
      <div className="relative w-full aspect-square sm:aspect-4/3 max-h-40 bg-gradient-to-b from-slate-50 to-slate-100/80 p-2 sm:p-3 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {!imgError ? (
          <img
            src={resolvedImg}
            alt={product.name}
            loading="lazy"
            className={`max-h-full max-w-full object-contain object-center transition-transform duration-200 ${
              !isAvailable ? 'opacity-50 grayscale' : 'group-hover:scale-105'
            }`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
            <Cpu className="w-8 h-8 text-slate-300 stroke-[1.5] mb-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">{product.categoryName || 'Componente'}</span>
          </div>
        )}

        {/* Indicador de Estado de Stock */}
        {!isAvailable ? (
          <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 uppercase tracking-wider">
            <AlertCircle className="w-2.5 h-2.5" />
            Esgotado
          </span>
        ) : (
          <span className="absolute top-1.5 left-1.5 bg-emerald-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
            Em stock
          </span>
        )}

        {/* Indicador de Quantidade no Carrinho */}
        {currentQuantityInCart > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>{currentQuantityInCart} no carrinho</span>
          </span>
        )}
      </div>

      {/* Conteúdo do Produto */}
      <div className="flex flex-col flex-1 p-2 sm:p-2.5 justify-between gap-1.5">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-0.5">
            <span className="text-blue-600 font-bold truncate max-w-[120px] uppercase text-[9px]">
              {product.categoryName}
            </span>
            <span className="text-slate-400 text-[9px]">{product.brand}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[2rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {product.specs && product.specs.length > 0 && (
            <p className="text-[10px] text-slate-500 truncate mt-0.5 font-normal">
              {product.specs[0]}
            </p>
          )}
        </div>

        {/* Preço e Controlo de Quantidade */}
        <div className="pt-1.5 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-black text-blue-950 tracking-tight leading-tight">
              {formatPrice(product.price, siteConfig)}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Ver detalhes técnicos"
              aria-label="Ver detalhes"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Selector de Quantidades ou Estado Esgotado */}
          {!isAvailable ? (
            <div className="py-1.5 px-2 rounded-md bg-slate-100 text-slate-400 text-[11px] font-bold text-center border border-slate-200 select-none">
              Indisponível de momento
            </div>
          ) : currentQuantityInCart > 0 ? (
            /* Já está no carrinho: permite aumentar/diminuir imediatamente */
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-0.5 text-xs w-full"
            >
              <button
                type="button"
                onClick={handleDecrement}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white hover:bg-blue-100 text-blue-700 font-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Diminuir quantidade"
                aria-label="Diminuir"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>

              <span className="font-black text-blue-900 text-[10px] sm:text-[11px] px-1 truncate text-center">
                {currentQuantityInCart} un
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Aumentar quantidade"
                aria-label="Aumentar"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* Ainda não está no carrinho: selector de quantidade + botão Adicionar */
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 w-full"
            >
              {/* Controlo de Quantidade a Comprar */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-md p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded hover:bg-white text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  title="Menos"
                  aria-label="Menos"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="w-4 sm:w-5 text-center font-bold text-slate-800 text-[10px] sm:text-[11px]">
                  {selectedQty}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded hover:bg-white text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  title="Mais"
                  aria-label="Mais"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Botão Adicionar */}
              <button
                type="button"
                id={`btn-adicionar-${product.id}`}
                onClick={handleAddClick}
                className={`flex-1 min-w-0 py-1 px-1 sm:px-2 rounded-md text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer shadow-2xs truncate ${
                  isJustAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
                title="Adicionar ao carrinho"
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-3 h-3 stroke-[3] shrink-0" />
                    <span className="text-[10px]">Pronto</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 sm:hidden shrink-0" />
                    <span className="truncate">Adicionar</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
