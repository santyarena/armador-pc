import React, { useState } from 'react';
import jsPDF from 'jspdf';  // Importamos jsPDF
import 'jspdf-autotable';  // Importamos autoTable para la tabla en PDF

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

  // Lógica de compatibilidad en Procesadores y Motherboards
  const handleProcessorChange = (e) => {
    const selected = processors.find(proc => proc.name === e.target.value);
    setSelectedProcessor(selected);

    // Verificar compatibilidad con la motherboard seleccionada
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

    // Verificar compatibilidad con el procesador seleccionado
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

  // Función para generar el PDF con autoTable
  const generatePDF = () => {
    const doc = new jsPDF();

    // Encabezado del presupuesto
    doc.setFontSize(12);
    doc.text("Presupuesto #1", 14, 15);
    doc.text("Fecha: 05/10/2024", 150, 15);
    doc.text("Nombre de Empresa", 14, 25);
    doc.text("Av. Tte Donato Alvarez 1526, La Paternal, Ciudad de Buenos Aires", 14, 30);
    doc.text("Tel.: 911-40859342", 14, 35);
    doc.text("CUIT: 23223648029", 14, 40);

    // Tabla de productos seleccionados
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
      ],
    });

    // Totales
    doc.setFontSize(12);
    doc.text(`No Gravado/Exento: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Importe Total: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Son Pesos ${totalPrice} con 00/100`, 14, doc.lastAutoTable.finalY + 30);

    // Guardar el PDF con el nombre del presupuesto
    doc.save("presupuesto_1.pdf");
  };
};  