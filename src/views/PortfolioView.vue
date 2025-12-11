<template>
  <div class="jora portfolio-page">
    <Header />

    <section class="portfolio-main">
      <div class="portfolio-grid-wrapper">
        <!-- left gradient mask so scroll feels nicer -->
        <!-- <div class="portfolio-grid-fade-left"></div>
        <div class="portfolio-grid-fade-right"></div> -->

        <button
          class="portfolio-arrow portfolio-arrow-left"
          type="button"
          aria-label="Scroll left"
          @click="scroll(-1)"
        >
          ‹
        </button>

        <div
          ref="carouselEl"
          class="portfolio-grid"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @mouseleave="onPointerUp"
        >
          <article
            v-for="project in projects"
            :key="project.slug"
            class="portfolio-card"
            @click="onCardClick(project)"
          >
            <img :src="project.cover" :alt="project.title" draggable="false" />
          </article>
        </div>

        <button
          class="portfolio-arrow portfolio-arrow-right"
          type="button"
          aria-label="Scroll right"
          @click="scroll(1)"
        >
          ›
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioProjects, type PortfolioProject } from '@/composables/usePortfolioProjects'
import Header from '@/components/Header.vue'

const { projects } = usePortfolioProjects()
const carouselEl = ref<HTMLDivElement | null>(null)
const router = useRouter()

// --- ARROW SCROLL, WITH LOOPING ---
const scroll = (direction: 1 | -1) => {
  const el = carouselEl.value
  if (!el) return

  const card = el.querySelector<HTMLElement>('.portfolio-card')
  if (!card) return

  const cardWidth = card.offsetWidth
  const gap = 24
  const amount = (cardWidth + gap) * 3 * direction

  el.scrollBy({
    left: amount,
    behavior: 'smooth',
  })
}

// --- DRAG / SWIPE SCROLLING ---
const isPointerDown = ref(false)
const dragStartX = ref(0)
const dragStartScrollLeft = ref(0)
const dragMoved = ref(false)

const onPointerDown = (e: PointerEvent) => {
  const el = carouselEl.value
  if (!el) return

  isPointerDown.value = true
  dragMoved.value = false
  dragStartX.value = e.clientX
  dragStartScrollLeft.value = el.scrollLeft
}

const onPointerMove = (e: PointerEvent) => {
  if (!isPointerDown.value) return
  const el = carouselEl.value
  if (!el) return

  const dx = e.clientX - dragStartX.value

  // once the move is "real", mark as drag and prevent selection
  if (Math.abs(dx) > 5) {
    dragMoved.value = true
    e.preventDefault()
  }

  el.scrollLeft = dragStartScrollLeft.value - dx
}

const onPointerUp = () => {
  isPointerDown.value = false
}

// avoid opening a project when it was actually a drag
const onCardClick = (project: PortfolioProject) => {
  // if there was dragging, don't treat it as a click
  if (dragMoved.value) return
  router.push({ name: 'project', params: { slug: project.slug } })
}
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* main area with some margin around */
.portfolio-main {
  padding: 2rem 3rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.portfolio-label {
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b0b0b0;
  margin-bottom: 1rem;
}

/* carousel/grid wrapper */
.portfolio-grid-wrapper {
  position: relative;
  overflow: hidden; /* important so scrollbars/etc don’t bleed out */
  height: 100%;
}

.portfolio-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 1fr);
  grid-template-rows: repeat(2, 1fr); /* each row fills half the height */
  height: 100%; /* expand to parent wrapper */
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.25rem 1.5rem;
  cursor: grab;
  position: relative; /* make it a stacking context */
  z-index: 0;

  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black 40px,
    black calc(100% - 40px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 40px,
    black calc(100% - 40px),
    transparent 100%
  );
}

/* nicer scrolling on touch devices */
.portfolio-grid {
  scroll-snap-type: x mandatory;
}

.portfolio-grid:active {
  cursor: grabbing;
}

.portfolio-card {
  scroll-snap-align: start;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  display: flex;
}

.portfolio-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* arrows */
.portfolio-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.portfolio-arrow-left {
  left: 0.25rem;
}

.portfolio-arrow-right {
  right: 0.25rem;
}

.portfolio-grid,
.portfolio-card,
.portfolio-card img {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

@media (max-width: 900px) {
  .portfolio-main {
    padding: 1.5rem;
  }

  .portfolio-footer {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .portfolio-footer-center {
    text-align: left;
  }
}

/* Hide scrollbar — Chrome, Safari, Edge */
.portfolio-grid::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar — Firefox */
.portfolio-grid {
  scrollbar-width: none;
}

/* Hide scrollbar — IE/Edge Legacy */
.portfolio-grid {
  -ms-overflow-style: none;
}
</style>
