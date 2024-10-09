import React from 'react';

function CategoryList() {
  // Lista de categorías de componentes
  const categories = [
    'Procesadores',
    'Tarjetas Gráficas',
    'Memorias RAM',
    'Fuentes de Poder',
    'Placas Base',
  ];

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
