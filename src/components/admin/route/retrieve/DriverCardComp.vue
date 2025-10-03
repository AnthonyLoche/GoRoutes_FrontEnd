<!-- eslint-disable no-unused-vars -->
<script setup>
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue'
import Phone from 'vue-material-design-icons/Phone.vue'
import Email from 'vue-material-design-icons/Email.vue'
import CalendarClock from 'vue-material-design-icons/CalendarClock.vue'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'

const props = defineProps({
  driver: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="driver-card" v-if="driver">
    <div class="card-header">
      <div style="display: flex; gap: .5rem;">
        <AccountCircle :size="28" />
        <h3>Motorista</h3>
      </div>
    </div>
    <div class="driver-content">
      <div class="driver-image" v-if="driver.user?.picture?.file">
        <img :src="driver.user.picture.file" :alt="driver.user.name" />
      </div>
      <div class="driver-info">
        <h4>{{ driver.user?.name }}</h4>
        <div class="driver-contacts">
          <div class="contact-item" v-if="driver.user?.email">
            <Email :size="18" />
            <span>{{ driver.user.email }}</span>
          </div>
          <div class="contact-item" v-if="driver.user?.telephone">
            <Phone :size="18" />
            <span>{{ driver.user.telephone }}</span>
          </div>
          <div class="contact-item" v-if="driver.cnh">
            <CalendarClock :size="18" />
            <span>CNH: {{ driver.cnh }}</span>
          </div>
        </div>
        <div class="driver-address" v-if="driver.adresses?.length">
          <MapMarker :size="18" />
          <span>{{ driver.adresses[0].street }}, {{ driver.adresses[0].number }} - {{ driver.adresses[0].city }}/{{ driver.adresses[0].state }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.driver-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.driver-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
  color: var(--primary);
  justify-content: space-between;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.driver-content {
  display: flex;
  gap: 1.5rem;
}

.driver-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  border: 4px solid #f1f5f9;
}

.driver-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.driver-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.driver-info h4 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
}

.driver-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 8px;
  color: #64748b;
  font-size: 0.9rem;
}

.contact-item svg {
  color: var(--accent);
}

.driver-address {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.8rem;
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.05), rgba(2, 40, 64, 0.05));
  border-radius: 8px;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.5;
}

.driver-address svg {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .driver-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .driver-image {
    width: 150px;
    height: 150px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.driver-card {
  animation: fadeInUp 0.6s ease-out backwards;
}
</style>