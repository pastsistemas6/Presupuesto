const COP_TO_USD = 4000;

export const rows = [
  {
    project: 'Cortinas Automatizadas',
    enero_budget: 5000000, enero_real: 4800000,
    febrero_budget: 5200000, febrero_real: 5000000,
    marzo_budget: 5100000, marzo_real: 4950000,
    abril_budget: 5300000, abril_real: 5200000,
    mayo_budget: 5400000, mayo_real: 5300000,
    junio_budget: 5500000, junio_real: 5400000,
    julio_budget: 5600000, julio_real: 5500000,
    agosto_budget: 5700000, agosto_real: 5600000,
    septiembre_budget: 5800000, septiembre_real: 5700000,
    octubre_budget: 5900000, octubre_real: 5800000,
    noviembre_budget: 6000000, noviembre_real: 5900000,
    diciembre_budget: 5300000, diciembre_real: 5250000,
  },
  {
    project: 'Cambio de Plásticos en Invernaderos',
    enero_budget: 4500000, enero_real: 4600000,
    febrero_budget: 4400000, febrero_real: 4350000,
    marzo_budget: 4300000, marzo_real: 4200000,
    abril_budget: 4500000, abril_real: 4400000,
    mayo_budget: 4600000, mayo_real: 4550000,
    junio_budget: 4700000, junio_real: 4650000,
    julio_budget: 4800000, julio_real: 4700000,
    agosto_budget: 4900000, agosto_real: 4800000,
    septiembre_budget: 5000000, septiembre_real: 4950000,
    octubre_budget: 5100000, octubre_real: 5050000,
    noviembre_budget: 5200000, noviembre_real: 5100000,
    diciembre_budget: 4700000, diciembre_real: 4600000,
  },
  {
    project: 'Instalación de Paneles Solares',
    enero_budget: 7000000, enero_real: 6900000,
    febrero_budget: 7100000, febrero_real: 7000000,
    marzo_budget: 7200000, marzo_real: 7100000,
    abril_budget: 7300000, abril_real: 7200000,
    mayo_budget: 7400000, mayo_real: 7300000,
    junio_budget: 7500000, junio_real: 7400000,
    julio_budget: 7600000, julio_real: 7500000,
    agosto_budget: 7700000, agosto_real: 7600000,
    septiembre_budget: 7800000, septiembre_real: 7700000,
    octubre_budget: 7900000, octubre_real: 7800000,
    noviembre_budget: 8000000, noviembre_real: 7900000,
    diciembre_budget: 7200000, diciembre_real: 7100000,
  },
  {
    project: 'Mantenimiento de Riego Automatizado',
    enero_budget: 3000000, enero_real: 2900000,
    febrero_budget: 3100000, febrero_real: 3050000,
    marzo_budget: 3200000, marzo_real: 3100000,
    abril_budget: 3300000, abril_real: 3250000,
    mayo_budget: 3400000, mayo_real: 3300000,
    junio_budget: 3500000, junio_real: 3400000,
    julio_budget: 3600000, julio_real: 3500000,
    agosto_budget: 3700000, agosto_real: 3600000,
    septiembre_budget: 3800000, septiembre_real: 3700000,
    octubre_budget: 3900000, octubre_real: 3800000,
    noviembre_budget: 4000000, noviembre_real: 3900000,
    diciembre_budget: 4100000, diciembre_real: 4000000,
  },
  {
    project: 'Construcción de Viveros Nuevos',
    enero_budget: 8000000, enero_real: 7800000,
    febrero_budget: 8200000, febrero_real: 8000000,
    marzo_budget: 8400000, marzo_real: 8200000,
    abril_budget: 8600000, abril_real: 8400000,
    mayo_budget: 8800000, mayo_real: 8600000,
    junio_budget: 9000000, junio_real: 8800000,
    julio_budget: 9200000, julio_real: 9000000,
    agosto_budget: 9400000, agosto_real: 9200000,
    septiembre_budget: 9600000, septiembre_real: 9400000,
    octubre_budget: 9800000, octubre_real: 9600000,
    noviembre_budget: 10000000, noviembre_real: 9800000,
    diciembre_budget: 9000000, diciembre_real: 8900000,
  },
  {
    project: 'Mejoras en Iluminación LED',
    enero_budget: 2000000, enero_real: 1950000,
    febrero_budget: 2100000, febrero_real: 2050000,
    marzo_budget: 2200000, marzo_real: 2150000,
    abril_budget: 2300000, abril_real: 2250000,
    mayo_budget: 2400000, mayo_real: 2350000,
    junio_budget: 2500000, junio_real: 2450000,
    julio_budget: 2600000, julio_real: 2550000,
    agosto_budget: 2700000, agosto_real: 2650000,
    septiembre_budget: 2800000, septiembre_real: 2750000,
    octubre_budget: 2900000, octubre_real: 2850000,
    noviembre_budget: 3000000, noviembre_real: 2950000,
    diciembre_budget: 3100000, diciembre_real: 3050000,
  },
  {
    project: 'Automatización de Puertas de Invernadero',
    enero_budget: 6000000, enero_real: 5900000,
    febrero_budget: 6100000, febrero_real: 6000000,
    marzo_budget: 6200000, marzo_real: 6100000,
    abril_budget: 6300000, abril_real: 6200000,
    mayo_budget: 6400000, mayo_real: 6300000,
    junio_budget: 6500000, junio_real: 6400000,
    julio_budget: 6600000, julio_real: 6500000,
    agosto_budget: 6700000, agosto_real: 6600000,
    septiembre_budget: 6800000, septiembre_real: 6700000,
    octubre_budget: 6900000, octubre_real: 6800000,
    noviembre_budget: 7000000, noviembre_real: 6900000,
    diciembre_budget: 7100000, diciembre_real: 7000000,
  },
]

// Calcular totales por fila
rows.forEach(row => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const totalBudget = months.reduce((sum, m) => sum + (row[`${m}_budget`] || 0), 0);
  const totalReal = months.reduce((sum, m) => sum + (row[`${m}_real`] || 0), 0);

  row.total_budget_cop = totalBudget;
  row.total_budget_usd = (totalBudget / COP_TO_USD);
  row.total_real_cop = totalReal;
  row.total_real_usd = (totalReal / COP_TO_USD);
});
