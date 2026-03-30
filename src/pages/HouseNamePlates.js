import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import LoadingSpinner from '../components/LoadingSpinner';
import './CategoryPage.css';

const HouseNamePlates = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsByCategory('house-nameplates');
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>House Name Plates</h1>
        <p>Beautiful name plates for your home</p>
      </div>

      <div className="category-filters">
        <select 
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popular">Sort by: Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {sortedProducts.length === 0 && !loading && (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default HouseNamePlates;