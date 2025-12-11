<template>
  <div class="landing" @click="goToWelcome">
    <div class="landing-logo-block">
      <div class="landing-wordmark">
        <span class="landing-jora">JORA</span>
        <span class="landing-dot"></span>
      </div>

      <div class="landing-subtitle">
        <div class="landing-studio">{{ t('landing.studio') }}</div>
        <div class="landing-tagline">{{ t('landing.tagline') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const goToWelcome = () => {
  router.push({ name: 'welcome' });
};
</script>

<style scoped>
.landing {
  min-height: 100vh;
  width: 100%;
  background-color: #262a36;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  align-items: center;
  gap: 1.5rem;
}

/* big "JORA" text */
.landing-jora {
  font-family: 'Bauhaus 93', sans-serif;
  font-weight: 400;
  font-size: clamp(4rem, 16vw, 13rem);
  /* responsive, big on desktop */
  line-height: 1;
  color: #f4f5f7;
}

/* blue dot */
.landing-dot {
  width: clamp(1.5rem, 4vw, 3rem);
  height: clamp(1.5rem, 4vw, 3rem);
  border-radius: 50%;
  background-color: #64b5ff;
  /* light blue */
}

/* Subtitle text */
.landing-subtitle {
  margin-top: 1.5rem;
}

.landing-studio {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1.5rem;
  color: #f4f5f7;
}

.landing-tagline {
  margin-top: 0.25rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c3c6d0;
}

/* Small-screen tweak */
@media (max-width: 768px) {
  .landing {
    justify-content: center;
    padding: 2rem;
  }

  .landing-logo-block {
    text-align: center;
  }

  .landing-wordmark {
    justify-content: center;
  }
}
</style>