import { type Items, type Item } from '@/types'
import { getInventory, getItemById, updateItem, addItem, deleteItem } from '@/api'
import { defineStore } from 'pinia'
export const useInventoryStore = defineStore('inventoryStore', {
  state: () => ({
    items: [] as Items | undefined,
  }),
  actions: {
    async getInventory() {
      this.items = await getInventory()
    },
    async getItemById(id: string) {
      const item = await getItemById(id)
      return item
    },
    async addItem(name: string | undefined) {
      if (name) {
        const newItem = await addItem(name)
        if (this.items) this.items = [...this.items, newItem]
        return newItem
      }
    },
    async updateItem(id: string, quantity: number, name: string) {
      const updatedItem = await updateItem(id, quantity, name)
      if (this.items) this.items = [...this.items, updatedItem]
      return updatedItem
    },
    async deleteItem(id: string) {
      await deleteItem(id)
    },
  },
})
