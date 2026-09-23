import { createClient } from '@supabase/supabase-js';
import { Product, CategoryItem, OrderRecord, SiteConfig } from '../types';
import { resolveComponentImage } from '../data/componentImages';

// As credenciais são obtidas das variáveis de ambiente Vite (ou utilizam as pré-configuradas)
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://brnpkdceurciaruifgnt.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_z6dMabj3w1D9CAK5K2QWQw_FiDGEiLM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Converte um registo da tabela 'products' do Supabase para o tipo 'Product' da aplicação
 */
export function mapRowToProduct(row: any): Product {
  const specs = Array.isArray(row.features) ? row.features : [];
  const tags = Array.isArray(row.tags) ? row.tags : [];
  
  // Extrair marca ou garantia se guardados em tags
  const brandTag = tags.find((t: string) => t.startsWith('brand:'))?.replace('brand:', '') || row.subcategory || 'DUOTEC';
  const warrantyTag = tags.find((t: string) => t.startsWith('warranty:'))?.replace('warranty:', '') || undefined;
  const categoryNameTag = tags.find((t: string) => t.startsWith('catName:'))?.replace('catName:', '') || '';

  const stockNum = typeof row.stock === 'number' ? row.stock : (Number(row.stock) || 0);

  return {
    id: String(row.id),
    name: String(row.name || ''),
    category: String(row.category || 'outros'),
    categoryName: categoryNameTag || String(row.category || ''),
    price: Number(row.price || 0),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    shortDescription: String(row.description || ''),
    detailedDescription: String(row.description || ''),
    image: resolveComponentImage(row.name, row.category, row.image || ''),
    brand: brandTag,
    inStock: row.is_active !== false && stockNum > 0,
    stockQuantity: stockNum,
    featured: Boolean(row.featured),
    specs: specs,
    warranty: warrantyTag,
  };
}

/**
 * Converte um 'Product' para o formato esperado pela tabela 'products' do Supabase
 */
export function mapProductToRow(p: Product) {
  const tags: string[] = [];
  if (p.brand) tags.push(`brand:${p.brand}`);
  if (p.warranty) tags.push(`warranty:${p.warranty}`);
  if (p.categoryName) tags.push(`catName:${p.categoryName}`);

  // Se a imagem for um base64 enorme ou blob local, manter ou guardar
  const imageToStore = typeof p.image === 'string' && p.image.length < 5000 ? p.image : '';

  return {
    id: p.id,
    name: p.name,
    category: p.category,
    subcategory: p.brand || null,
    price: p.price,
    original_price: p.originalPrice || null,
    stock: p.stockQuantity ?? (p.inStock ? 10 : 0),
    unit: 'un',
    image: imageToStore,
    description: p.shortDescription || p.detailedDescription || '',
    features: p.specs || [],
    tags: tags,
    is_active: p.inStock,
    featured: Boolean(p.featured),
    sku: p.id,
  };
}

/* ==========================================================================
   PRODUTOS
   ========================================================================== */

export async function fetchProductsFromDb(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erro ao carregar produtos do Supabase:', error);
      return [];
    }
    return (data || []).map(mapRowToProduct);
  } catch (err) {
    console.error('Falha de rede ao buscar produtos:', err);
    return [];
  }
}

export async function upsertProductInDb(product: Product): Promise<boolean> {
  try {
    const row = mapProductToRow(product);
    const { error } = await supabase.from('products').upsert([row]);
    if (error) {
      console.error('Erro ao guardar produto no Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao sincronizar produto:', err);
    return false;
  }
}

export async function deleteProductFromDb(productId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      console.error('Erro ao eliminar produto no Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao eliminar produto:', err);
    return false;
  }
}

export async function batchInsertProducts(productsList: Product[]): Promise<boolean> {
  try {
    const rows = productsList.map(mapProductToRow);
    // Insere em lotes de 50 para evitar limites de payload
    const chunkSize = 50;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await supabase.from('products').upsert(chunk);
      if (error) {
        console.error('Erro ao inserir lote de produtos:', error);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error('Falha ao inserir múltiplos produtos:', err);
    return false;
  }
}

/* ==========================================================================
   CATEGORIAS
   ========================================================================== */

export async function fetchCategoriesFromDb(): Promise<CategoryItem[]> {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.warn('Erro ao carregar categorias do Supabase:', error);
      return [];
    }
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      icon: row.icon || undefined,
      description: row.description || undefined,
      isCustom: true,
    }));
  } catch (err) {
    console.error('Falha de rede ao buscar categorias:', err);
    return [];
  }
}

