<script lang="ts" setup>
import { type Item } from '@/types'
const { name, id, quantity } = defineProps<Item>()
</script>

<template>
  <n-card :title="name" hoverable>
    ID: {{ id }}
    <br />
    Quantity: {{ quantity }}
  </n-card>
</template>
