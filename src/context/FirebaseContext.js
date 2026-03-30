import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';
import toast from 'react-hot-toast';
import { getAuth,  } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserProfile({ id: userDoc.id, ...userDoc.data() });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Authentication functions
const register = async (email, password, additionalData) => {
  const auth = getAuth();
  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
     await updateProfile(userCredential.user, {
      displayName:additionalData.name
    });
    // 2. IMPORTANT: Use user.uid as the document ID
    // This connects Auth and Firestore perfectly
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: additionalData.name,
      email: email,
      role: "customer",
      createdAt: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Firestore functions
  const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
        userId: user?.uid
      });
      toast.success('Document added successfully');
      return docRef;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const getDocuments = async (collectionName, conditions = []) => {
    try {
      let q = collection(db, collectionName);
      
      if (conditions.length > 0) {
        const constraints = conditions.map(cond => 
          where(cond.field, cond.operator, cond.value)
        );
        q = query(q, ...constraints);
      }

      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  };

  const updateDocument = async (collectionName, docId, data) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      toast.success('Document updated successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const deleteDocument = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Storage functions
  const uploadFile = async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      toast.error('Error uploading file');
      throw error;
    }
  };

  // Orders functions
  const createOrder = async (orderData) => {
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        userId: user?.uid,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      toast.success('Order created successfully');
      return orderRef;
    } catch (error) {
      toast.error('Error creating order');
      throw error;
    }
  };

  const getUserOrders = async () => {
    if (!user) return [];
    try {
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  };

  // Wishlist functions
  const addToWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      await addDoc(collection(db, 'wishlist'), {
        userId: user.uid,
        productId: product.id,
        product: product,
        createdAt: new Date().toISOString()
      });
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error('Error adding to wishlist');
      throw error;
    }
  };

  const getWishlist = async () => {
    if (!user) return [];
    try {
      const q = query(
        collection(db, 'wishlist'), 
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const wishlist = [];
      querySnapshot.forEach((doc) => {
        wishlist.push({ id: doc.id, ...doc.data() });
      });
      return wishlist;
    } catch (error) {
      console.error('Error getting wishlist:', error);
      throw error;
    }
  };

  // Reviews functions
  const addReview = async (productId, reviewData) => {
    if (!user) {
      toast.error('Please login to write a review');
      return;
    }
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: userProfile?.name || user.email,
        productId,
        ...reviewData,
        createdAt: new Date().toISOString(),
        helpful: 0
      });
      toast.success('Review added successfully');
    } catch (error) {
      toast.error('Error adding review');
      throw error;
    }
  };

  const getProductReviews = async (productId) => {
    try {
      const q = query(
        collection(db, 'reviews'), 
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      return reviews;
    } catch (error) {
      console.error('Error getting reviews:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    register,
    login,
    logout,
    resetPassword,
    addDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    uploadFile,
    createOrder,
    getUserOrders,
    addToWishlist,
    getWishlist,
    addReview,
    getProductReviews
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};