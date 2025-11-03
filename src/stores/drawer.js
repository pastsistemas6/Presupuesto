// stores/drawer.js
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  // Estado inicial del store
  state: () => ({
    isExpanded: true,
  }),

  // Acciones para modificar el estado
  actions: {
    toggleDrawer() {
      this.isExpanded = !this.isExpanded
    },
  },
})
