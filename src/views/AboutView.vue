<template>
  <PageWrapper>
    <div class="about-grid">
      <!-- CENTER: note -->
      <section class="note">
        <div class="note-inner">
          <h1 class="note-title">{{ $t('about.title') }}</h1>
          <div class="note-rule" />

          <div class="note-body">
            <p
              v-for="(paragraph, index) in $t('about.description').split('\n\n')"
              :key="index"
              v-html="parseBold(paragraph)"
            ></p>
          </div>
        </div>
      </section>

      <!-- RIGHT: profiles -->
      <aside class="profiles">
        <a
          href="https://www.linkedin.com/in/rachelcambier"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-link"
        >
          <article class="profile">
            <div class="profile-photo">
              <img :src="images.rachel" alt="Rachel" draggable="false" />
            </div>
            <div class="profile-meta">
              <div class="profile-name">{{ $t('about.rachel.name') }}</div>
              <div class="profile-role">{{ $t('about.rachel.role') }}</div>
              <div class="profile-loc">{{ $t('about.rachel.location') }}</div>
            </div>
          </article>
        </a>

        <article class="profile">
          <div class="profile-photo">
            <img :src="images.joaquim" alt="Joaquim" draggable="false" />
          </div>
          <div class="profile-meta">
            <div class="profile-name">{{ $t('about.joaquim.name') }}</div>
            <div class="profile-role">{{ $t('about.joaquim.role') }}</div>
            <div class="profile-loc">{{ $t('about.joaquim.location') }}</div>
          </div>
        </article>
      </aside>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'

const images = {
  rachel: new URL('@/assets/about/rachel.png', import.meta.url).href,
  joaquim: new URL('@/assets/about/joaquim.png', import.meta.url).href,
}

const parseBold = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<style scoped>
.about-main {
  min-height: calc(100vh - var(--header-h) - 4rem);
  padding: 3.25rem 2rem 2rem;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  overflow-x: hidden;
}

.about-grid {
  flex: 1;
  height: 100%;
  min-height: 0;
  width: 100%;

  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 2.25rem;
  align-items: start;
}

/* ---------- Note ---------- */
.note {
  display: flex;
  justify-content: center;
}

.note-inner {
  width: 100%;
  max-width: 620px;
  min-width: 500px;
  box-sizing: border-box;
}

.note-title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.note-rule {
  margin-top: 1.25rem;
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.28);
}

.note-body {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.78);
  font-family: 'Geist Mono', monospace;
}

.note-body p {
  margin: 0 0 1.15rem 0;
}

/* ---------- Profiles ---------- */
.profiles {
  display: grid;
  gap: 2.4rem;
  justify-items: start;
  padding-top: 5.5rem;
}

.profile {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  align-items: center;
}

.profile-link {
  text-decoration: none;
  color: inherit;
  display: contents;
}

.profile-photo {
  width: 160px;
  height: 210px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  background: #fff;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-meta {
  min-width: 170px;
}

.profile-name {
  font-weight: 700;
  font-size: 0.98rem;
  margin-bottom: 0.25rem;
}

.profile-role,
.profile-loc {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.35;
}

/* ---------- Responsive ---------- */
@media (max-width: 1250px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.25rem;
    width: 100%;
  }

  .about-main {
    padding: 2rem 1.5rem;
  }

  .note-inner {
    max-width: 100%;
    min-width: 0;
  }
  .collage {
    display: none;
  }

  .collage-frame--large {
    width: 86vw;
    height: 48vw;
    max-height: 320px;
  }

  .collage-frame--mid {
    top: 240px;
    left: 10vw;
    width: 80vw;
    height: 50vw;
  }

  .collage-frame--small {
    top: 395px;
    left: 6vw;
    width: 54vw;
    height: 36vw;
  }

  .profiles {
    padding-top: 0;
    grid-template-columns: 1fr 1fr;
    min-width: 0;
    gap: 0rem;
    justify-items: center;
  }

  .profile {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile-photo {
    width: 140px;
    height: 190px;
  }
}

@media (max-width: 650px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;
  }
}
</style>
