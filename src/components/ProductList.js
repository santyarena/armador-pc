import React, { useState } from 'react';

function ProductList({ products, updateProduct, deleteProduct }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewPrice(products[index].price);
  };

  const handleUpdate = (index) => {
    const updatedProduct = { ...products[index], price: newPrice };
    updateProduct(index, updatedProduct);
    setEditingIndex(null);
    setNewPrice('');
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Socket</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.subCategory || '-'}</td>
              <td>{product.socketType || '-'}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => handleUpdate(index)}>Actualizar</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Editar Precio</button>
                )}
                <button onClick={() => deleteProduct(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
