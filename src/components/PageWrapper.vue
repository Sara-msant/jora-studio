<template>
  <div class="jora page-wrapper" :class="{ 'page-wrapper--lock-scroll': lockScroll }">
    <Header :is-white="headerIsWhite" />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { onBeforeUnmount, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    headerIsWhite?: boolean
    lockScroll?: boolean
  }>(),
  {
    headerIsWhite: false,
    lockScroll: false,
  },
)

const allowTouchSelectors = [
  '.carousel__track',
  '.carousel__viewport',
  '.carousel__slide',
  '.portfolio-carousel',
  '.project-carousel',
  '.fullscreen-carousel',
  '.accordion',
  '[data-allow-scroll]',
]

const touchMoveOptions = { passive: false } as const
let touchBlockerActive = false
let scrollY = 0

const shouldAllowTouch = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false
  return allowTouchSelectors.some((selector) => Boolean(target.closest(selector)))
}

const onTouchMove = (event: TouchEvent) => {
  if (shouldAllowTouch(event.target)) return
  event.preventDefault()
}

const setTouchBlocker = (enabled: boolean) => {
  if (typeof document === 'undefined') return
  if (enabled && !touchBlockerActive) {
    document.addEventListener('touchmove', onTouchMove, touchMoveOptions)
    touchBlockerActive = true
    return
  }

  if (!enabled && touchBlockerActive) {
    document.removeEventListener('touchmove', onTouchMove, touchMoveOptions)
    touchBlockerActive = false
  }
}

const updateScrollLock = (enabled: boolean) => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  const method = enabled ? 'add' : 'remove'
  document.body.classList[method]('lock-scroll')
  document.documentElement.classList[method]('lock-scroll')

  if (enabled) {
    scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`
    document.body.style.position = 'fixed'
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollY)
  }

  setTouchBlocker(enabled)
}

watch(
  () => props.lockScroll,
  (enabled) => updateScrollLock(enabled),
  { immediate: true },
)

onBeforeUnmount(() => updateScrollLock(false))
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.page-wrapper--lock-scroll {
  height: 100svh;
  min-height: 100svh;
  overflow: hidden;
}

:global(html.lock-scroll),
:global(body.lock-scroll) {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
}

:global(body.lock-scroll) {
  position: fixed;
  width: 100%;
}

.content {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  margin: 0 2.5rem 2.5rem 2.5rem;
}

@media (max-width: 768px) {
  .content {
    margin: 0.5rem 1.5rem;
  }
}
</style>
