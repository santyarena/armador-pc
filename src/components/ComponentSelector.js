import React from 'react';

function ComponentSelector({ category, components, selectedComponent, onSelect }) {
  return (
    <div>
      <h3>{category}</h3>
      <select
        value={selectedComponent ? selectedComponent.name : ''}
        onChange={(e) => {
          const selectedName = e.target.value;
          const component = components.find((comp) => comp.name === selectedName);
          onSelect(component);
        }}
      >
        <option value="">Selecciona un {category}</option>
        {components.map((component, index) => (
          <option key={index} value={component.name}>
            {component.name} - ${component.price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComponentSelector;
