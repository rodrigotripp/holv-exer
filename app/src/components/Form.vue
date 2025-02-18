<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { useRoute, useRouter } from 'vue-router'
import type { Item } from '@/types'

const props = defineProps<{
  mode: 'add' | 'edit'
}>()

const store = useInventoryStore()
const route = useRoute()
const router = useRouter()

const item = ref<Item>({
  name: '',
  quantity: 0,
  id: route.params.id,
})

onMounted(async () => {
  if (props.mode === 'edit' && route.params.id) {
    //getting the item info
    const existingItem = await store.getItemById(route.params.id as string)
    if (existingItem) {
      item.value = { ...existingItem }
    }
  }
})

const handleSubmit = async () => {
  try {
    if (props.mode === 'edit' && route.params.id) {
      await store.updateItem(route.params.id as string, item.value.quantity, item.value.name)
    } else {
      await store.addItem(item.value.name)
    }
    router.push('/')
  } catch (error) {
    console.error('Failed to save item:', error)
  }
}

const handleDelete = async () => {
  if (props.mode === 'edit' && route.params.id) {
    try {
      await store.deleteItem(route.params.id as string)
      router.push('/')
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6">
    <h2 class="text-2xl mb-6">
      {{ mode === 'add' ? 'Add New Item' : 'Edit Item' }}
    </h2>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-2" for="name"> Name </label>
      <input
        id="name"
        name="name"
        v-model="item.name"
        type="text"
        required
        class="w-full p-2 border rounded bg-white focus:bg-white"
      />
    </div>

    <div v-if="props.mode !== 'add'" class="mb-6">
      <label class="block text-sm font-medium mb-2" for="quantity"> Quantity </label>
      <input
        id="quantity"
        v-model="item.quantity"
        type="number"
        required
        min="0"
        class="w-full p-2 border rounded"
      />
    </div>

    <div class="flex gap-4 justify-between" >
      <button type="submit" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-900">
        {{ mode === 'add' ? 'Add Item' : 'Save Changes' }}
      </button>

      <button
        v-if="mode === 'edit'"
        type="button"
        @click="router.push('/')"
        class="border px-4 py-2 rounded hover:bg-gray-400 bg-gray-100"
      >
        Cancel
      </button>

      <button
        v-if="mode === 'edit'"
        type="button"
        @click="handleDelete"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Item
      </button>
    </div>
  </form>
</template>
