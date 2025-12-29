<template>
  <PageWrapper>
    <main class="services-main">
      <section class="steps">
        <div class="accordion">
          <div
            class="accordion-item"
            v-for="(step, i) in steps"
            :key="i"
            :class="{ open: openIndices.includes(i) }"
          >
            <button
              class="accordion-header"
              type="button"
              :aria-expanded="openIndices.includes(i)"
              @click="toggle(i)"
            >
              <div class="step-title">{{ step.title }}</div>
              <svg
                class="chev"
                width="14"
                height="10"
                viewBox="0 0 12 8"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M6 8L0.803848 0.5L11.1962 0.5L6 8Z" fill="currentColor" />
              </svg>
            </button>

            <div class="accordion-body">
              <div class="panel-content">
                {{ step.content }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside class="highlight">
        <div class="card">
          <div class="card-text">Trust<br />The<br />Process.</div>
        </div>
      </aside>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageWrapper from '@/components/PageWrapper.vue'

const { locale } = useI18n()

const modules = import.meta.glob('../assets/services/*/*.json', { eager: true })
const steps = computed(() => {
  const stepsByNum: Map<string, any> = new Map()

  Object.entries(modules).forEach(([path, mod]) => {
    const parts = path.split('/')
    const lang = parts[parts.length - 2] // pt, fr, en
    const file = parts[parts.length - 1] // 01.json
    const num = file.replace('.json', '') // 01

    if (!stepsByNum.has(num)) stepsByNum.set(num, {})
    const step = stepsByNum.get(num)!
    step[lang] = (mod as any).default ?? mod
  })

  const nums = Array.from(stepsByNum.keys()).sort()
  return nums.map((num) => {
    const step = stepsByNum.get(num)!
    return step[locale.value] || step.en || step.pt || step.fr
  })
})

const openIndices = ref<number[]>([0])

const toggle = (i: number) => {
  if (openIndices.value.includes(i)) {
    openIndices.value = openIndices.value.filter((idx) => idx !== i)
  } else {
    openIndices.value.push(i)
  }
}
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--page-bg, #f5f5f5);
}

.services-main {
  height: calc(100vh - var(--header-h) - 8rem);
  box-sizing: border-box;
  min-height: 0;
  display: flex;
  gap: 4rem;
  padding: 4rem 6rem;
  align-items: flex-start;
}

.steps {
  flex: 0 0 55%;
  height: 100%;
}

.step {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-size: 1.4rem;
  color: #323542;
  margin-bottom: 0.6rem;
}

.step-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-line span {
  height: 2px;
  background: #cfcfd1;
  flex: 1 1 auto;
}

.step-arrow {
  background: transparent;
  border: none;
  color: #323542;
  padding: 0 0 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.highlight {
  flex: 0 0 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}

/* Vuetify expansion overrides to match design */
/* Accordion (replacement for the Vuetify panels) */
.accordion {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.accordion-item {
  border-bottom: 2px solid transparent;
  padding-right: 20px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  border-bottom: 2px solid #cfcfd1;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  text-align: left;
}

.accordion-header:focus {
  outline: none;
}

.chev {
  transition: transform 0.25s ease;
  color: #323542;
}

.accordion-item.open .chev {
  transform: rotate(180deg);
}

.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.32s ease,
    padding 0.32s ease;
  padding: 0 0.75rem;
}

.accordion-item.open .accordion-body {
  max-height: 1000px;
  padding-top: 0.75rem;
}

.panel-content {
  color: #323542;
  font-size: 0.95rem;
  line-height: 1.4;
  max-width: 60ch;
  font-family: 'Geist Mono', monospace;
}

.card {
  padding: 30px 100px;
  background: #76c1ff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
}

.card-text {
  font-size: 3rem;
  color: #323542;
  text-align: center;
  line-height: 0.95;
}

@media (max-width: 980px) {
  .services-main {
    flex-direction: column;
    padding: 2rem;
  }

  .highlight {
    align-self: flex-end;
    display: flex;
  }

  .card {
    width: 220px;
    height: 220px;
  }

  .card-text {
    font-size: 2rem;
  }
}
</style>
