/* Servicios de tareas por prioridad: Contiene listas de tareas (baja, media, alta) con campos: id, descripcion, presupuestado, estado, finca, area, sub-area, empresa, tipo de unidad, fecha y grupo. También getters simples que simulan un servicio/API local. */

// Array completo con todos los datos
export const data = [
  {
    id: 1,
    fecha: '2025-03',
    empresa: 'ARANDANOS',
    finca: 'ARANDANOS',
    tipoUnidad: 'AAC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA PRODUCCION',
    subArea: 'PRODUCCION',
    descripcion: 'Cortinas Automatizadas',
    presupuestado: 5000000,
    estado: 'Pendiente',
    prioridad: 1
  },
  {
    id: 2,
    fecha: '2025-03',
    empresa: 'ARANDANOS',
    finca: 'ARANDANOS',
    tipoUnidad: 'AAC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA PRODUCCION',
    subArea: 'PRODUCCION',
    descripcion: 'Cambio de Plásticos en Invernaderos',
    presupuestado: 4500000,
    estado: 'En curso',
    prioridad: 2
  },
  {
    id: 3,
    fecha: '2025-05',
    empresa: 'FLORES',
    finca: 'ELITE',
    tipoUnidad: 'AC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA GENERAL',
    subArea: 'INFRAESTRUCTURA',
    descripcion: 'Instalación de Paneles Solares',
    presupuestado: 7000000,
    estado: 'Pendiente',
    prioridad: 1
  },
  {
    id: 4,
    fecha: '2025-01',
    empresa: 'FLORES',
    finca: 'ELITE',
    tipoUnidad: 'AC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA GENERAL',
    subArea: 'INFRAESTRUCTURA',
    descripcion: 'Mantenimiento de Riego Automatizado',
    presupuestado: 3000000,
    estado: 'En curso',
    prioridad: 3
  },
  {
    id: 5,
    fecha: '2025-03',
    empresa: 'ARANDANOS',
    finca: 'ARANDANOS',
    tipoUnidad: 'AAC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA PRODUCCION',
    subArea: 'PRODUCCION',
    descripcion: 'Construcción de Viveros Nuevos',
    presupuestado: 8000000,
    estado: 'Pendiente',
    prioridad: 1
  },
  {
    id: 6,
    fecha: '2025-10',
    empresa: 'FLORES',
    finca: 'ELITE',
    tipoUnidad: 'AC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA GENERAL',
    subArea: 'INFRAESTRUCTURA',
    descripcion: 'Mejoras en Iluminación LED',
    presupuestado: 2000000,
    estado: 'Pendiente',
    prioridad: 3
  },
  {
    id: 7,
    fecha: '2025-05',
    empresa: 'FLORES',
    finca: 'ELITE',
    tipoUnidad: 'AC',
    grupo: 'ADMINISTRACION',
    area: 'INFRAESTRUCTURA GENERAL',
    subArea: 'INFRAESTRUCTURA',
    descripcion: 'Automatización de Puertas de Invernadero',
    presupuestado: 6000000,
    estado: 'Terminado',
    prioridad: 2
  }
]

// Arrays que se llenan automáticamente basados en la prioridad
export const lowPriorityTasks = data.filter(task => task.prioridad === 3);
export const mediumPriorityTasks = data.filter(task => task.prioridad === 2);
export const highPriorityTasks = data.filter(task => task.prioridad === 1);

/* Getters públicos: Funciones que retornan las listas (simulan endpoints). */
export const getAllLow = () => lowPriorityTasks
export const getAllMedium = () => mediumPriorityTasks
export const getAllHigh = () => highPriorityTasks
export const getAllData = () => data
