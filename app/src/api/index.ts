import type { Item, Items } from '../types'

const _api_ = import.meta.env.VITE_APP_HOLVI_API

export const getMerchant = async (): Promise<string> => {
  try {
    const response = await fetch(`${_api_}/merchant-name/`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Failed to fetch merchant:', error)
    throw error
  }
}

export const getInventory = async (): Promise<Items> => {
  try {
    const response = await fetch(`${_api_}/inventory/`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    throw error
  }
}

export const addItem = async (name: string): Promise<Item> => {
  const formdata = new FormData()
  formdata.append('name', name)
  try {
    const response = await fetch(`${_api_}/inventory/`, {
      method: 'POST',
      redirect: 'follow',
      body: formdata,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    throw error
  }
}

export const getItemById = async (id: string): Promise<Item> => {
  try {
    const response = await fetch(`${_api_}/inventory/${id}/`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch item ${id}:`, error)
    throw error
  }
}

export const updateItem = async (id: string, quantity: number, name: string): Promise<Item> => {
  const formdata = new FormData()
  formdata.append('id', id)
  formdata.append('quantity', quantity.toString())
  formdata.append('name', name)
  console.log('updateItem', { id, name, quantity })
  try {
    const response = await fetch(`${_api_}/inventory/${id}/`, {
      method: 'PATCH',
      redirect: 'follow',
      body: formdata,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to update item ${id}:`, error)
    throw error
  }
}

export const deleteItem = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${_api_}/inventory/${id}/`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error(`Failed to delete item ${id}:`, error)
    throw error
  }
}
