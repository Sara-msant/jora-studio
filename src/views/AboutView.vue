<template>
  <PageWrapper>
    <main class="about-main">
      <div class="about-grid">
        <!-- LEFT: collage -->
        <section class="collage">
          <div class="collage-stage">
            <div class="collage-frame collage-frame--large">
              <img :src="images.groupA" alt="Studio portrait" draggable="false" />
            </div>

            <div class="collage-frame collage-frame--mid">
              <img :src="images.groupB" alt="Studio portrait" draggable="false" />
            </div>

            <div class="collage-frame collage-frame--small">
              <img :src="images.groupC" alt="Studio portrait" draggable="false" />
            </div>
          </div>
        </section>

        <!-- CENTER: note -->
        <section class="note">
          <div class="note-inner">
            <h1 class="note-title">Jora Studio.</h1>
            <div class="note-rule" />

            <div class="note-body">
              <p>
                JORA Studio is led by Rachel Cambier and Joaquim Pinheiro Torres, an international
                duo of designers/architects with Belgian and Portuguese roots.
              </p>

              <p>
                Together, they bring over 25 years of combined experience in architecture, interior
                design, and bespoke furniture creation.
              </p>

              <p>
                Their new collaboration merges two distinct design cultures — the refined precision
                of Northern Europe and the natural warmth of the South — resulting in a distinctive
                aesthetic that is both timeless and contemporary.
              </p>

              <p>
                Grounded in architecture and guided by a deep sensitivity to materials, light, and
                proportion, JORA Studio crafts environments that feel effortless yet meticulously
                composed.
              </p>

              <p>
                Their shared philosophy is rooted in quiet luxury: an approach that values
                restraint, authenticity, and craftsmanship over excess.
              </p>

              <p>
                Operating from Algarve, Portugal and working on international projects, JORA Studio
                delivers comprehensive design services that integrate architecture, interiors, and
                custom design into one seamless narrative.
              </p>
            </div>
          </div>
        </section>

        <!-- RIGHT: profiles -->
        <aside class="profiles">
          <article class="profile">
            <div class="profile-photo">
              <img :src="images.rachel" alt="Rachel" draggable="false" />
            </div>
            <div class="profile-meta">
              <div class="profile-name">Rachel</div>
              <div class="profile-role">CEO &amp; Interior Architect</div>
              <div class="profile-loc">Faro, Algarve</div>
            </div>
          </article>

          <article class="profile">
            <div class="profile-photo">
              <img :src="images.joaquim" alt="Joaquim" draggable="false" />
            </div>
            <div class="profile-meta">
              <div class="profile-name">Joaquim</div>
              <div class="profile-role">CEO &amp; Architect</div>
              <div class="profile-loc">Faro, Algarve</div>
            </div>
          </article>
        </aside>
      </div>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'

const images = {
  // replace these with your real imports/urls
  groupA: new URL('@/assets/about/group.png', import.meta.url).href,
  groupB: new URL('@/assets/about/group.png', import.meta.url).href,
  groupC: new URL('@/assets/about/group.png', import.meta.url).href,
  rachel: new URL('@/assets/about/rachel.png', import.meta.url).href,
  joaquim: new URL('@/assets/about/joaquim.png', import.meta.url).href,
}
</script>

<style scoped>
.about-main {
  height: calc(100vh - var(--header-h) - 4rem);
  padding: 3.25rem 2rem 2rem;
  box-sizing: border-box;
  display: flex;
  min-height: 0;
}

.about-grid {
  flex: 1;
  height: 100%;
  min-height: 0;

  display: grid;
  grid-template-columns: minmax(560px, 1.05fr) 1.35fr 0.65fr;
  gap: 2.25rem;
  align-items: start;
}

/* ---------- Collage ---------- */
.collage {
  position: relative;
  min-height: 560px;
  max-width: 640px;
}

.collage-stage {
  position: relative;
  width: 100%;
  height: 100%;

  padding-left: 56px;
  overflow: visible; /* keep shadows */
}

.collage-frame {
  position: absolute;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);

  transform-origin: center center; /* ✅ */
}

.collage-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  transform: none !important;
}

.collage-frame--large {
  top: 40px;
  left: 0;
  width: 480px;
  height: 360px;
}

.collage-frame--mid {
  top: 285px;
  left: 160px;
  width: 460px;
  height: 300px;
  transform: rotate(-4deg);
}

.collage-frame--small {
  top: 415px;
  left: 10px;
  width: 280px;
  height: 200px;
  transform: rotate(-2deg);
}

/* ---------- Note ---------- */
.note {
  display: flex;
  justify-content: center;
}

.note-inner {
  width: 100%;
  max-width: 620px;
  background: #fff36b;
  border-radius: 18px;
  padding: 2.25rem 2.25rem 2rem;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
}

.note-title {
  margin: 0;
  font-size: 1.8rem;
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
  font-size: 0.92rem;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.78);
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
  }

  .collage {
    min-height: 520px;
    padding-left: 32px;
  }

  .profiles {
    padding-top: 0;
    justify-items: start;
  }
}

@media (max-width: 650px) {
  .about-main {
    padding: 1.5rem;
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

  .profile {
    grid-template-columns: 140px 1fr;
  }

  .profile-photo {
    width: 140px;
    height: 190px;
  }
}
</style>
