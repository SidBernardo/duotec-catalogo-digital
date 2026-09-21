import React, { useState } from 'react';
import { Product, SiteConfig } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, ShoppingCart, ShieldCheck, Check, Truck, Layers, AlertCircle } from 'lucide-react';
import { resolveComponentImage } from '../data/componentImages';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  currentQuantityInCart: number;
  siteConfig?: SiteConfig;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currentQuantityInCart,
  siteConfig,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const isAvailable = product.inStock !== false && (product.stockQuantity === undefined || product.stockQuantity > 0);
  const resolvedImg = resolveComponentImage(product.name, product.category, product.image);

  const handleAdd = () => {
    if (!isAvailable) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="product-detail-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col my-6 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/95 text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200 transition-colors cursor-pointer shadow-xs"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div className="w-full sm:w-1/2 aspect-square max-h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200 flex-shrink-0 flex items-center justify-center p-4">
              {!imgError ? (
                <img
                  src={resolvedImg}
                  alt={product.name}
                  className={`max-w-full max-h-full object-contain ${!isAvailable ? 'opacity-60 grayscale' : ''}`}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">{product.categoryName}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-500">{product.categoryName}</span>

                  {isAvailable ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      Em Stock ({product.stockQuantity ?? 15} un)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Esgotado
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h2>

                <div className="mt-3">
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through block">
                      {formatPrice(product.originalPrice, siteConfig)}
                    </span>
                  )}
                  <span className="text-2xl font-black text-blue-900 tracking-tight">
                    {formatPrice(product.price, siteConfig)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Componente novo e verificado com garantia DUOTEC</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Disponível para entrega imediata em Luanda ou envio provincial</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Descrição do Componente
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.detailedDescription || product.shortDescription}
            </p>
          </div>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                Especificações Técnicas & Pinagem
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-semibold text-slate-600">Quantidade:</span>
            <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={!isAvailable}
                className="px-3 py-2 text-slate-700 hover:bg-slate-100 font-bold transition-colors cursor-pointer disabled:opacity-40"
                aria-label="Diminuir quantidade"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-bold text-slate-900 min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                disabled={!isAvailable}
                className="px-3 py-2 text-slate-700 hover:bg-slate-100 font-bold transition-colors cursor-pointer disabled:opacity-40"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            {currentQuantityInCart > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                ({currentQuantityInCart} no carrinho)
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              disabled={!isAvailable || isAdded}
              className={`w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
                !isAvailable
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : isAdded
                  ? 'bg-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {!isAvailable ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Artigo Esgotado de Momento</span>
                </>
              ) : isAdded ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Adicionado ao Carrinho!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar ao Carrinho ({formatPrice(product.price * quantity, siteConfig)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
