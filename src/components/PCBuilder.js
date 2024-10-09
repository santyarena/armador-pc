
import React, { useState, useEffect } from 'react';
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [budgetNumber, setBudgetNumber] = useState(1);  // Número de presupuesto
  const [budgetHistory, setBudgetHistory] = useState([]); // Historial de presupuestos

  // Cargar el número de presupuesto desde localStorage al cargar la página
  useEffect(() => {
    const savedBudgetNumber = localStorage.getItem('budgetNumber');
    if (savedBudgetNumber) {
      setBudgetNumber(Number(savedBudgetNumber));
    }

    // Cargar historial desde localStorage
    const savedHistory = localStorage.getItem('budgetHistory');
    if (savedHistory) {
      setBudgetHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Actualizar el número de presupuesto en localStorage
  const updateBudgetNumber = () => {
    const newBudgetNumber = budgetNumber + 1;
    setBudgetNumber(newBudgetNumber);
    localStorage.setItem('budgetNumber', newBudgetNumber);
  };

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

  // Función para generar el PDF con el número de presupuesto
  const generatePDF = () => {
    const doc = new jsPDF();

    // Encabezado del presupuesto
    doc.setFontSize(12);
    doc.text(`Presupuesto #${budgetNumber}`, 14, 15);
    doc.text("Fecha: 05/10/2024", 150, 15);
    doc.text("Nombre de Empresa", 14, 25);
    doc.text("Av. Tte Donato Alvarez 1526, La Paternal, Ciudad de Buenos Aires", 14, 30);
    doc.text("Tel.: 911-40859342", 14, 35);
    doc.text("CUIT: 23223648029", 14, 40);

    // Tabla de productos
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
    doc.save(`presupuesto_${budgetNumber}.pdf`);

    // Guardar el presupuesto en el historial
    const newBudget = {
      number: budgetNumber,
      processor: selectedProcessor ? selectedProcessor.name : 'No seleccionado',
      motherboard: selectedMotherboard ? selectedMotherboard.name : 'No seleccionada',
      graphicsCard: selectedGraphicsCard ? selectedGraphicsCard.name : 'No seleccionada',
      totalPrice: totalPrice
    };
    const updatedHistory = [...budgetHistory, newBudget];
    setBudgetHistory(updatedHistory);
    localStorage.setItem('budgetHistory', JSON.stringify(updatedHistory));

    // Actualizar el número de presupuesto
    updateBudgetNumber();
  };

  return (
    <div className="pc-builder-container container">
      <h2>Armador de PC</h2>

      {/* Selección de productos */}
      {/* Procesador */}
      <div className="builder-section">
        <h3>Elige tu Procesador</h3>
        <select onChange={(e) => setSelectedProcessor(products.find(p => p.name === e.target.value))}>
          <option value="">Selecciona un procesador</option>
          {products.filter(p => p.category === 'Procesador').map(p => (
            <option key={p.name} value={p.name}>{p.name} - ${p.price}</option>
          ))}
        </select>
      </div>

      {/* Similar para otros componentes... */}

      {/* Botón para generar el PDF */}
      <button onClick={generatePDF}>Generar PDF</button>

      {/* Mostrar resumen de selección */}
      <div className="summary">
        <h3>Resumen de selección</h3>
        <p>Procesador: {selectedProcessor ? `${selectedProcessor.name} - $${selectedProcessor.price}` : 'No seleccionado'}</p>
        {/* Similar para otros componentes... */}
        <h3>Total: ${totalPrice}</h3>
      </div>

      {/* Mostrar historial de presupuestos */}
      <div className="budget-history">
        <h3>Historial de Presupuestos</h3>
        <ul>
          {budgetHistory.map((budget) => (
            <li key={budget.number}>
              <strong>Presupuesto #{budget.number}</strong> - Procesador: {budget.processor}, Total: ${budget.totalPrice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PCBuilder;
