<template>
  <header class="jora-header" :class="{ 'jora-white': isWhite }">
    <div class="jora-logo" @click="goHome">
      <div class="logo-main">JORA.</div>
      <div class="logo-sub">Studio</div>
      <div class="logo-tagline">Architecture & Interiors</div>
    </div>

    <button class="jora-menu" type="button" aria-label="Open menu" @click="isMenuOpen = true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>

    <HamburgerMenu v-model="isMenuOpen" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HamburgerMenu from '@/components/HamburgerMenu.vue'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    isWhite?: boolean
  }>(),
  {
    isWhite: false,
  },
)

const isMenuOpen = ref(false)

const goHome = () => {
  router.push({ name: 'welcome' })
  isMenuOpen.value = false
}
</script>

<style scoped>
.jora-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 9999;
  color: #323542;
  height: var(--header-h);
  margin: 1.5rem 2.5rem;
}

.jora-logo {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  cursor: pointer;
}

.logo-main {
  font-weight: 700;
  font-size: 2.75rem;
  line-height: 2.75rem;
}

.logo-sub {
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-family: 'Alumni Sans', sans-serif;
}

.logo-tagline {
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Alumni Sans', sans-serif;
}

.jora-menu {
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
  align-self: center;
}

.jora-menu span {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 999px;
  background-color: #323542;
}

.jora-header.jora-white {
  color: white !important;
}

.jora-header.jora-white .jora-menu span {
  background-color: white !important;
}

@media (max-width: 768px) {
  .jora-header {
    margin: 1rem 1.5rem;
  }
}
</style>
