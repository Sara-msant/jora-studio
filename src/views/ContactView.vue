<template>
  <PageWrapper>
    <section class="contact-content">
      <!-- LEFT: Image + Info Card -->
      <div class="contact-left">
        <div class="contact-image">
          <img v-no-right-click src="@/assets/contact-us/contact-us.jpeg" alt="Contact Us" />
        </div>

        <!-- Contact Info Card -->
        <aside class="contact-info">
          <h2 class="info-title">{{ t('contact.infoTitle') }}</h2>
          <div class="info-block">
            <p class="info-label">{{ t('contact.phone') }}</p>
            <p class="info-value">+351 919 588 681<br />+351 914 371 196</p>
          </div>
          <div class="info-block">
            <p class="info-label">{{ t('contact.email') }}</p>
            <p class="info-value">hello@jora-studio.com<br />Algarve, Portugal</p>
          </div>
        </aside>
      </div>

      <!-- RIGHT: Header + Form -->
      <div class="contact-right">
        <!-- Header Section -->
        <div class="contact-header">
          <h1 class="contact-title">{{ t('contact.title') }}</h1>
          <p class="contact-description">
            {{ t('contact.description') }}
          </p>
        </div>
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">{{ t('contact.name') }}</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ 'input-error': fieldErrors.name }"
                placeholder=""
              />
              <p v-if="fieldErrors.name" class="field-error">{{ fieldErrors.name }}</p>
            </div>
            <div class="form-group">
              <label for="surname" class="form-label">{{ t('contact.surname') }}</label>
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
              <label for="email" class="form-label">{{ t('contact.email') }}</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ 'input-error': fieldErrors.email }"
                placeholder=""
              />
              <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</p>
            </div>
            <div class="form-group">
              <label for="phone" class="form-label">{{ t('contact.phone') }}</label>
              <input id="phone" v-model="form.phone" type="tel" class="form-input" placeholder="" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="location" class="form-label">{{ t('contact.projectLocation') }}</label>
              <input
                id="location"
                v-model="form.location"
                type="text"
                class="form-input"
                :class="{ 'input-error': fieldErrors.location }"
                placeholder=""
              />
              <p v-if="fieldErrors.location" class="field-error">{{ fieldErrors.location }}</p>
            </div>
            <div class="form-group">
              <label for="type" class="form-label">{{ t('contact.projectType') }}</label>
              <select
                id="type"
                v-model="form.type"
                class="form-input"
                :class="{ 'input-error': fieldErrors.type }"
              >
                <option value="" disabled>{{ t('contact.selectType') }}</option>
                <option value="residential">{{ t('contact.types.residential') }}</option>
                <option value="partnerships">{{ t('contact.types.partnerships') }}</option>
                <option value="commercial">{{ t('contact.types.commercial') }}</option>
                <option value="other">{{ t('contact.types.other') }}</option>
              </select>
              <p v-if="fieldErrors.type" class="field-error">{{ fieldErrors.type }}</p>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="description" class="form-label">{{ t('contact.briefDescription') }}</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form-textarea"
              :class="{ 'input-error': fieldErrors.description }"
              placeholder=""
              rows="5"
            ></textarea>
            <p v-if="fieldErrors.description" class="field-error">
              {{ fieldErrors.description }}
            </p>
          </div>

          <p class="form-disclaimer">
            {{ t('contact.disclaimer') }}
          </p>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? t('contact.sending') : t('contact.submit') }}
          </button>
          <p v-if="status === 'ok'" class="form-status success">
            {{ t('contact.successMessage') }}
          </p>
          <p v-if="status === 'error'" class="form-status error">
            {{ t('contact.errorMessage') }}
          </p>
        </form>
      </div>
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageWrapper from '@/components/PageWrapper.vue'

const { t } = useI18n()

const form = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  location: '',
  type: '',
  description: '',
})

const loading = ref(false)
const status = ref<'idle' | 'ok' | 'error'>('idle')
const fieldErrors = ref({
  name: '',
  email: '',
  location: '',
  type: '',
  description: '',
})

const handleSubmit = async () => {
  status.value = 'idle'
  fieldErrors.value = { name: '', email: '', location: '', type: '', description: '' }

  // Validate fields
  if (!form.value.name) {
    fieldErrors.value.name = t('contact.errors.nameRequired')
  }
  if (!form.value.email) {
    fieldErrors.value.email = t('contact.errors.emailRequired')
  }
  if (!form.value.location) {
    fieldErrors.value.location = t('contact.errors.locationRequired')
  }
  if (!form.value.type) {
    fieldErrors.value.type = t('contact.errors.projectTypeRequired')
  }
  if (!form.value.description) {
    fieldErrors.value.description = t('contact.errors.descriptionRequired')
  }

  // Return if any field is invalid
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.location ||
    !form.value.description ||
    !form.value.type
  ) {
    return
  }

  loading.value = true

  try {
    const res = await fetch('/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) {
      throw new Error('Request failed')
    }

    status.value = 'ok'
    fieldErrors.value = { name: '', email: '', location: '', type: '', description: '' }
    form.value = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
      type: '',
      description: '',
    }
  } catch (error) {
    console.error(error)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* LEFT: Image and Info Card */
.contact-left {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-image {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  height: fit-content;
  max-height: 435px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* RIGHT: Form and content */
.contact-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  gap: 0.5rem;
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

.input-error {
  border-color: #b71c1c !important;
}

.field-error {
  font-size: 0.7rem;
  color: #b71c1c;
  margin-top: 0.3rem;
  font-family: 'Geist Mono', monospace;
}

.form-disclaimer {
  font-size: 0.75rem;
  color: #999;
  line-height: 1;
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

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-status {
  font-size: 0.85rem;
  margin-top: 0.75rem;
  font-family: 'Geist Mono', monospace;
}

.form-status.success {
  color: #2e7d32;
}

.form-status.error {
  color: #b71c1c;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-image {
    display: none;
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
