import React, { useState } from 'react';

function PCBuilder({ products }) {
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedGraphicsCard, setSelectedGraphicsCard] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCooler, setSelectedCooler] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Filtrar los productos por categoría
  const processors = products.filter(product => product.category === 'Procesador');
  const motherboards = products.filter(product => product.category === 'Placa Madre');
  const graphicsCards = products.filter(product => product.category === 'Tarjeta Gráfica');
  const rams = products.filter(product => product.category === 'Memoria RAM');
  const storages = products.filter(product => product.category === 'Almacenamiento');
  const powerSupplies = products.filter(product => product.category === 'Fuente de Poder');
  const cases = products.filter(product => product.category === 'Gabinete');
  const coolers = products.filter(product => product.category === 'Cooler');

  // Función para sumar el precio total de los productos seleccionados
  const updateTotalPrice = () => {
    const prices = [
      selectedProcessor?.price || 0,
      selectedMotherboard?.price || 0,
      selectedGraphicsCard?.price || 0,
      selectedRAM?.price || 0,
      selectedStorage?.price || 0,
      selectedPowerSupply?.price || 0,
      selectedCase?.price || 0,
      selectedCooler?.price || 0
    ];
    const sum = prices.reduce((acc, curr) => acc + Number(curr), 0);
    setTotalPrice(sum);
  };

  // Manejar la selección de los productos
  const handleProcessorChange = (e) => {
    const selected = processors.find(proc => proc.name === e.target.value);
    setSelectedProcessor(selected);
    updateTotalPrice();
  };

  const handleMotherboardChange = (e) => {
    const selected = motherboards.find(mb => mb.name === e.target.value);
    setSelectedMotherboard(selected);
    updateTotalPrice();
  };

  const handleGraphicsCardChange = (e) => {
    const selected = graphicsCards.find(gc => gc.name === e.target.value);
    setSelectedGraphicsCard(selected);
    updateTotalPrice();
  };

  const handleRAMChange = (e) => {
    const selected = rams.find(ram => ram.name === e.target.value);
    setSelectedRAM(selected);
    updateTotalPrice();
  };

  const handleStorageChange = (e) => {
    const selected = storages.find(storage => storage.name === e.target.value);
    setSelectedStorage(selected);
    updateTotalPrice();
  };

  const handlePowerSupplyChange = (e) => {
    const selected = powerSupplies.find(ps => ps.name === e.target.value);
    setSelectedPowerSupply(selected);
    updateTotalPrice();
  };

  const handleCaseChange = (e) => {
    const selected = cases.find(cs => cs.name === e.target.value);
    setSelectedCase(selected);
    updateTotalPrice();
  };

  const handleCoolerChange = (e) => {
    const selected = coolers.find(cooler => cooler.name === e.target.value);
    setSelectedCooler(selected);
    updateTotalPrice();
  };

  return (
    <div className="pc-builder-container container">
      <h2>Armador de PC</h2>

      {/* Sección de procesadores */}
      <div className="builder-section">
        <h3>Elige tu Procesador</h3>
        <select onChange={handleProcessorChange}>
          <option value="">Selecciona un procesador</option>
          {processors.map(processor => (
            <option key={processor.name} value={processor.name}>{processor.name} - {processor.subSubCategory} - ${processor.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de placas madre */}
      <div className="builder-section">
        <h3>Elige tu Placa Madre</h3>
        <select onChange={handleMotherboardChange}>
          <option value="">Selecciona una placa madre</option>
          {motherboards.map(motherboard => (
            <option key={motherboard.name} value={motherboard.name}>{motherboard.name} - {motherboard.subSubCategory} - ${motherboard.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de tarjetas gráficas */}
      <div className="builder-section">
        <h3>Elige tu Tarjeta Gráfica</h3>
        <select onChange={handleGraphicsCardChange}>
          <option value="">Selecciona una tarjeta gráfica</option>
          {graphicsCards.map(graphicsCard => (
            <option key={graphicsCard.name} value={graphicsCard.name}>{graphicsCard.name} - ${graphicsCard.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de memoria RAM */}
      <div className="builder-section">
        <h3>Elige tu Memoria RAM</h3>
        <select onChange={handleRAMChange}>
          <option value="">Selecciona una memoria RAM</option>
          {rams.map(ram => (
            <option key={ram.name} value={ram.name}>{ram.name} - ${ram.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de almacenamiento */}
      <div className="builder-section">
        <h3>Elige tu Almacenamiento</h3>
        <select onChange={handleStorageChange}>
          <option value="">Selecciona un almacenamiento</option>
          {storages.map(storage => (
            <option key={storage.name} value={storage.name}>{storage.name} - ${storage.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de fuente de poder */}
      <div className="builder-section">
        <h3>Elige tu Fuente de Poder</h3>
        <select onChange={handlePowerSupplyChange}>
          <option value="">Selecciona una fuente de poder</option>
          {powerSupplies.map(powerSupply => (
            <option key={powerSupply.name} value={powerSupply.name}>{powerSupply.name} - ${powerSupply.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de gabinete */}
      <div className="builder-section">
        <h3>Elige tu Gabinete</h3>
        <select onChange={handleCaseChange}>
          <option value="">Selecciona un gabinete</option>
          {cases.map(caseProduct => (
            <option key={caseProduct.name} value={caseProduct.name}>{caseProduct.name} - ${caseProduct.price}</option>
          ))}
        </select>
      </div>

      {/* Sección de coolers */}
      <div className="builder-section">
        <h3>Elige tu Cooler</h3>
        <select onChange={handleCoolerChange}>
          <option value="">Selecciona un cooler</option>
          {coolers.map(cooler => (
            <option key={cooler.name} value={cooler.name}>{cooler.name} - ${cooler.price}</option>
          ))}
        </select>
      </div>

      {/* Mostrar resumen de selección */}
      <div className="summary">
        <h3>Resumen de selección</h3>
        <p>Procesador: {selectedProcessor ? `${selectedProcessor.name} - ${selectedProcessor.subSubCategory} - $${selectedProcessor.price}` : 'No seleccionado'}</p>
        <p>Placa Madre: {selectedMotherboard ? `${selectedMotherboard.name} - ${selectedMotherboard.subSubCategory} - $${selectedMotherboard.price}` : 'No seleccionada'}</p>
        <p>Tarjeta Gráfica: {selectedGraphicsCard ? `${selectedGraphicsCard.name} - $${selectedGraphicsCard.price}` : 'No seleccionada'}</p>
        <p>Memoria RAM: {selectedRAM ? `${selectedRAM.name} - $${selectedRAM.price}` : 'No seleccionada'}</p>
        <p>Almacenamiento: {selectedStorage ? `${selectedStorage.name} - $${selectedStorage.price}` : 'No seleccionado'}</p>
        <p>Fuente de Poder: {selectedPowerSupply ? `${selectedPowerSupply.name} - $${selectedPowerSupply.price}` : 'No seleccionada'}</p>
        <p>Gabinete: {selectedCase ? `${selectedCase.name} - $${selectedCase.price}` : 'No seleccionado'}</p>
        <p>Cooler: {selectedCooler ? `${selectedCooler.name} - $${selectedCooler.price}` : 'No seleccionado'}</p>
        <h3>Total: ${totalPrice}</h3>
      </div>
    </div>
  );
}

export default PCBuilder;
