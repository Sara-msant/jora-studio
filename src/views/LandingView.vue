<template>
  <div class="landing" @click="goToWelcome">
    <div class="landing-logo-block">
      <div class="landing-wordmark">
        <div class="landing-jora-wrapper">
          <span class="landing-part">JO</span>
          <span class="landing-part landing-ra">RA</span>
          <span class="landing-dot"></span>
        </div>
      </div>

      <div class="landing-subtitle">
        <div class="landing-studio">Studio</div>
        <div class="landing-tagline">
          Architecture & Interiors
          <img src="@/assets/landing/long-down-arrow.svg" alt="arrow" class="landing-arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToWelcome = () => {
  router.push({ name: 'welcome' })
}
</script>

<style scoped>
.landing {
  min-height: 100vh;
  width: 100%;
  background-color: #262a36;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 4vw 6vw;
  box-sizing: border-box;
  cursor: pointer;
}

/* Container for logo + subtitles */
.landing-logo-block {
  text-align: left;
}

/* "JORA" wordmark */
.landing-wordmark {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.landing-jora-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0;
}

/* big "JORA" text */
.landing-part {
  font-family: 'Bauhaus 93', sans-serif;
  font-weight: 400;
  font-size: clamp(5rem, 20vw, 15rem);
  /* responsive, big on desktop */
  line-height: 0.7;
  color: #f4f5f7;
}

.landing-ra {
  margin-left: -0.075em;
}

/* blue dot */
.landing-dot {
  width: clamp(1rem, 5vw, 3rem);
  height: clamp(1rem, 5vw, 3rem);
  border-radius: 50%;
  background-color: #64b5ff;
  /* light blue */
  flex-shrink: 0;
  margin-left: 0.3em;
}

/* Subtitle text */
.landing-subtitle {
  margin-top: 1.5rem;
  font-family: 'Alumni Sans', sans-serif;
}

.landing-studio {
  font-size: 6rem;
  line-height: 4rem;
  color: #f4f5f7;
}

.landing-tagline {
  margin-top: 0.25rem;
  font-size: 2rem;
  line-height: 1.2rem;
  letter-spacing: 0em;
  text-transform: capitalize;
  color: #c3c6d0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.landing-tagline i {
  font-size: 1.5rem;
}

.landing-arrow {
  height: 2.5rem;
  width: auto;
  transform: rotate(-90deg);
  filter: brightness(0) invert(1);
  display: none;
}

/* Small-screen tweak */
@media (max-width: 768px) {
  .landing {
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .landing-logo-block {
    text-align: left;
  }

  .landing-wordmark {
    justify-content: flex-start;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .landing-jora-wrapper {
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0;
  }

  .landing-part {
    font-size: clamp(6rem, 50vw, 12rem);
  }

  .landing-arrow {
    display: inline;
  }
}
</style>
