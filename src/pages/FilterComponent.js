import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { IoFilterOutline } from 'react-icons/io5';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState({
    materials: [],
    shapes: [],
    designs: []
  });

  useEffect(() => {
    const fetchFiltersFromProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const materialsSet = new Set();
        const shapesSet = new Set();
        const designsSet = new Set();

        snapshot.docs.forEach(doc => {
          const data = doc.data();

          if (data.material) materialsSet.add(data.material);
          if (data.shape) shapesSet.add(data.shape);
          if (data.design) designsSet.add(data.design);
        });

        setFilterOptions({
          materials: [...materialsSet],
          shapes: [...shapesSet],
          designs: [...designsSet]
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchFiltersFromProducts();
  }, []);

  return (
    <div className="filter-system-container">
      <div className="dynamic-dropdown-row">

        <div className="filter-group-container">

          <div className="filter-label-group">
            <IoFilterOutline size={20} />
            <span>Refine By:</span>
          </div>

          <div className="dropdown-gap-wrapper">

            <select onChange={(e) => onFilterChange('design', e.target.value)}>
              <option value="">All Designs</option>
              {filterOptions.designs.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <select onChange={(e) => onFilterChange('material', e.target.value)}>
              <option value="">All Materials</option>
              {filterOptions.materials.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            <select onChange={(e) => onFilterChange('shape', e.target.value)}>
              <option value="">All Shapes</option>
              {filterOptions.shapes.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FilterComponent;