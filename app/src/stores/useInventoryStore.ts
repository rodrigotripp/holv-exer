import { type Items, type Item } from '@/types'
import { getInventory, getItemById, updateItem, addItem, deleteItem } from '@/api'
import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventoryStore', {
  state: () => ({
    items: [] as Items | undefined,
    itemsById: new Map<string | string[], Item>(), // Add cache for individual items
  }),
  actions: {
    async getInventory() {
      this.items = await getInventory()
      //cache when getting inventory
      this.items?.forEach(item => {
        this.itemsById.set(item.id, item)
      })
    },
    async getItemById(id: string) {
      //cache first
      if (this.itemsById.has(id)) {
        return this.itemsById.get(id)
      }
      
      const item = await getItemById(id)
      this.itemsById.set(id, item) 
      return item
    },
    async addItem(name: string | undefined) {
      if (name) {
        const newItem = await addItem(name)
        if (this.items) this.items = [...this.items, newItem]
        this.itemsById.set(newItem.id, newItem)
        return newItem
      }
    },
    async updateItem(id: string, quantity: number, name: string) {
      const updatedItem = await updateItem(id, quantity, name)
      if (this.items) {
        this.items = this.items.map(item => 
          item.id === id ? updatedItem : item
        )
      }
      this.itemsById.set(id, updatedItem)
      return updatedItem
    },
    async deleteItem(id: string) {
      await deleteItem(id)
      if (this.items) {
        this.items = this.items.filter(item => item.id !== id)
      }
      this.itemsById.delete(id)
    },
  },
})