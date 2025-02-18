import { defineStore } from 'pinia'
import { getMerchant } from '@/api'

export const useMerchantStore = defineStore('merchantStore', {
  state: () => ({
    merchant: '' as string | undefined,
  }),

  actions: {
    async getMerchant(): Promise<string> {
      this.merchant = await getMerchant()
      return this.merchant
    },
  },
})
