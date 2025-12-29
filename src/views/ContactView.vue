<template>
  <PageWrapper>
    <main class="contact-main">
      <section class="contact-content">
        <!-- LEFT: Image -->
        <div class="contact-image">
          <img src="@/assets/contact-us/contact-us.png" alt="Contact Us" />
        </div>

        <!-- RIGHT: Form and Info -->
        <div class="contact-right">
          <!-- Top Row: Header + Info Card -->
          <div class="contact-top-row">
            <!-- Header Section -->
            <div class="contact-header">
              <h1 class="contact-title">Contact Us</h1>
              <p class="contact-description">
                We'd love to hear from you. Whether you're planning a new project or exploring ideas, our team will guide you through each step — from concept to completion.
              </p>
            </div>

            <!-- Contact Info Card -->
            <aside class="contact-info">
              <h2 class="info-title">Info</h2>
              <div class="info-block">
                <p class="info-label">Phone</p>
                <p class="info-value">+351 919 998 681<br />+351 914 371 356</p>
              </div>
              <div class="info-block">
                <p class="info-label">Email</p>
                <p class="info-value">hello@jorastudio.com<br />Algarve, Portugal</p>
              </div>
            </aside>
          </div>

          <!-- Contact Form -->
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="surname" class="form-label">Surname</label>
                <input
                  id="surname"
                  v-model="form.surname"
                  type="text"
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="phone" class="form-label">Phone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="location" class="form-label">Project Location</label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  class="form-input"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="type" class="form-label">Type Of Project</label>
                <select id="type" v-model="form.type" class="form-input">
                  <option value="">Select a type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-group full-width">
              <label for="description" class="form-label">Brief Project Description</label>
              <textarea
                id="description"
                v-model="form.description"
                class="form-textarea"
                placeholder=""
                rows="5"
              ></textarea>
            </div>

            <p class="form-disclaimer">
              By submitting your data, you are giving us permission to use the information to assist you and contact you. Don't worry, we can reassure the entirety of your data is secure.
            </p>

            <button type="submit" class="submit-btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageWrapper from '@/components/PageWrapper.vue'

const form = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  location: '',
  type: '',
  description: '',
})

const handleSubmit = () => {
  // TODO: Implement form submission logic
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
.contact-main {
  flex: 1;
  padding: 4rem 3rem;
  min-height: calc(100vh - 120px);
}

.contact-content {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* LEFT: Image */
.contact-image {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  height: fit-content;
}

.contact-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* RIGHT: Form and content */
.contact-right {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Top Row: Header + Info Card side by side */
.contact-top-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 2rem;
  align-items: start;
}

.contact-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #323542;
}

.contact-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #323542;
  max-width: 50ch;
  font-family: 'Geist Mono', monospace;
}

/* Contact Info Card */
.contact-info {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
}

.info-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #323542;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'Geist Mono', monospace;
}

.info-block {
  margin-bottom: 1.25rem;
}

.info-block:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #323542;
  margin-bottom: 0.4rem;
  font-family: 'Geist Mono', monospace;
}

.info-value {
  font-size: 0.85rem;
  color: #323542;
  line-height: 1.6;
  font-family: 'Geist Mono', monospace;
}


/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #323542;
  margin-bottom: 0.5rem;
  font-family: 'Geist Mono', monospace;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: 'Geist Mono', monospace;
  background: #fff;
  color: #323542;
  transition: border-color 0.25s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #323542;
}

.form-textarea {
  resize: vertical;
}

.form-disclaimer {
  font-size: 0.75rem;
  color: #999;
  line-height: 1.5;
  font-family: 'Geist Mono', monospace;
  margin: 1rem 0;
}

.submit-btn {
  padding: 1rem 2rem;
  background: #323542;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  font-family: 'Geist Mono', monospace;
  transition: background-color 0.25s ease;
}

.submit-btn:hover {
  background: #1a1d24;
}

@media (max-width: 768px) {
  .contact-main {
    padding: 2rem 1.5rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
