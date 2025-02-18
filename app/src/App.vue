<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-blue-100 h-full overflow-auto">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
