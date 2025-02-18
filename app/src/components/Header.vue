<script lang="ts" setup>
import { useMerchantStore } from '@/stores/useMerchantStore'
import { ref, onMounted } from 'vue'

const title = ref<string>('')
const merchant = useMerchantStore()

onMounted(async () => {
  title.value = await merchant.getMerchant()
})
</script>

<template>
  <header class="bg-[#A6CF98] shadow-sm h-16 flex justify-center items-stretch text-slate-200">
    <div v-if="title">
      <RouterLink
        class="inline-flex px-5 h-full text-sm md:text-5xl hover:bg-orange-400 items-center "
        :to="{ name: 'home' }"
      >
        {{ title }}
      </RouterLink>
    </div>
    <div v-else>Loading...</div>
  </header>
</template>
