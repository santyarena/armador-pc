import React from 'react';

function Summary({ selectedComponents }) {
  const totalPrice = Object.values(selectedComponents).reduce(
    (total, component) => total + (component ? Number(component.price) : 0),
    0
  );

  return (
    <div>
      <h3>Resumen de la Configuración</h3>
      <ul>
        {Object.entries(selectedComponents).map(([category, component], index) => (
          <li key={index}>
            {category}: {component ? `${component.name} - $${component.price}` : 'No seleccionado'}
          </li>
        ))}
      </ul>
      <h4>Total: ${totalPrice}</h4>
    </div>
  );
}

export default Summary;
