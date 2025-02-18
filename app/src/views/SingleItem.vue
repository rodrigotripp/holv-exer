<script lang="ts" setup>
import Item from '@/components/Item.vue'
import Form from '@/components/Form.vue'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { ref, onMounted } from 'vue'
import type { Item as ItemType } from '@/types'

const props = defineProps<{ id: string }>()
const store = useInventoryStore()
const item = ref<ItemType | undefined | null>(null)

onMounted(async () => {
  item.value = await store.getItemById(props.id)
})
</script>

<template>
  <div v-if="item">
    <Item v-bind="item" />
  </div>
  <div v-else>Loading...</div>
  <Form mode="edit" />
</template>
