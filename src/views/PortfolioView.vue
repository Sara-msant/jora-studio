<template>
  <PageWrapper>
    <div class="portfolio-grid-wrapper">
      <Carousel
        :key="isMobile ? 'mobile' : 'desktop'"
        class="portfolio-carousel"
        v-bind="carouselConfig"
      >
        <Slide v-for="col in displayedProjects" :key="col.key">
          <div class="portfolio-col">
            <article v-if="col.top" class="portfolio-card" @click="goToProject(col.top)">
              <img v-no-right-click :src="col.top.cover" :alt="col.top.title" draggable="false" />

              <div class="portfolio-card-overlay">
                <div class="portfolio-card-overlay-content">
                  <div class="portfolio-card-title">{{ col.top.title }}</div>
                  <div class="portfolio-card-subtitle">{{ col.top.type }}</div>
                  <div class="portfolio-card-location">{{ col.top.location }}</div>
                </div>
              </div>
            </article>

            <article v-if="col.bottom" class="portfolio-card" @click="goToProject(col.bottom)">
              <img v-no-right-click :src="col.bottom.cover" :alt="col.bottom.title" draggable="false" />

              <div class="portfolio-card-overlay">
                <div class="portfolio-card-overlay-content">
                  <div class="portfolio-card-title">{{ col.bottom.title }}</div>
                  <div class="portfolio-card-subtitle">{{ col.bottom.type }}</div>
                  <div class="portfolio-card-location">{{ col.bottom.location }}</div>
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
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageWrapper from '@/components/PageWrapper.vue'
import { usePortfolioProjects, type PortfolioProject } from '@/composables/usePortfolioProjects'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const { projects } = usePortfolioProjects()
const router = useRouter()
const isMobile = ref(window.innerWidth < 600)

const goToProject = (project: PortfolioProject) => {
  router.push({ name: 'project', params: { slug: project.slug } })
}

// All projects as individual slides (for mobile)
// Shows: 1, 2, 3, 4, 5, 6, 7, 8
const projectSlides = computed(() => {
  return projects.value.map((project) => ({
    key: project.slug,
    top: project,
    bottom: undefined,
  }))
})

// Pair projects into columns of 2 (for desktop)
// Each slide shows 2 items vertically stacked (top/bottom)
// Visual layout: 1 3 5 7
//               2 4 6 8
const projectColumns = computed(() => {
  const cols: Array<{ key: string; top?: PortfolioProject; bottom?: PortfolioProject }> = []
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

// Use individual slides on mobile, paired columns on desktop
const displayedProjects = computed(() => {
  return isMobile.value ? projectSlides.value : projectColumns.value
})

// Breakpoints are min-width based
const baseConfig = {
  wrapAround: true,
  mouseDrag: true,
  touchDrag: true,
  transition: 450,
  snapAlign: 'start',
} as const

const carouselConfig = computed(() => {
  if (isMobile.value) {
    // Mobile: simple vertical carousel, no wrapping
    return {
      ...baseConfig,
      wrapAround: false,
      dir: 'ttb' as const,
      height: '100%',
    }
  }

  // Desktop: horizontal with breakpoints, allow wrapping
  return {
    ...baseConfig,
    dir: 'ltr' as const,
    height: '100%',
    breakpoints: {
      0: { itemsToShow: 1 },
      600: { itemsToShow: 2 },
      900: { itemsToShow: 3 },
      1200: { itemsToShow: 4 },
    },
  }
})

// Listen for window resize to update orientation
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 600
  })
}
</script>

<style scoped>
/* Fill viewport minus fixed header.
   box-sizing keeps padding inside the height. */
.portfolio-grid-wrapper {
  flex: 1;
  min-height: 0;
  height: calc(100vh - var(--header-h) - 8rem);
  position: relative;
  overflow: hidden;
}

.portfolio-carousel,
.portfolio-carousel :deep(.carousel__viewport),
.portfolio-carousel :deep(.carousel__track),
.portfolio-carousel :deep(.carousel__slide) {
  height: 100%;
  cursor: pointer;
  width: 100%;
}

.portfolio-carousel :deep(.carousel__viewport) {
  overflow: hidden;
}

/* Track: minimal padding (desktop only) */
@media (min-width: 601px) {
  .portfolio-carousel :deep(.carousel__track) {
    padding: 0.25rem 0;
  }

  .portfolio-carousel :deep(.carousel__slide) {
    padding: 0 0.75rem;
    box-sizing: border-box;
  }
}

/* Mobile: no padding on slides/track for clean vertical scrolling */
@media (max-width: 600px) {
  .portfolio-carousel :deep(.carousel__track) {
    padding: 0;
  }

  .portfolio-carousel :deep(.carousel__slide) {
    padding: 1.5rem 0;
  }
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
  color: #fff;
  padding: 1rem;
  transform: translateY(6px);
  opacity: 0;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.portfolio-card-title {
  font-size: 1.5rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.portfolio-card-subtitle {
  font-size: 0.85rem;
  line-height: 0.95rem;
  opacity: 0.85;
  font-family: 'Geist Mono', monospace;
}

.portfolio-card-location {
  font-size: 0.65rem;
  line-height: 0.75rem;
  opacity: 0.85;
  font-family: 'Geist Mono', monospace;
}

.carousel.is-vertical .carousel__slide--clone:first-child {
  margin: 0;
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
  background: transparent;
  color: #323542;
  border: none;
  font-size: 2.5rem;
}

/* ===== Mobile (< 600px) ===== */
@media (max-width: 600px) {
  /* Carousel Track - let carousel handle scrolling naturally */
  .portfolio-carousel :deep(.carousel__track) {
    padding: 0;
  }

  /* Column */
  .portfolio-col {
    gap: 1rem;
    grid-template-rows: 1fr;
  }

  .portfolio-col > article:nth-child(2) {
    display: none;
  }

  /* Overlay */
  .portfolio-card-overlay {
    background: transparent;
    opacity: 1;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .portfolio-card-overlay-content {
    opacity: 1;
    transform: translateY(0);
    padding: 1rem;
  }

  /* Navigation */
  .portfolio-carousel :deep(.carousel__prev) {
    order: -1;
  }

  .portfolio-carousel :deep(.carousel__next) {
    order: 1;
  }

  /* Maintain padding while sliding or dragging */
  .portfolio-carousel.is-sliding :deep(.carousel__slide),
  .portfolio-carousel.is-dragging :deep(.carousel__slide) {
    padding: 1.5rem 0 !important;
  }
}
</style>
