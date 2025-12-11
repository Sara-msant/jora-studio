<template>
  <transition name="jora-menu-fade">
    <div v-if="modelValue" class="jora-menu-overlay" @click.self="close">
      <div class="jora-menu">
        <div class="jora-menu-inner">
          <!-- Header -->
          <header class="jora-menu-header">
            <div class="jora-menu-lang-wrapper">
              <button class="lang-toggle" @click="langOpen = !langOpen">
                <span>{{ currentLocaleLabel }}</span>
                <v-icon size="18">mdi-menu-down</v-icon>
              </button>

              <ul v-if="langOpen" class="lang-list">
                <li
                  v-for="lang in languages"
                  :key="lang"
                  :class="{ active: lang === locale }"
                  @click="setLang(lang)"
                >
                  {{ lang.toUpperCase() }}
                </li>
              </ul>
            </div>

            <button class="menu-close" @click="close">✕</button>
          </header>

          <!-- Navigation -->
          <nav class="jora-menu-nav">
            <button v-for="item in items" :key="item.key" class="nav-link" @click="go(item)">
              {{ t(item.labelKey) }}
            </button>
          </nav>

          <!-- Social -->
          <footer class="jora-menu-footer">
            <a href="#" class="social-link"><v-icon>mdi-facebook</v-icon></a>
            <a href="#" class="social-link"><v-icon>mdi-instagram</v-icon></a>
            <a href="#" class="social-link"><v-icon>mdi-twitter</v-icon></a>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const menuOpen = defineModel<boolean>()

const router = useRouter()
const { t, locale } = useI18n()

const langOpen = ref(false)

const languages = ['en', 'fr', 'pt']

const items = [
  { key: 'portfolio', labelKey: 'nav.portfolio', to: '/portfolio' },
  { key: 'services', labelKey: 'nav.services', to: '/services' },
  { key: 'studio', labelKey: 'nav.studio', to: '/studio' },
  { key: 'partnerships', labelKey: 'nav.partnerships', to: '/partnerships' },
  { key: 'designLab', labelKey: 'nav.designLab', to: '/design-lab' },
  { key: 'contact', labelKey: 'nav.contact', to: '/contact' },
]

const currentLocaleLabel = computed(() => locale.value.toUpperCase())

const close = () => {
  langOpen.value = false
  menuOpen.value = false
}

const setLang = (lang: string) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
  langOpen.value = false
}

const go = (item: { to?: string }) => {
  if (item.to) router.push(item.to)
  close()
}
</script>

<style scoped>
/* Overlay */
.jora-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1.5rem 3rem;
}

/* Menu card */
.jora-menu {
  background: #ffe65b;
  border-radius: 24px;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.25);

  width: clamp(260px, 28vw, 340px);
  margin-top: 2.2rem;

  pointer-events: auto;
}

.jora-menu-inner {
  padding: 1.9rem 2.6rem 1.7rem;
  color: #333;
}

/* Fade animation */
.jora-menu-fade-enter-active,
.jora-menu-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.jora-menu-fade-enter-from,
.jora-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Header */
.jora-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.lang-toggle,
.menu-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1rem;
}

/* Lang dropdown */
.jora-menu-lang-wrapper {
  position: relative;
}

.lang-list {
  position: absolute;
  top: 130%;
  background: #fff9c7;
  padding: 0.35rem 0.55rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.lang-list li {
  padding: 0.2rem 0.45rem;
  cursor: pointer;
}

.lang-list li.active,
.lang-list li:hover {
  background: rgba(0, 0, 0, 0.06);
}

/* Nav links */
.jora-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.5rem;
}

.nav-link {
  background: transparent;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.1rem 0;
  color: #333;
}

.nav-link:hover {
  font-weight: 600;
  text-decoration: underline;
}

/* Footer */
.jora-menu-footer {
  display: flex;
  gap: 0.9rem;
}

.social-link {
  color: #222;
  font-size: 1.3rem;
}
</style>
