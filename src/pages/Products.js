import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { pageContent } from './contentConfig'; 
import ProductCard from '../components/ProductCard';
import FilterComponent from './FilterComponent';

const Products = () => {
  // Example URL: /products/desk/doctors
  const { category, subcategory } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
  design: "",
  material: "",
  shape: ""
});

  // Use subcategory key for content, fallback to category
const contentKey = subcategory || category || "default";
const content = pageContent[contentKey] || pageContent["default"];

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const productsRef = collection(db, "products");
      let q;

      if (category && subcategory) {
        // ✅ BOTH category + subcategory
        q = query(
          productsRef,
          where("category", "==", category),
          where("subCategory", "==", subcategory)
        );

      } else if (category) {
        // ✅ ONLY category
        q = query(
          productsRef,
          where("category", "==", category)
        );

      } else {
        // ✅ NO params → get ALL products
        q = productsRef;
      }

      const snapshot = await getDocs(q);

      const data = snapshot.docs
  .map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  .filter(item => item && item.id); // ✅ remove bad data

      setProducts(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [category, subcategory]);

const handleFilterChange = (type, value) => {
  setFilters(prev => ({
    ...prev,
    [type]: value
  }));
};

  return (
    <div className="category-container">
   <div className="category-container container my-4">
  <div className="page-header text-center p-4 rounded shadow-sm bg-light">

    <h1 className="fw-bold text-dark mb-2">
      {content?.title || "All Products"}
    </h1>

    <p className="fw-bold text-dark  fs-5 mb-2">
      {content?.subtitle || "Explore our latest collection"}
    </p>

    <p className="text-secondary mx-auto" >
      {content?.description || "Find the best designs crafted for your needs."}
    </p>

    {/* Optional underline */}
  

  </div>
</div>
<FilterComponent onFilterChange={handleFilterChange} />

      <div className="product-grid mt-5">
        {loading ? (
          <div className="loader">Loading Designs...</div>
        ) :products
  .filter(product => {
    return (
      (!filters.design || product.design === filters.design) &&
      (!filters.material || product.material === filters.material) &&
      (!filters.shape || product.shape === filters.shape)
    );
  })
  .map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
      </div>
    </div>
  );
};

export default Products;