<script lang="ts" setup>
import Item from './Item.vue'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { onMounted } from 'vue'

const inventory = useInventoryStore()
onMounted(() => inventory.getInventory())
</script>

<template>
  <div class="flex flex-wrap justify-center py-3 gap-2 mb-16">
    <RouterLink
      class="w-[230px]"
      v-for="item in inventory.items"
      :key="item.name"
      :to="{ name: 'byId', params: { id: item.id } }"
    >
      <Item v-bind="item" />
    </RouterLink>
  </div>
</template>
