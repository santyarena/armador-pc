import React, { useState } from 'react';

function AddProduct({ addProduct }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Procesadores');
  const [subCategory, setSubCategory] = useState('');
  const [socketType, setSocketType] = useState('');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [socketOptions, setSocketOptions] = useState([]);
  const [price, setPrice] = useState('');

  // Lista de categorías disponibles
  const categories = ['Procesadores', 'Tarjetas Gráficas', 'Memorias RAM', 'Fuentes de Poder', 'Motherboards'];

  // Subcategorías y tipos de socket por categoría
  const subCategories = {
    Procesadores: {
      AMD: ['AM4', 'AM5'],
      Intel: ['LGA 1151', 'LGA 1200', 'LGA 1700'],
    },
    Motherboards: {
      AMD: ['AM4', 'AM5'],
      Intel: ['LGA 1151', 'LGA 1200', 'LGA 1700'],
    },
    'Tarjetas Gráficas': {
      AMD: ['Radeon RX 6800', 'Radeon RX 6900'],
      Nvidia: ['RTX 3080', 'RTX 3090'],
    },
  };

  // Manejar cambios en la categoría
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Resetear las subcategorías y sockets cuando se cambia la categoría
    if (selectedCategory in subCategories) {
      setSubCategoryOptions(Object.keys(subCategories[selectedCategory]));
      setSubCategory('');
      setSocketOptions([]);
      setSocketType('');
    } else {
      setSubCategoryOptions([]);
      setSubCategory('');
      setSocketOptions([]);
      setSocketType('');
    }
  };

  // Manejar cambios en la subcategoría (como AMD o Intel para procesadores y motherboards)
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(selectedSubCategory);

    // Actualizar las opciones de socket para procesadores y motherboards
    if (category === 'Procesadores' || category === 'Motherboards') {
      setSocketOptions(subCategories[category][selectedSubCategory]);
      setSocketType('');
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!productName || !price || price <= 0 || price > 100000000) {
      alert('Por favor, ingresa un nombre de producto válido y un precio entre 1 y 10,000.');
      return;
    }
  
    const newProduct = {
      name: productName,
      category,
      subCategory,
      socketType,
      price,
    };
  
    addProduct(newProduct);
    setProductName('');
    setPrice('');
    setSubCategory('');
    setSocketType('');
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Producto:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Categoría:</label>
        <select value={category} onChange={handleCategoryChange}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar subcategorías solo si la categoría seleccionada tiene subcategorías */}
      {subCategoryOptions.length > 0 && (
        <div>
          <label>Subcategoría:</label>
          <select value={subCategory} onChange={handleSubCategoryChange} required>
            <option value="">Selecciona una subcategoría</option>
            {subCategoryOptions.map((subCat, index) => (
              <option key={index} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mostrar opciones de socket solo para procesadores y motherboards */}
      {socketOptions.length > 0 && (
        <div>
          <label>Socket:</label>
          <select value={socketType} onChange={(e) => setSocketType(e.target.value)} required>
            <option value="">Selecciona un socket</option>
            {socketOptions.map((socket, index) => (
              <option key={index} value={socket}>
                {socket}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default AddProduct;
