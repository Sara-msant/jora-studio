<template>
  <div class="jora portfolio-page">
    <Header />

    <section v-if="project" class="project-main">
      <div class="project-layout">
        <!-- LEFT: info card -->
        <aside class="project-info">
          <div>
            <div class="project-header-row">
              <h1 class="project-title">{{ project.title }}.</h1>
              <div class="project-type">{{ project.type }}</div>
            </div>

            <hr class="project-divider" />

            <div class="project-meta">
              <!-- row 1 -->
              <div v-if="project.location" class="meta-label">Project Location:</div>
              <div v-if="project.location" class="meta-value">{{ project.location }}</div>

              <div v-if="project.status" class="meta-label">Status:</div>
              <div v-if="project.status" class="meta-value">{{ project.status }}</div>

              <!-- row 2 -->
              <div v-if="project.area" class="meta-label">Project Area:</div>
              <div v-if="project.area" class="meta-value">{{ project.area }}</div>

              <div v-if="project.year" class="meta-label">Year:</div>
              <div v-if="project.year" class="meta-value">{{ project.year }}</div>
            </div>
          </div>

          <p class="project-description">
            {{ project.description }}
          </p>
        </aside>

        <!-- RIGHT: vue3-carousel gallery -->
        <section class="project-gallery-wrapper">
          <Carousel
            class="project-carousel"
            :items-to-show="1.4"
            snap-align="center"
            :wrap-around="true"
            :mouse-drag="true"
            :touch-drag="true"
          >
            <!-- expose currentSlide so we can style neighbors differently -->
            <template #default="{ currentSlide }">
              <Slide v-for="(img, index) in project.gallery" :key="index">
                <figure
                  class="project-image-card"
                  :class="slideClass(index, currentSlide)"
                  @click="openFullscreen(index)"
                >
                  <img
                    :src="img"
                    :alt="project.title + ' image ' + (index + 1)"
                    draggable="false"
                  />
                </figure>
              </Slide>
            </template>
          </Carousel>

          <!-- FULLSCREEN OVERLAY -->
          <div v-if="isFullscreen" class="fullscreen-overlay" @click.self="closeFullscreen">
            <!-- close button -->
            <button class="fullscreen-close" @click="closeFullscreen">×</button>

            <!-- fullscreen image -->
            <img
              class="fullscreen-image"
              :src="project.gallery[fullscreenIndex]"
              :alt="'Image ' + (fullscreenIndex + 1)"
            />
          </div>

          <button v-if="nextSlug" class="project-next" type="button" @click="goToNext">
            Next →
          </button>
        </section>
      </div>
    </section>

    <section v-else class="project-not-found">
      <p>Project not found.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { usePortfolioProjects } from '@/composables/usePortfolioProjects'

const route = useRoute()
const router = useRouter()
const { getProjectBySlug, getNextProjectSlug } = usePortfolioProjects()

const isFullscreen = ref(false)
const fullscreenIndex = ref(0)

const slug = computed(() => route.params.slug as string)
const project = computed(() => getProjectBySlug(slug.value) ?? null)
const nextSlug = computed(() => getNextProjectSlug(slug.value))

const goToNext = () => {
  if (!nextSlug.value) return
  router.push({ name: 'project', params: { slug: nextSlug.value } })
}

const slideClass = (index: number, current: number) => {
  if (index === current) return 'is-center'
  if (index === current - 1) return 'is-left'
  if (index === current + 1) return 'is-right'
  return 'is-far'
}

const openFullscreen = (index: number) => {
  fullscreenIndex.value = index
  isFullscreen.value = true
}

const closeFullscreen = () => {
  isFullscreen.value = false
}
</script>

<style scoped>
/* main area under header */
.project-main {
  padding: 2rem 3rem;
  min-height: calc(100vh - 120px); /* adjust if header height differs */
  box-sizing: border-box;
}

/* 30% left, 70% right */
.project-layout {
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  gap: 3rem;
  align-items: stretch;
  min-height: 100%;
}

/* LEFT: yellow info card */
.project-info {
  background: #fff476; /* or #ffe65b if you prefer */
  border-radius: 24px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.project-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.project-type {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.project-divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  margin: 1.5rem 0;
}

.project-meta {
  display: grid;
  grid-template-columns: auto 1fr auto auto; /* label | value | label | value */
  column-gap: 1.5rem;
  row-gap: 0.35rem;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

.meta-label {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  font-weight: 700;
}

.meta-value {
  font-weight: 500;
}

.project-description {
  font-size: 0.85rem;
  line-height: 1.7;
  white-space: pre-line; /* preserve \n from JSON as real line breaks */
}

/* RIGHT: gallery column */
.project-gallery-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0; /* important for flex children */
}

/* vue3-carousel root takes the vertical space */
.project-carousel {
  flex: 1;
  min-height: 0;
}

/* keep slides inside the column */
:deep(.carousel__viewport) {
  overflow: hidden;
  height: 100%;
}

/* base slide card */
.project-image-card {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.4s ease,
    opacity 0.4s ease,
    filter 0.4s ease;
  transform-origin: center center;
}

/* image fills the card */
.project-image-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* center slide: big and fully opaque */
.project-image-card.is-center {
  transform: scale(1);
  opacity: 1;
  filter: none;
  z-index: 3;
}

/* immediate neighbors: slightly smaller & faded */
.project-image-card.is-left,
.project-image-card.is-right {
  transform: scale(0.8);
  opacity: 0.9;
  filter: grayscale(0.08);
  z-index: 2;
}

/* further slides: smaller & more faded */
.project-image-card.is-far {
  transform: scale(0.76);
  opacity: 0.55;
  filter: grayscale(0.3);
  z-index: 1;
}

/* "Next" button */
.project-next {
  align-self: flex-end;
  margin-top: 1rem;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.project-not-found {
  padding: 3rem;
}

@media (max-width: 900px) {
  .project-main {
    padding: 1.5rem;
  }

  .project-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-info {
    order: 1;
  }

  .project-gallery-wrapper {
    order: 2;
  }
}

/* Fullscreen Viewer */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease;
}

.fullscreen-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
}

.fullscreen-close {
  position: absolute;
  top: 32px;
  right: 40px;
  font-size: 42px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.fullscreen-close:hover {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.project-header-row {
  display: flex;
  justify-content: space-between; /* push title left, type right */
  align-items: baseline; /* keep typography aligned nicely */
  margin-bottom: 0.5rem; /* slight spacing before the divider */
}
</style>
