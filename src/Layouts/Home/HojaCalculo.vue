<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg cursor-default">
    <!-- Título principal -->
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Resumen de proyectos</h2>

    <!-- Línea divisoria decorativa -->
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <!-- Contenido principal -->
    <div class="w-full flex flex-col px-6">
      <!-- Componente de filtros múltiples -->
      <MultiFilters :rows="originalRows" @filter="handleFilter" layout="other"/>

      <!-- Grid de tarjetas KPI -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Tarjeta de total de proyectos -->
        <KpiCard
          class="bg-gray-100!"
          title="Total Proyectos"
          :value="totalprojects + ' proyectos'"
          type="info"
        />
        <!-- Tarjeta de presupuesto total -->
        <KpiCard
          class="bg-blue-100!"
          title="Presupuesto Total (COP)"
          :value="
            totalbudget.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          "
          type="success"
        />
        <!-- Tarjeta de ejecución real -->
        <KpiCard
          class="bg-green-100!"
          title="Ejecutado Real (COP)"
          :value="
            totalreal.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          "
          type="danger"
        />
      </div>

      <!-- Tabla de datos con manejo de actualización de presupuesto -->
      <DataTable
        :columns="columns"
        :rows="rows"
        @update:budget="handleBudgetUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import DataTable from '@/components/Utils/DataTable.vue'
import MultiFilters from '@/components/Utils/MultiFilters.vue'
import KpiCard from '@/components/Home/KpiCard.vue'
import { rows as originalRows } from '@/Services/rows'
import { onMounted, ref, computed } from 'vue'

// Estados reactivos para almacenar datos y cálculos
const rows = ref([...originalRows])
const visibleColumns = ref([])
const totalprojects = ref(0)
const totalbudget = ref(0)
const totalreal = ref(0)

// Array con todos los meses del año
const allMonths = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

// Columnas base que siempre están visibles
const baseColumns = [{ label: 'Proyecto', field: 'project' }]

// Columnas para mostrar los totales en diferentes monedas
const totalsColumns = [
  { label: 'Total Presupuestado (COP)', field: 'total_budget_cop', type: 'total', currency: 'COP' },
  { label: 'Total Presupuestado (USD)', field: 'total_budget_usd', type: 'total', currency: 'USD' },
  { label: 'Total Real (COP)', field: 'total_real_cop', type: 'total', currency: 'COP' },
  { label: 'Total Real (USD)', field: 'total_real_usd', type: 'total', currency: 'USD' },
]

// Computed property que genera dinámicamente las columnas a mostrar
const columns = computed(() => {
  // Si no hay columnas visibles seleccionadas, mostrar todas
  if (!visibleColumns.value.length) {
    return [
      ...baseColumns,
      ...allMonths.flatMap((month) => [
        {
          label: `${capitalize(month)} Presupuestado`,
          field: `${month}_budget`,
          value: `${month}`,
          type: 'budget',
          currency: 'COP',
        },
        {
          label: `${capitalize(month)} Real`,
          field: `${month}_real`,
          value: `${month}`,
          type: 'real',
          currency: 'COP',
        },
      ]),
      ...totalsColumns,
    ]
  }

  // Generar columnas solo para los meses visibles seleccionados
  const filteredMonthCols = visibleColumns.value.flatMap((month) => [
    {
      label: `${capitalize(month)} Presupuestado`,
      field: `${month}_budget`,
      value: `${month}`,
      type: 'budget',
      currency: 'COP',
    },
    {
      label: `${capitalize(month)} Real`,
      field: `${month}_real`,
      value: `${month}`,
      type: 'real',
      currency: 'COP',
    },
  ])

  return [...baseColumns, ...filteredMonthCols, ...totalsColumns]
})

// Función para manejar la actualización del presupuesto
const handleBudgetUpdate = ({ project, month, field, newBudget }) => {
  // Encontrar la fila del proyecto
  const rowIndex = rows.value.findIndex(row => row.project === project)

  if (rowIndex !== -1) {
    // Actualizar el presupuesto en la fila específica
    rows.value[rowIndex][field] = newBudget

    // Recalcular los totales para el proyecto actualizado
    const activeMonths = visibleColumns.value.length ? visibleColumns.value : allMonths
    rows.value = calculateTotals(rows.value, activeMonths)
  }
}

// Función para calcular totales de presupuesto y ejecución real
const calculateTotals = (data, months) => {
  let totalBudget = 0
  let totalReal = 0

  // Procesar cada fila de datos
  const result = data.map((row) => {
    const budget = months.reduce((sum, m) => sum + (row[`${m}_budget`] || 0), 0)
    const real = months.reduce((sum, m) => sum + (row[`${m}_real`] || 0), 0)

    totalBudget += budget
    totalReal += real

    return {
      ...row,
      total_budget_cop: budget,
      total_budget_usd: budget / 4000, // Conversión a USD
      total_real_cop: real,
      total_real_usd: real / 4000, // Conversión a USD
    }
  })

  // Actualizar los estados reactivos con los totales calculados
  totalbudget.value = totalBudget
  totalreal.value = totalReal
  totalprojects.value = result.length

  return result
}

// Manejador de eventos de filtrado
const handleFilter = ({ projects, months }) => {
  visibleColumns.value = months

  let filtered = [...originalRows]

  // Aplicar filtro por proyectos si hay selección
  if (projects.length) {
    filtered = filtered.filter((row) => projects.includes(row.project))
  }

  // Determinar meses activos (seleccionados o todos)
  const activeMonths = months.length ? months : allMonths

  // Recalcular datos con los filtros aplicados
  rows.value = calculateTotals(filtered, activeMonths)
}

// Inicialización al montar el componente
onMounted(() => {
  visibleColumns.value = [...allMonths] // Mostrar todos los meses inicialmente
  rows.value = calculateTotals(originalRows, allMonths)
})

// Función utilitaria para capitalizar strings
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
</script>
