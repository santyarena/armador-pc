import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PCBuilder({ products }) {
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedGraphicsCard, setSelectedGraphicsCard] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCooler, setSelectedCooler] = useState(null);
  const [selectedWifi, setSelectedWifi] = useState(null);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [selectedKeyboard, setSelectedKeyboard] = useState(null);
  const [selectedMouse, setSelectedMouse] = useState(null);
  const [selectedHeadphones, setSelectedHeadphones] = useState(null);
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
  const wifis = products.filter(product => product.category === 'Wifi');
  const monitors = products.filter(product => product.category === 'Monitor');
  const keyboards = products.filter(product => product.category === 'Teclado');
  const mice = products.filter(product => product.category === 'Mouse');
  const headphones = products.filter(product => product.category === 'Auriculares');
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
      selectedCooler?.price || 0,
      selectedWifi?.price || 0,
      selectedMonitor?.price || 0,
      selectedKeyboard?.price || 0,
      selectedMouse?.price || 0,
      selectedHeadphones?.price || 0,
    ];
    const sum = prices.reduce((acc, curr) => acc + Number(curr), 0);
    setTotalPrice(sum);
  };

  // Lógica de compatibilidad en Procesadores y Motherboards
  const handleProcessorChange = (e) => {
    const selected = processors.find(proc => proc.name === e.target.value);
    setSelectedProcessor(selected);

    if (selectedMotherboard) {
      if (selected.brand === 'AMD' && selectedMotherboard.brand !== 'AMD') {
        alert('La motherboard seleccionada no es compatible con un procesador AMD');
        setSelectedMotherboard(null);
      } else if (selected.brand === 'Intel' && selectedMotherboard.brand !== 'Intel') {
        alert('La motherboard seleccionada no es compatible con un procesador Intel');
        setSelectedMotherboard(null);
      }
    }
    updateTotalPrice();
  };

  const handleMotherboardChange = (e) => {
    const selected = motherboards.find(mb => mb.name === e.target.value);
    setSelectedMotherboard(selected);

    if (selectedProcessor) {
      if (selectedProcessor.brand === 'AMD' && selected.brand !== 'AMD') {
        alert('El procesador seleccionado no es compatible con esta motherboard');
        setSelectedMotherboard(null);
      } else if (selectedProcessor.brand === 'Intel' && selected.brand !== 'Intel') {
        alert('El procesador seleccionado no es compatible con esta motherboard');
        setSelectedMotherboard(null);
      }
    }
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
  const handleWifiChange = (e) => {
    const selected = wifis.find(wifi => wifi.name === e.target.value);
    setSelectedWifi(selected);
    updateTotalPrice();
  };

  const handleMonitorChange = (e) => {
    const selected = monitors.find(monitor => monitor.name === e.target.value);
    setSelectedMonitor(selected);
    updateTotalPrice();
  };

  const handleKeyboardChange = (e) => {
    const selected = keyboards.find(keyboard => keyboard.name === e.target.value);
    setSelectedKeyboard(selected);
    updateTotalPrice();
  };

  const handleMouseChange = (e) => {
    const selected = mice.find(mouse => mouse.name === e.target.value);
    setSelectedMouse(selected);
    updateTotalPrice();
  };

  const handleHeadphonesChange = (e) => {
    const selected = headphones.find(headphone => headphone.name === e.target.value);
    setSelectedHeadphones(selected);
    updateTotalPrice();
  };
  // Función para generar el PDF con autoTable
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Presupuesto #1", 14, 15);
    doc.text("Fecha: 05/10/2024", 150, 15);
    doc.text("Nombre de Empresa", 14, 25);
    doc.text("Av. Tte Donato Alvarez 1526, La Paternal, Ciudad de Buenos Aires", 14, 30);
    doc.text("Tel.: 911-40859342", 14, 35);
    doc.text("CUIT: 23223648029", 14, 40);

    doc.autoTable({
      startY: 50,
      head: [['Cantidad', 'Descripción', 'Precio Unitario', 'IVA', 'Bonificación', 'Importe']],
      body: [
        ['1', selectedProcessor ? selectedProcessor.name : 'No seleccionado', selectedProcessor ? `$${selectedProcessor.price}` : '0', '21%', '0%', selectedProcessor ? `$${selectedProcessor.price}` : '0'],
        ['1', selectedMotherboard ? selectedMotherboard.name : 'No seleccionada', selectedMotherboard ? `$${selectedMotherboard.price}` : '0', '21%', '0%', selectedMotherboard ? `$${selectedMotherboard.price}` : '0'],
        ['1', selectedGraphicsCard ? selectedGraphicsCard.name : 'No seleccionada', selectedGraphicsCard ? `$${selectedGraphicsCard.price}` : '0', '21%', '0%', selectedGraphicsCard ? `$${selectedGraphicsCard.price}` : '0'],
        ['1', selectedRAM ? selectedRAM.name : 'No seleccionada', selectedRAM ? `$${selectedRAM.price}` : '0', '21%', '0%', selectedRAM ? `$${selectedRAM.price}` : '0'],
        ['1', selectedStorage ? selectedStorage.name : 'No seleccionado', selectedStorage ? `$${selectedStorage.price}` : '0', '21%', '0%', selectedStorage ? `$${selectedStorage.price}` : '0'],
        ['1', selectedPowerSupply ? selectedPowerSupply.name : 'No seleccionada', selectedPowerSupply ? `$${selectedPowerSupply.price}` : '0', '21%', '0%', selectedPowerSupply ? `$${selectedPowerSupply.price}` : '0'],
        ['1', selectedCase ? selectedCase.name : 'No seleccionado', selectedCase ? `$${selectedCase.price}` : '0', '21%', '0%', selectedCase ? `$${selectedCase.price}` : '0'],
        ['1', selectedCooler ? selectedCooler.name : 'No seleccionado', selectedCooler ? `$${selectedCooler.price}` : '0', '21%', '0%', selectedCooler ? `$${selectedCooler.price}` : '0'],
        ['1', selectedWifi ? selectedWifi.name : 'No seleccionado', selectedWifi ? `$${selectedWifi.price}` : '0', '21%', '0%', selectedWifi ? `$${selectedWifi.price}` : '0'],
        ['1', selectedMonitor ? selectedMonitor.name : 'No seleccionado', selectedMonitor ? `$${selectedMonitor.price}` : '0', '21%', '0%', selectedMonitor ? `$${selectedMonitor.price}` : '0'],
        ['1', selectedKeyboard ? selectedKeyboard.name : 'No seleccionado', selectedKeyboard ? `$${selectedKeyboard.price}` : '0', '21%', '0%', selectedKeyboard ? `$${selectedKeyboard.price}` : '0'],
        ['1', selectedMouse ? selectedMouse.name : 'No seleccionado', selectedMouse ? `$${selectedMouse.price}` : '0', '21%', '0%', selectedMouse ? `$${selectedMouse.price}` : '0'],
        ['1', selectedHeadphones ? selectedHeadphones.name : 'No seleccionado', selectedHeadphones ? `$${selectedHeadphones.price}` : '0', '21%', '0%', selectedHeadphones ? `$${selectedHeadphones.price}` : '0'],
      ],
    });

    doc.setFontSize(12);
    doc.text(`No Gravado/Exento: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Importe Total: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Son Pesos ${totalPrice} con 00/100`, 14, doc.lastAutoTable.finalY + 30);

    doc.save("presupuesto_1.pdf");
  };

  return (
    <div className="pc-builder-container container">
      <h2>Armador de PC</h2>

      {/* Mostrar todas las secciones */}
      {/* Sección de procesadores */}
      <div className="builder-section">
        <h3>Elige tu Procesador</h3>
        <select onChange={handleProcessorChange}>
          <option value="">Selecciona un procesador</option>
          {processors.map(processor => (
            <option key={processor.name} value={processor.name}>
              {processor.name} - {processor.subSubCategory} - ${processor.price}
            </option>
          ))}
        </select>
      </div>

      {/* Continuar con el resto de las secciones de componentes */}
      <button onClick={generatePDF}>Generar PDF</button>

      <div className="summary">
        <h3>Resumen de selección</h3>
        <p>Procesador: {selectedProcessor ? `${selectedProcessor.name} - ${selectedProcessor.subSubCategory} - $${selectedProcessor.price}` : 'No seleccionado'}</p>
        {/* Continuar mostrando el resto de los componentes seleccionados */}
        <h3>Total: ${totalPrice}</h3>
      </div>
    </div>
  );
}

export default PCBuilder;
