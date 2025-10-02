export const lowPriorityTasks = [
  { id: 1, text: 'Proyecto 1', costo: 12000000 },
  { id: 2, text: 'Proyecto 2', costo: 1400000 },
  { id: 7, text: 'Proyecto 7', costo: 5400000 },
  { id: 8, text: 'Proyecto 8', costo: 600000 },
]

export const mediumPriorityTasks = [
  { id: 3, text: 'Proyecto 3' },
  { id: 4, text: 'Proyecto 4', costo: 8050000 },
]

export const highPriorityTasks = [
  { id: 5, text: 'Proyecto 5', costo: 72300000 },
  { id: 6, text: 'Proyecto 6', costo: 4900000 },
]

export const getAllLow = () => {
  return lowPriorityTasks
}

export const getAllMedium = () => {
  return mediumPriorityTasks
}

export const getAllHigh = () => {
  return highPriorityTasks
}
