<template>
  <div class="jora portfolio-page">
    <Header />

    <section class="portfolio-main">
      <div class="portfolio-grid-wrapper">
        <Carousel
          class="portfolio-carousel"
          :wrap-around="true"
          :mouse-drag="true"
          :touch-drag="true"
          :breakpoints="breakpoints"
          :transition="450"
          snap-align="start"
        >
          <Slide v-for="col in projectColumns" :key="col.key">
            <div class="portfolio-col">
              <article v-if="col.top" class="portfolio-card" @click="goToProject(col.top)">
                <img :src="col.top.cover" :alt="col.top.title" draggable="false" />

                <div class="portfolio-card-overlay">
                  <div class="portfolio-card-overlay-content">
                    <div class="portfolio-card-title">{{ col.top.title }}</div>
                    <div class="portfolio-card-subtitle">{{ col.top.type }}</div>
                  </div>
                </div>
              </article>

              <article v-if="col.bottom" class="portfolio-card" @click="goToProject(col.bottom)">
                <img :src="col.bottom.cover" :alt="col.bottom.title" draggable="false" />

                <div class="portfolio-card-overlay">
                  <div class="portfolio-card-overlay-content">
                    <div class="portfolio-card-title">{{ col.bottom.title }}</div>
                    <div class="portfolio-card-subtitle">{{ col.bottom.type }}</div>
                  </div>
                </div>
              </article>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { usePortfolioProjects, type PortfolioProject } from '@/composables/usePortfolioProjects'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const { projects } = usePortfolioProjects()
const router = useRouter()

const goToProject = (project: PortfolioProject) => {
  router.push({ name: 'project', params: { slug: project.slug } })
}

// Pair projects into columns of 2: [top, bottom]
const projectColumns = computed(() => {
  const cols: Array<{ key: string; top?: PortfolioProject; bottom?: PortfolioProject }> = []
  console.log('project', projects)
  for (let i = 0; i < projects.value.length; i += 2) {
    const top = projects.value[i]
    const bottom = projects.value[i + 1]
    cols.push({
      key: `${top?.slug ?? i}-${bottom?.slug ?? 'end'}`,
      top,
      bottom,
    })
  }

  return cols
})

// Breakpoints are min-width based
const breakpoints = {
  0: { itemsToShow: 1 },
  600: { itemsToShow: 2 },
  900: { itemsToShow: 3 },
  1200: { itemsToShow: 4 }, // 8 cards + peeks (4 cols x 2 rows)
} as const
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* Fill viewport minus fixed header.
   box-sizing keeps padding inside the height. */
.portfolio-main {
  height: calc(100vh - var(--header-h) - 4rem);
  box-sizing: border-box;
  min-height: 0;
  display: flex;
  padding: 2rem 3rem 0;
}

.portfolio-grid-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.portfolio-carousel,
.portfolio-carousel :deep(.carousel__viewport),
.portfolio-carousel :deep(.carousel__track),
.portfolio-carousel :deep(.carousel__slide) {
  height: 100%;
  cursor: pointer;
}

/* Viewport: gutters + fade edges */
.portfolio-carousel :deep(.carousel__viewport) {
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 2.25rem;
  padding-right: 2.25rem;

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

/* Track: minimal padding + small nudge */
.portfolio-carousel :deep(.carousel__track) {
  padding: 0.25rem 0;
  transform: translateX(6px);
}

/* Spacing between columns (safe: use slide padding, not margins/gaps) */
.portfolio-carousel :deep(.carousel__slide) {
  padding: 0 0.75rem;
  box-sizing: border-box;
}

/* Track spacers so first/last cards don’t get clipped by viewport/mask */
.portfolio-carousel :deep(.carousel__track)::before,
.portfolio-carousel :deep(.carousel__track)::after {
  content: '';
  flex: 0 0 74px;
}

.portfolio-col {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
}

.portfolio-card {
  position: relative;
  height: 100%;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  display: flex;
}

.portfolio-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-select: none;
}

.portfolio-card-overlay {
  position: absolute;
  inset: 0;
  background: #262a36;
  opacity: 0;
  transition: opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* click still goes through */
  border-radius: 18px;
}

.portfolio-card-overlay-content {
  text-align: center;
  color: #fff;
  padding: 1rem;
  transform: translateY(6px);
  opacity: 0;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.portfolio-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.portfolio-card-subtitle {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  opacity: 0.85;
}

@media (hover: hover) {
  .portfolio-card:hover .portfolio-card-overlay {
    opacity: 1;
  }

  .portfolio-card:hover .portfolio-card-overlay-content {
    opacity: 1;
    transform: translateY(0);
  }
}

.portfolio-carousel :deep(.carousel__prev),
.portfolio-carousel :deep(.carousel__next) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
}

@media (max-width: 900px) {
  .portfolio-main {
    padding: 1.5rem;
  }
}

@media (max-width: 600px) {
  .portfolio-carousel :deep(.carousel__viewport) {
    padding-left: 1rem;
    padding-right: 1rem;

    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      black 28px,
      black calc(100% - 28px),
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0,
      black 28px,
      black calc(100% - 28px),
      transparent 100%
    );
  }

  .portfolio-carousel :deep(.carousel__slide) {
    padding: 0 0.5rem;
  }

  .portfolio-col {
    gap: 1rem;
  }

  /* smaller spacers on mobile */
  .portfolio-carousel :deep(.carousel__track)::before,
  .portfolio-carousel :deep(.carousel__track)::after {
    flex: 0 0 34px;
  }
}
</style>
