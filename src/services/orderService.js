
import { db } from "../firebase/config";

import { doc, setDoc, collection, addDoc, getDoc,getDocs } from "firebase/firestore";




// 🔹 Clean undefined values
const cleanData = (obj) => {
  const cleaned = {};

  for (const [key, value] of Object.entries(obj)) {

    if (value === undefined || value === null) {
      cleaned[key] = "";
    }

    else if (Array.isArray(value)) {
      cleaned[key] = value.map((item) =>
        typeof item === "object" ? cleanData(item) : item
      );
    }

    else if (typeof value === "object") {
      cleaned[key] = cleanData(value);
    }

    else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};



// 🔥 Save Order

/**
 * Save an order for a specific user.
 * @param {object} user - Full Firebase Auth user object
 * @param {object} orderData - Order data
 */
export const saveOrder = async (user, orderData) => {
  // 1. Ensure we have a valid UID from Firebase Auth
  const uid = user.uid; 
  
  if (!uid) {
    console.error("No UID found for user");
    return null;
  }

  // 2. Point EXACTLY to the document with that ID
  // This ensures it goes into the user you see in the screenshot
  const userRef = doc(db, "users", uid); 
 const ordersRef = collection(db, "users", uid, "orders");

  try {
    const userSnap = await getDoc(userRef);
    
    // If the user doesn't exist at that ID, create them
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email || "",
        createdAt: new Date().toISOString(),
        role: "customer"
      });
    }

    // 3. Save the order in the subcollection
     const docRef = await addDoc(ordersRef, cleanData(orderData));


  return { id: docRef.id, path: docRef.path };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};



export const getAllOrders = async () => {
  try {
    // 1. Get all users first
    const usersSnapshot = await getDocs(collection(db, "users")); 
    const allOrders = [];

    // 2. Loop through each user to find their 'orders' subcollection
    for (const userDoc of usersSnapshot.docs) {
      const ordersRef = collection(db, "users", userDoc.id, "orders");
      const ordersSnapshot = await getDocs(ordersRef); // 👈 Use getDocs here

      ordersSnapshot.forEach((orderDoc) => {
        allOrders.push({
          id: orderDoc.id,
          userId: userDoc.id,
          ...orderDoc.data(),
        });
      });
    }

    return allOrders;
  } catch (error) {
    console.error("Error getting all orders:", error);
    return [];
  }
};