// Constantes para los nombres de los meses en español
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

// Definición de las columnas para la tabla de presupuesto
export const columns = [
  { label: 'Proyecto', field: 'project', type: 'project' },
  ...months.flatMap((mes) => [
    {
      label: `${mes} Presupuestado`,
      field: `${mes.toLowerCase()}_budget`,
      value: `${mes.toLowerCase()}`,
      type: 'budget',
      currency: 'COP',
    },
    {
      label: `${mes} Real`,
      field: `${mes.toLowerCase()}_real`,
      value: `${mes.toLowerCase()}`,
      type: 'real',
      currency: 'COP',
    },
  ]),
  { label: 'Total Presupuestado (COP)', field: 'total_budget_cop', type: 'total', currency: 'COP' },
  { label: 'Total Presupuestado (USD)', field: 'total_budget_usd', type: 'total', currency: 'USD' },
  { label: 'Total Real (COP)', field: 'total_real_cop', type: 'total', currency: 'COP' },
  { label: 'Total Real (USD)', field: 'total_real_usd', type: 'total', currency: 'USD' },
]
