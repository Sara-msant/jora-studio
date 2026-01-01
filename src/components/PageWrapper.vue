<template>
  <div class="jora page-wrapper">
    <Header />
    <main class="content">
      <slot />
    </main>
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

.content {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  margin: 2.5rem 2.5rem;
}

@media (max-width: 768px) {
  .content {
    margin: 0.5rem 1.5rem;
  }
}
</style>
