<script lang="ts" setup>
import ItemList from '@/components/ItemList.vue'
import Form from '@/components/Form.vue'
</script>

<template>
  <div class="flex flex-col justify-center bg-red-300">
    <div class="relative mx-auto py-8">
      <span class="text-slate-200 text-lg font-bold">Inventory</span>
    </div>
    <ItemList />
  </div>
  <Form mode="add" />
</template>