export async function upsertCategoryInDb(cat: CategoryItem): Promise<boolean> {
  try {
    const row = {
      id: cat.id,
      name: cat.name,
      icon: cat.icon || null,
    };
    const { error } = await supabase.from('categories').upsert([row]);
    if (error) {
      console.error('Erro ao guardar categoria:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao sincronizar categoria:', err);
    return false;
  }
}

export async function deleteCategoryFromDb(catId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('categories').delete().eq('id', catId);
    if (error) {
      console.error('Erro ao eliminar categoria:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao eliminar categoria:', err);
    return false;
  }
}

export async function batchInsertCategories(categoriesList: CategoryItem[]): Promise<boolean> {
  try {
    const rows = categoriesList.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon || null,
    }));
    const { error } = await supabase.from('categories').upsert(rows);
    if (error) {
      console.error('Erro ao inserir categorias:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao sincronizar categorias:', err);
    return false;
  }
}

/* ==========================================================================
   ENCOMENDAS (ORDERS)
   ========================================================================== */

export async function fetchOrdersFromDb(): Promise<OrderRecord[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erro ao carregar encomendas do Supabase:', error);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      createdAt: row.created_at,
      customer: {
        name: row.customer_name || '',
        phone: row.customer_phone || '',
        fulfillmentType: (row.fulfillment_type as 'entrega' | 'coleta') || 'coleta',
        address: row.address || '',
        municipality: row.municipality || '',
        paymentMethod: row.payment_method || '',
        notes: row.notes || '',
      },
      items: Array.isArray(row.items) ? row.items : [],
      totalAmount: Number(row.total || row.subtotal || 0),
      status: (row.status as OrderRecord['status']) || 'Pendente',
    }));
  } catch (err) {
    console.error('Falha de rede ao buscar encomendas:', err);
    return [];
  }
}

export async function insertOrderInDb(order: OrderRecord): Promise<boolean> {
  try {
    const row = {
      id: order.id,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      fulfillment_type: order.customer.fulfillmentType,
      address: order.customer.address,
      municipality: order.customer.municipality,
      payment_method: order.customer.paymentMethod,
      notes: order.customer.notes,
      status: order.status,
      items: order.items,
      subtotal: order.totalAmount,
      total: order.totalAmount,
    };
    const { error } = await supabase.from('orders').insert([row]);
    if (error) {
      console.error('Erro ao guardar encomenda no Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao guardar encomenda no Supabase:', err);
    return false;
  }
}

export async function updateOrderStatusInDb(
  orderId: string,
  status: OrderRecord['status']
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Erro ao atualizar estado da encomenda:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao atualizar estado da encomenda:', err);
    return false;
  }
}

/* ==========================================================================
   CONFIGURAÇÕES DO SITE (SITE CONFIG)
   ========================================================================== */

export async function fetchSiteConfigFromDb(): Promise<Partial<SiteConfig> | null> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) return null;

    return {
      currencySymbol: data.currency_symbol || 'Kz',
      whatsappNumber: data.whatsapp_number || undefined,
      companyName: data.company_name || undefined,
      deliveryFeeStandard: data.delivery_fee ? Number(data.delivery_fee) : undefined,
      managerUsername: (data as any).manager_username || undefined,
      managerPassword: (data as any).manager_password || undefined,
    };
  } catch (err) {
    console.error('Falha ao carregar site_config do Supabase:', err);
    return null;
  }
}

export async function upsertSiteConfigInDb(config: SiteConfig): Promise<boolean> {
  try {
    const row: any = {
      id: 'default',
      currency_symbol: config.currencySymbol,
      whatsapp_number: config.whatsappNumber,
      company_name: config.companyName,
      delivery_fee: config.deliveryFeeStandard,
    };
    if (config.managerUsername) row.manager_username = config.managerUsername;
    if (config.managerPassword) row.manager_password = config.managerPassword;

    const { error } = await supabase.from('site_config').upsert([row]);
    if (error) {
      // Se der erro por ausência das colunas de credenciais, salva os restantes dados
      const fallbackRow = {
        id: 'default',
        currency_symbol: config.currencySymbol,
        whatsapp_number: config.whatsappNumber,
        company_name: config.companyName,
        delivery_fee: config.deliveryFeeStandard,
      };
      await supabase.from('site_config').upsert([fallbackRow]);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao guardar configurações no Supabase:', err);
    return false;
  }
}
