<template>
  <PageWrapper header-is-white :style="joraStyle">
    <main class="content">
      <p ref="typeTarget" class="text typewriter-js"></p>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import joraWelcomeImage from '@/assets/jora-welcome.png'
import PageWrapper from '@/components/PageWrapper.vue'

const { t } = useI18n()

const joraStyle = {
  backgroundImage: `url(${joraWelcomeImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}

const fullText = t('welcome')
const typeTarget = ref<HTMLElement | null>(null)

onMounted(() => {
  let index = 0
  const speed = 35 // typing speed in ms

  const type = () => {
    if (typeTarget.value && index < fullText.length) {
      typeTarget.value.textContent += fullText.charAt(index)
      index++
      setTimeout(type, speed)
    }
  }

  type()
})
</script>

<style scoped>
.content,
.footer {
  position: relative;
  z-index: 1;
}

.content {
  color: white;
  flex: 1;
  display: flex;
  max-width: 80%;
}

.text {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.4;
  font-family: 'Courier New', monospace;
  white-space: pre-line;
}

.text.typewriter-js {
  white-space: pre-wrap;
  position: relative;
}

.text.typewriter-js::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 1.2em;
  background: white;
  display: inline-block;
  animation: blink 0.7s infinite;
  margin-left: 3px;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .content {
    max-width: 100%;
  }

  .text {
    font-size: 1.4rem;
  }
}
</style>
