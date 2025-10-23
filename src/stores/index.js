import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const KEY = 'clinica-data'

export const useMainStore = defineStore('main', {
  state: () => ({
    patients: [],
    therapies: [],
    messages: [],
  }),
  actions: {
    init() {
      const saved = localStorage.getItem(KEY)
      if (saved) Object.assign(this, JSON.parse(saved))
    },
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.$state))
    },
    addTherapy(t) {
      this.therapies.push({ id: uuidv4(), ...t })
      this.persist()
    },
    deleteTherapy(id) {
      this.therapies = this.therapies.filter(t => t.id !== id)
      this.persist()
    },
  },
})
