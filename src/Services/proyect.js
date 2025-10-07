export const lowPriorityTasks = [
  {
    id: 1,
    text: 'Instalación de cortinas de invernadero',
    presupuestado: 8500000,
    estado: 'Pendiente',
  },
  {
    id: 2,
    text: 'Mantenimiento de sistema de riego por goteo',
    presupuestado: 3500000,
    estado: 'En curso',
  },
  {
    id: 3,
    text: 'Limpieza y fumigación de invernaderos',
    presupuestado: 1200000,
    estado: 'Pendiente',
  },
]

export const mediumPriorityTasks = [
  {
    id: 4,
    text: 'Optimización de fertilización automatizada',
    presupuestado: 6200000,
    estado: 'En curso',
  },
  {
    id: 5,
    text: 'Reparación de estructuras metálicas',
    presupuestado: 2800000,
    estado: 'Pendiente',
  },
]

export const highPriorityTasks = [
  {
    id: 6,
    text: 'Exportación de lotes florales a Holanda',
    presupuestado: 15000000,
    estado: 'En curso',
  },
  {
    id: 7,
    text: 'Control sanitario post-cosecha',
    presupuestado: 9300000,
    estado: 'Pendiente',
  },
]

export const getAllLow = () => lowPriorityTasks
export const getAllMedium = () => mediumPriorityTasks
export const getAllHigh = () => highPriorityTasks
