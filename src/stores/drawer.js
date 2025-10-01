// stores/drawer.js
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    isExpanded: true,
  }),
  actions: {
    toggleDrawer() {
      this.isExpanded = !this.isExpanded
    },
  },
})
