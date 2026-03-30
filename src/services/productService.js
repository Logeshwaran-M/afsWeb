import { 
  collection, 
  getDocs, 
  getDoc, 
  doc,
  query,
  orderBy,
  where,
  limit,
  onSnapshot  // 🔥 Real-time listener
} from 'firebase/firestore';
import { db } from '../firebase/config';

const productsCollection = collection(db, 'products');

// Get all products (normal fetch)
export const getAllProducts = async () => {
  try {
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// 🔥 REAL-TIME PRODUCT LISTENER - Auto updates when admin adds products
export const subscribeToProducts = (callback) => {
  const q = query(productsCollection, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    callback(products);
    console.log('✅ Products updated in real-time');
  }, (error) => {
    console.error('Product listener error:', error);
  });
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(productsCollection, where('category', '==', category));
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

// Get popular products
export const getPopularProducts = async (limitCount = 8) => {
  try {
    const q = query(
      productsCollection, 
      where('popular', '==', true), 
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting popular products:', error);
    return [];
  }
};