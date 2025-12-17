<template>
  <div class="jora page-wrapper">
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}
</style>
