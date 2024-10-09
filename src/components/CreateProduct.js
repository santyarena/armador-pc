import React, { useState } from 'react';

function CreateProduct({ addProduct, categories }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(categories[0].name); // Iniciar con la primera categoría
  const [subCategory, setSubCategory] = useState(categories[0].subCategories.length > 0 ? categories[0].subCategories[0].name : '');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [price, setPrice] = useState('');

  // Manejar el cambio de categoría y actualizar subcategorías
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const categoryObject = categories.find(cat => cat.name === selectedCategory);
    const firstSubCategory = categoryObject.subCategories.length > 0 ? categoryObject.subCategories[0].name : '';
    setSubCategory(firstSubCategory);
    setSubSubCategory(categoryObject.subCategories.length > 0 && categoryObject.subCategories[0].subSubCategories.length > 0 ? categoryObject.subCategories[0].subSubCategories[0] : '');
  };

  // Manejar el cambio de subcategoría y actualizar sub subcategorías
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(selectedSubCategory);

    const categoryObject = categories.find(cat => cat.name === category);
    const subCategoryObject = categoryObject.subCategories.find(sub => sub.name === selectedSubCategory);
    setSubSubCategory(subCategoryObject.subSubCategories.length > 0 ? subCategoryObject.subSubCategories[0] : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      category,
      subCategory,
      subSubCategory,
      price,
    };
    addProduct(newProduct);
    setProductName('');
    setPrice('');
    setSubSubCategory('');
  };

  return (
    <div className="create-product-container container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Producto:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Categoría:
          <select value={category} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>
        </label>

        {/* Mostrar subcategorías solo si hay subcategorías para la categoría seleccionada */}
        {categories.find(cat => cat.name === category).subCategories.length > 0 && (
          <label>
            Subcategoría:
            <select value={subCategory} onChange={handleSubCategoryChange}>
              {categories.find(cat => cat.name === category).subCategories.map((sub) => (
                <option key={sub.name} value={sub.name}>{sub.name}</option>
              ))}
            </select>
          </label>
        )}

        {/* Mostrar sub subcategorías solo si hay sub subcategorías para la subcategoría seleccionada */}
        {categories.find(cat => cat.name === category).subCategories.find(sub => sub.name === subCategory)?.subSubCategories.length > 0 && (
          <label>
            Sub Subcategoría:
            <select value={subSubCategory} onChange={(e) => setSubSubCategory(e.target.value)}>
              {categories.find(cat => cat.name === category).subCategories.find(sub => sub.name === subCategory).subSubCategories.map((subSub) => (
                <option key={subSub} value={subSub}>{subSub}</option>
              ))}
            </select>
          </label>
        )}

        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default CreateProduct;
