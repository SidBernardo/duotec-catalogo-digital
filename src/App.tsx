import React, { useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  CustomerDetails,
  OrderRecord,
  UserRole,
  SiteConfig,
  CategoryItem,
} from './types';
import { PRODUCTS } from './data/products';
import { COMPANY_INFO, DEFAULT_SITE_CONFIG, CATEGORIES_LIST, DEFAULT_CATEGORIES_LIST } from './data/company';
import { Navbar } from './components/Navbar';
import { CatalogSection } from './components/CatalogSection';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { WelcomeRoleModal } from './components/WelcomeRoleModal';
import { ManagerLoginModal } from './components/ManagerLoginModal';
import { ManagerDashboard } from './components/ManagerDashboard';
import { MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';
import { formatKzCompact } from './utils/formatters';
import { resolveComponentImage } from './data/componentImages';
import {
  fetchProductsFromDb,
  upsertProductInDb,
  deleteProductFromDb,
  batchInsertProducts,
  fetchCategoriesFromDb,
  upsertCategoryInDb,
  deleteCategoryFromDb,
  batchInsertCategories,
  fetchOrdersFromDb,
  insertOrderInDb,
  updateOrderStatusInDb,
  fetchSiteConfigFromDb,
  upsertSiteConfigInDb,
} from './lib/supabase';

const CART_STORAGE_KEY = 'duotec_cart_v2';
const CUSTOMER_STORAGE_KEY = 'duotec_customer_v2';
const PRODUCTS_STORAGE_KEY = 'duotec_products_v4';
const ORDERS_STORAGE_KEY = 'duotec_orders_v2';
const ROLE_CHOSEN_KEY = 'duotec_role_chosen_v2';
const SITE_CONFIG_STORAGE_KEY = 'duotec_site_config_v2';
const CATEGORIES_STORAGE_KEY = 'duotec_categories_v2';

export default function App() {
  // Estado do Papel / Modo do Utilizador: 'cliente' ou 'gestor'
  const [currentRole, setCurrentRole] = useState<UserRole>('cliente');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(() => {
    return !localStorage.getItem(ROLE_CHOSEN_KEY);
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(false);

  // Configurações do Site (Moeda, Logótipo, WhatsApp, Logística)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
      return saved ? { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) } : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  // Estado dos Produtos (permite ao Gestor alterar preços e stock)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          image: resolveComponentImage(p.name, p.category, p.image),
        }));
      }
      return PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Estado das Famílias/Categorias de Produtos (permite ao Gestor adicionar novas categorias)
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : CATEGORIES_LIST;
    } catch {
      return CATEGORIES_LIST;
    }
  });

  // Histórico de Encomendas Recebidas
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Carrinho de Compras
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dados Pessoais do Cliente para a Encomenda
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            fulfillmentType: 'coleta',
            address: '',
            municipality: 'Luanda',
            paymentMethod: 'Multicaixa Express (MCX)',
            notes: '',
          };
    } catch {
      return {
        name: '',
        phone: '',
        fulfillmentType: 'coleta',
        address: '',
        municipality: 'Luanda',
        paymentMethod: 'Multicaixa Express (MCX)',
        notes: '',
      };
    }
  });

  // Estados de Interface
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sincronização inicial com o Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadDataFromSupabase() {
      try {
        // 1. Produtos
        const dbProducts = await fetchProductsFromDb();
        if (isMounted) {
          if (dbProducts && dbProducts.length > 0) {
            setProducts(dbProducts);
          } else {
            // Se a base de dados estiver vazia, sincroniza o catálogo completo para o Supabase
            console.log('Sincronizando catálogo inicial com a base de dados...');
            await batchInsertProducts(PRODUCTS);
          }
        }

        // 2. Categorias
        const dbCategories = await fetchCategoriesFromDb();
        if (isMounted) {
          if (dbCategories && dbCategories.length > 0) {
            setCategories(dbCategories);
          } else {
            await batchInsertCategories(CATEGORIES_LIST);
          }
        }

        // 3. Encomendas
        const dbOrders = await fetchOrdersFromDb();
        if (isMounted && dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders);
        }

        // 4. Configurações do Site
        const dbConfig = await fetchSiteConfigFromDb();
        if (isMounted && dbConfig) {
          setSiteConfig((prev) => ({ ...prev, ...dbConfig }));
        }
      } catch (err) {
        console.warn('Erro ao carregar dados do Supabase:', err);
      }
    }

    loadDataFromSupabase();

    return () => {
      isMounted = false;
    };
  }, []);

  // Guardar dados no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Erro ao guardar carrinho:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.warn('Erro ao guardar dados do cliente:', e);
    }
  }, [customerDetails]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Erro ao guardar produtos:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.warn('Erro ao guardar categorias:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Erro ao guardar pedidos:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(siteConfig));
    } catch (e) {
      console.warn('Erro ao guardar configurações do site:', e);
    }
  }, [siteConfig]);

  // Visibilidade do botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers de Seleção de Papel / Modo
  const handleSelectRole = (role: UserRole) => {
    localStorage.setItem(ROLE_CHOSEN_KEY, 'true');
    setIsWelcomeModalOpen(false);

    if (role === 'cliente') {
      setIsManagerLoggedIn(false); // Sempre desfaz autenticação ao passar para modo cliente
      setCurrentRole('cliente');
      setToastMessage('Acedeu como Cliente. Boas compras!');
      setTimeout(() => setToastMessage(null), 2500);
    } else {
      // Gestor SEMPRE requer a senha do gestor ao aceder
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsManagerLoggedIn(true);
    setIsLoginModalOpen(false);
    setCurrentRole('gestor');
    setToastMessage('Sessão iniciada como Gestor DUOTEC');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogoutManager = () => {
    setIsManagerLoggedIn(false);
    setCurrentRole('cliente');
    setToastMessage('Sessão de gestor terminada.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveInitialCredentials = (username: string, password: string) => {
    setSiteConfig((prev) => {
      const updated = {
        ...prev,
        managerUsername: username,
        managerPassword: password,
      };
      try {
        localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Erro ao guardar credenciais:', e);
      }
      upsertSiteConfigInDb(updated).catch((err) => console.error('Erro ao guardar credenciais no Supabase:', err));
      return updated;
    });
    setToastMessage('Credenciais de gestor configuradas com sucesso!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers do Carrinho de Compras
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        const currentQty = prevCart[existingItemIndex].quantity;
        const targetQty = currentQty + quantity;

        if (targetQty <= 0) {
          return prevCart.filter((item) => item.product.id !== product.id);
        }

        const updated = [...prevCart];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: targetQty,
        };
        return updated;
      } else {
        if (quantity <= 0) return prevCart;
        return [...prevCart, { product, quantity }];
      }
    });

    if (quantity > 0) {
      setToastMessage(`Adicionado: ${quantity}x ${product.name}`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const handleSaveOrder = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    insertOrderInDb(newOrder).catch((err) => console.error('Erro ao guardar encomenda na base de dados:', err));
  };

  // Handlers do Gestor (Produtos e Pedidos)
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    upsertProductInDb(updated).catch((err) => console.error('Erro ao atualizar produto na base de dados:', err));
    setToastMessage(`Produto atualizado: ${updated.name}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    upsertProductInDb(newProduct).catch((err) => console.error('Erro ao adicionar produto na base de dados:', err));
    setToastMessage(`Novo componente adicionado: ${newProduct.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    deleteProductFromDb(productId).catch((err) => console.error('Erro ao remover produto da base de dados:', err));
    setToastMessage('Componente removido do catálogo');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    updateOrderStatusInDb(orderId, status).catch((err) => console.error('Erro ao atualizar estado da encomenda na base de dados:', err));
  };

  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    upsertSiteConfigInDb(newConfig).catch((err) => console.error('Erro ao guardar configurações na base de dados:', err));
    setToastMessage('Configurações da loja atualizadas com sucesso!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleResetSiteConfig = () => {
    const updated = {
      ...DEFAULT_SITE_CONFIG,
      managerUsername: siteConfig.managerUsername,
      managerPassword: siteConfig.managerPassword,
    };
    setSiteConfig(updated);
    upsertSiteConfigInDb(updated).catch((err) => console.error('Erro ao guardar configurações:', err));
    setToastMessage('Configurações restauradas para o padrão oficial (credenciais mantidas).');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddCategory = (newCat: CategoryItem) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === newCat.id);
      if (exists) {
        return prev.map((c) => (c.id === newCat.id ? newCat : c));
      }
      return [...prev, newCat];
    });
    upsertCategoryInDb(newCat).catch((err) => console.error('Erro ao salvar categoria na base de dados:', err));
    setToastMessage(`Família "${newCat.name}" adicionada com sucesso!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteCategory = (catId: string) => {
    if (catId === 'todos') return;
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    deleteCategoryFromDb(catId).catch((err) => console.error('Erro ao remover categoria da base de dados:', err));
    setToastMessage('Família removida.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleResetCategories = () => {
    setCategories(DEFAULT_CATEGORIES_LIST);
    setToastMessage('Famílias restauradas para o padrão oficial.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Notificação Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate max-w-xs">{toastMessage}</span>
        </div>
      )}

      {/* MODAL INICIAL DE PERGUNTA: CLIENTE OU GESTOR */}
      <WelcomeRoleModal
        isOpen={isWelcomeModalOpen}
        onSelectRole={handleSelectRole}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* MODAL DE LOGIN DO GESTOR */}
      <ManagerLoginModal
        isOpen={isLoginModalOpen}
        onSuccess={handleLoginSuccess}
        onCancel={() => {
          setIsLoginModalOpen(false);
          setIsManagerLoggedIn(false);
          setCurrentRole('cliente');
        }}
        siteConfig={siteConfig}
        onSaveCredentials={handleSaveInitialCredentials}
      />

      {/* SE FOR MODO GESTOR (LOGADO): EXIBE O PAINEL DE GESTÃO */}
      {currentRole === 'gestor' && isManagerLoggedIn ? (
        <ManagerDashboard
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onSwitchToClient={() => {
            setIsManagerLoggedIn(false);
            setCurrentRole('cliente');
            setToastMessage('Modo Cliente ativado. A senha de gestor será requerida ao voltar.');
            setTimeout(() => setToastMessage(null), 3000);
          }}
          onLogout={handleLogoutManager}
          siteConfig={siteConfig}
          onUpdateSiteConfig={handleUpdateSiteConfig}
          onResetSiteConfig={handleResetSiteConfig}
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onResetCategories={handleResetCategories}
        />
      ) : (
        /* SE FOR MODO CLIENTE: EXIBE A LOJA COMPLETA COM QUANTIDADES E WHATSAPP */
        <>
          {/* Barra de Navegação */}
          <Navbar
            cartItemCount={cartTotalItems}
            cartTotal={cartTotalAmount}
            onOpenCart={() => setIsCartOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentRole={currentRole}
            onOpenRoleSwitcher={() => setIsLoginModalOpen(true)}
            siteConfig={siteConfig}
          />

          {/* Conteúdo Principal: Catálogo com Seleção de Quantidades */}
          <main className="flex-1">
            <CatalogSection
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddToCart={handleAddToCart}
              onViewProductDetails={(product) => setSelectedProduct(product)}
              cart={cart}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              siteConfig={siteConfig}
              categories={categories}
            />
          </main>

          {/* Rodapé com Informações de Contacto e Funcionamento */}
          <Footer
            onOpenCart={() => setIsCartOpen(true)}
            siteConfig={siteConfig}
          />

          {/* Modal de Detalhes Técnicos do Produto */}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={handleAddToCart}
              currentQuantityInCart={
                cart.find((i) => i.product.id === selectedProduct.id)?.quantity || 0
              }
              siteConfig={siteConfig}
            />
          )}

          {/* Carrinho de Compras com Formulário de Dados Pessoais do Cliente */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onContinueShopping={() => setIsCartOpen(false)}
            customerDetails={customerDetails}
            onUpdateCustomerDetails={handleUpdateCustomerDetails}
            onSaveOrder={handleSaveOrder}
            siteConfig={siteConfig}
          />

          {/* Botões Flutuantes: WhatsApp Oficial e Carrinho no Telemóvel */}
          <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex flex-col items-end gap-2">
            {/* Voltar ao Topo */}
            {showScrollTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full bg-white text-slate-700 border border-slate-200 shadow-md flex items-center justify-center transition-all hover:bg-slate-100 cursor-pointer"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Ação Flutuante do WhatsApp Oficial */}
            <a
              id="floating-whatsapp-btn"
              href={`https://wa.me/${siteConfig.whatsappNumber || COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                siteConfig.whatsappGreeting ||
                  'Olá DUOTEC! Gostaria de fazer uma encomenda de componentes electrónicos.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-auto sm:px-3.5 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              title={`Atendimento WhatsApp: ${siteConfig.phoneFormatted || COMPANY_INFO.phoneFormatted}`}
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span className="hidden sm:inline">
                WhatsApp ({siteConfig.phoneFormatted || COMPANY_INFO.phoneFormatted})
              </span>
            </a>

            {/* Botão de Carrinho no Telemóvel */}
            {cartTotalItems > 0 && (
              <button
                id="floating-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 active:scale-95 text-white font-black text-xs shadow-xl shadow-blue-600/30 cursor-pointer border border-blue-500 animate-in slide-in-from-bottom-2"
                aria-label="Ver carrinho"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>
                  {cartTotalItems} {cartTotalItems === 1 ? 'item' : 'itens'} ({formatKzCompact(cartTotalAmount, siteConfig.currencySymbol, siteConfig.currencyPosition)})
                </span>
              </button>
            )}
          </div>
        </>
      )}

    </div>
  );
}
