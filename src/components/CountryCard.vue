<template>
  <div className="country-card" @click="handleClick">
    <img
      className="country-flag-img"
      :src="props.countryData.flags.png"
      alt="Country flag"
    />
    <div className="country-description">
      <h1 className="country-name">{{ props.countryData.name.common }}</h1>

      <div className="country-stats">
        <div className="country-stat-item">
          <p className="country-stat-item-title">Population:</p>
          <p className="country-stat-item-value">
            {{ props.countryData.population.toLocaleString() }}
          </p>
        </div>
        <div className="country-stat-item">
          <p className="country-stat-item-title">Region:</p>
          <p className="country-stat-item-value">
            {{ props.countryData.region }}
          </p>
        </div>
        <div className="country-stat-item">
          <p className="country-stat-item-title">Capital:</p>
          <p
            className="country-stat-item-value"
            v-if="props.countryData.capital"
          >
            {{ props.countryData.capital[0] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Country } from '@/types/country'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  countryData: Country
}>()

function handleClick() {
  router.push(props.countryData.cca3)
}
</script>

<style>
.country-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-bottom: 1.25rem;
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  background: var(--elements);
  transition: 0.3s;
}

.country-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.country-flag-img {
  width: 100%;
  height: 11.25rem;
  object-fit: cover;
}

.country-description {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.country-name {
  font-weight: 800;
  font-size: 1.2rem;
}

.country-stat-item {
  display: flex;
  align-items: first baseline;
  gap: 0.313rem;
}

.country-stat-item-title {
  font-weight: 800;
}
</style>
