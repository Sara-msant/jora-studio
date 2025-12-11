<template>
  <div class="jora" :style="joraStyle">
    <Header is-white />

    <main class="content">
      <p ref="typeTarget" class="text typewriter-js"></p>
    </main>

    <footer class="footer">
      <a :href="instagramHref" class="social">
        <v-icon>mdi-instagram</v-icon>
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import joraWelcomeImage from '@/assets/jora-welcome.png'
import Header from '@/components/Header.vue'

const { t } = useI18n()

const joraStyle = {
  backgroundImage: `url(${joraWelcomeImage})`,
}

const fullText = t('welcome')
const typeTarget = ref<HTMLElement | null>(null)
const instagramHref =
  'https://www.instagram.com/jorastudio_architecture?igsh=MTZ3YWRsaXFhdGk2cg%3D%3D&utm_source=qr'

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
  align-items: center;
  max-width: 70%;
}

.text {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.4;
  font-family: 'Courier New', monospace;
  /* if you put \n in the translation and want hard line breaks: */
  white-space: pre-line;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem; /* adjust icon size */
  margin-left: 0.75rem; /* spacing between icons */
  text-decoration: none;
  opacity: 0.85;
  transition: 0.2s ease;
}

.social:hover {
  opacity: 1;
}

.text.typewriter-js {
  white-space: pre-wrap; /* allows normal wrapping */
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
  .jora {
    padding: 1.5rem;
  }

  .content {
    max-width: 100%;
  }

  .text {
    font-size: 1.4rem;
  }
}
</style>
