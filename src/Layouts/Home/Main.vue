<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg">
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386] mb-4">Resumen de presupuesto</h2>
    <p class="w-full px-8 pr-20 mb-8">
      Elite Flower es una empresa líder en la industria de las flores, dedicada a la producción y exportación de flores de alta calidad. Este sistema de presupuestos permite gestionar y hacer seguimiento a los recursos financieros de los proyectos, facilitando el control del presupuesto estimado, ejecutado y real en todas las fincas.
    </p>

    <div class="w-full h-full px-6 flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Proyectos" :value="8 + ' creados'" type="info" />
        <KpiCard title="Presupuesto Total (COP)" :value="'$150,000,000'" type="success" />
        <KpiCard title="Ejecutado Real (COP)" :value="'$132,000,000'" type="danger" />
        <KpiCard title="Total Proyectos" :value="6 + ' en ejecución'" type="info" />
        <KpiCard title="Presupuesto Total (USD)" :value="'USD 38.580'" type="success" />
        <KpiCard title="Ejecutado Real (USD)" :value="'USD 33.950'" type="danger" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PrioritySummary title="Prioridad baja" :count="3" type="low" />
        <PrioritySummary title="Prioridad media" :count="1" type="medium" />
        <PrioritySummary title="Prioridad alta" :count="2" type="high" />
      </div>

      <ProjectTable title="Proyectos más costosos" :projects="topProjects" />
    </div>

  </div>
</template>

<script setup>
import KpiCard from '@/components/Home/KpiCard.vue'
import PrioritySummary from '@/components/Home/PrioritySummary.vue'
import ProjectTable from '@/components/Home/ProjectTable.vue'

const topProjects = [
  { nombre: 'Proyecto 5', prioridad: 'ALTA', presupuesto: 72300000 },
  { nombre: 'Proyecto 6', prioridad: 'ALTA', presupuesto: 4900000 },
]
</script>
