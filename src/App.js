import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import PCBuilder from './components/PCBuilder';
import CreateProduct from './components/CreateProduct'; // Importamos el nuevo componente para "Crear Producto"

function App() {
  // Estado para manejar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('');

  // Estado para los productos
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Guardar los productos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Función para agregar productos
  const addProduct = (product) => {
    const isDuplicate = products.some(
      (p) =>
        p.name === product.name &&
        p.category === product.category &&
        p.subCategory === product.subCategory &&
        p.subSubCategory === product.subSubCategory // Verificamos las sub subcategorías
    );

    if (isDuplicate) {
      alert('Este producto ya existe.');
    } else {
      setProducts([...products, product]);
    }
  };

  // Función para actualizar productos
  const updateProduct = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  // Función para eliminar productos
  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Categorías con subcategorías y sub subcategorías
  const categories = [
    {
      name: 'Procesador',
      subCategories: [
        { name: 'AMD', subSubCategories: ['AM4', 'AM5'] },
        { name: 'Intel', subSubCategories: ['LGA 1151', 'LGA 1200', 'LGA 1700'] }
      ]
    },
    {
      name: 'Placa Madre',
      subCategories: [
        { name: 'AMD', subSubCategories: ['AM4', 'AM5'] },
        { name: 'Intel', subSubCategories: ['LGA 1151', 'LGA 1200', 'LGA 1700'] }
      ]
    },
    { name: 'Tarjeta Gráfica', subCategories: ['AMD', 'Nvidia'] },
    { name: 'Memoria RAM', subCategories: [] },
    { name: 'Almacenamiento', subCategories: [] },
    { name: 'Fuente de Poder', subCategories: [] },
    { name: 'Gabinete', subCategories: [] },
    { name: 'Cooler', subCategories: [] },
    { name: 'Mouse', subCategories: [] },
    { name: 'Wifi', subCategories: [] },
    { name: 'Teclado', subCategories: [] },
    { name: 'Monitor', subCategories: [] },
    { name: 'Auriculares', subCategories: [] },
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Armador de PC y Lista de Precios</h1>
          <nav>
            <ul>
              <li><Link to="/">Lista de Precios</Link></li>
              <li><Link to="/pc-builder">Armador de PC</Link></li>
              <li><Link to="/create-product">Crear Producto</Link></li> {/* Nueva opción para "Crear Producto" */}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="product-list-section">
              <Filter
                categories={categories.map(category => category.name)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <ProductList
                products={filteredProducts}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            </div>
          } />
          <Route path="/pc-builder" element={<PCBuilder products={products} categories={categories} />} />
          <Route path="/create-product" element={<CreateProduct addProduct={addProduct} categories={categories} />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
