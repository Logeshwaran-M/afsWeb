import { 
  getAllProducts,
  getProductById as fetchProductById,
  getProductsByCategory as fetchProductsByCategory,
  getPopularProducts as fetchPopularProducts,
  subscribeToProducts as subscribeToProductsService  // ✅ Rename import
} from '../services/productService';

// Export functions
export const getProducts = getAllProducts;
export const getProductById = fetchProductById;
export const getProductsByCategory = fetchProductsByCategory;
export const getPopularProducts = fetchPopularProducts;
export const subscribeToProducts = subscribeToProductsService;  // ✅ Use renamed import

// Helper function to get related products
export const getRelatedProducts = async (product, limit = 4) => {
  try {
    const products = await fetchProductsByCategory(product.category);
    return products.filter(p => p.id !== product.id).slice(0, limit);
  } catch (error) {
    console.error('Error getting related products:', error);
    return [];
  }
};

// Default export for backward compatibility
const products = [];
export default products;