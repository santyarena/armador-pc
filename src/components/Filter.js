import React from 'react';

function Filter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div>
      <label>Filtrar por categoría:</label>
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Todas las categorías</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
