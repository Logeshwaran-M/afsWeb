import { 
  collection, 
  getDocs, 
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

const collectionName = 'categories';
const categoriesCollection = collection(db, collectionName);

// Get all categories (from admin panel)
export const getAllCategories = async () => {
  try {
    const q = query(categoriesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Get category by name
export const getCategoryByName = async (name) => {
  try {
    const categories = await getAllCategories();
    return categories.find(c => c.name === name) || null;
  } catch (error) {
    console.error('Error getting category by name:', error);
    return null;
  }
};