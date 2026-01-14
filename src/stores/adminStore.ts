import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const isAdminMode = ref(false)

  function toggleAdminMode() {
    isAdminMode.value = !isAdminMode.value
  }

  function setAdminMode(value: boolean) {
    isAdminMode.value = value
  }

  return {
    isAdminMode,
    toggleAdminMode,
    setAdminMode
  }
})
