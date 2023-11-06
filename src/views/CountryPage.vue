<template>
  <main>
    <div class="link-back" @click="() => router.go(-1)">
      <FontAwesomeIcon :icon="faArrowLeftLong" />Back
    </div>
    <div class="country-section" v-if="countryData">
      <img class="flag" :src="countryData.flags.svg" alt="Country flag" />
      <div class="country-info">
        <h1 class="country-info-name">{{ countryData.name.common }}</h1>
        <div class="country-info-stats">
          <div class="country-info-stats-1">
            <div class="country-stat-item">
              <p class="country-stat-item-title">Native name:</p>
              <p class="country-stat-item-value">{{ nativeName }}</p>
            </div>
            <div class="country-stat-item">
              <p class="country-stat-item-title">Population:</p>
              <p class="country-stat-item-value">
                {{ countryData.population.toLocaleString() }}
              </p>
            </div>
            <div class="country-stat-item">
              <p class="country-stat-item-title">Region:</p>
              <p class="country-stat-item-value">{{ countryData.region }}</p>
            </div>
            <div class="country-stat-item">
              <p class="country-stat-item-title">Sub Region:</p>
              <p class="country-stat-item-value">{{ countryData.subregion }}</p>
            </div>

            <div v-if="countryData.capital" class="country-stat-item">
              <p class="country-stat-item-title">Capital:</p>
              <p class="country-stat-item-value">
                {{ countryData.capital[0] }}
              </p>
            </div>
          </div>
          <div class="country-info-stats-2">
            <div class="country-stat-item">
              <p class="country-stat-item-title">Top Level Domain:</p>
              <p class="country-stat-item-value">{{ countryData.tld[0] }}</p>
            </div>
            <div class="country-stat-item">
              <p class="country-stat-item-title">Currencies:</p>
              <p class="country-stat-item-value">{{ currencies }}</p>
            </div>
            <div class="country-stat-item">
              <p class="country-stat-item-title">Languages:</p>
              <p class="country-stat-item-value">{{ languages }}</p>
            </div>
          </div>
        </div>
        <CountryBorders
          v-if="countryData.borders"
          :borders="countryData.borders"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, watch, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import CountryBorders from '@/components/CountryBorders.vue'
import { Country, Currencies, Languages } from '@/types/country'

const router = useRouter()
const route = useRoute()
const countryData = ref<Country>()

const nativeName = ref<string>()
const currencies = ref<string>()
const languages = ref<string>()

function getCountryInfo(): void {
  console.log(route.params)
  fetch(`https://restcountries.com/v3.1/alpha/${route.params.countryName}`)
    .then((res) => res.json())
    .then((data: Country[]) => {
      countryData.value = data[0]
      const nativeNamesValues = Object.values(data[0].name.nativeName)[0]
      nativeName.value = Object.values(nativeNamesValues)[0]
      currencies.value = getCurrencies(data[0].currencies)
      languages.value = getLanguages(data[0].languages)
    })
}

onMounted(() => {
  getCountryInfo()
})

watch(
  () => route.params,
  () => {
    getCountryInfo()
  },
  // fetch the data when the view is created and the data is
  // already being observed
  { immediate: true }
)

function getCurrencies(currencies: Currencies) {
  let arr = []
  for (let key in currencies) {
    arr.push(currencies[key].name)
  }
  return arr.join(', ')
}

function getLanguages(languages: Languages) {
  let arr = []
  for (let key in languages) {
    arr.push(languages[key])
  }
  return arr.join(', ')
}
</script>

<style>
.link-back {
  margin-block: 10vh;
  padding: 0.625rem 2.5rem;
  background: var(--elements);
  width: fit-content;
  box-shadow: 0 0.125rem 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border: 0.063rem solid transparent;
  border-radius: 0.313rem;
}

.link-back:hover {
  cursor: pointer;
  border: 0.063rem solid rgba(0, 0, 0, 0.2);
}

.country-section {
  display: flex;
  align-items: start;
  gap: 5vw;
}

.flag {
  width: 50%;
}

.country-info {
  width: 50%;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
}

.country-info-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 2vh;
}

.country-info-stats {
  display: grid;
  gap: 0.625rem;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 5vh;
}

.country-info-stats-1,
.country-info-stats-2 {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.country-stat-item-title {
  min-width: fit-content;
}

@media screen and (max-width: 72rem) {
  .link-back {
    margin-block: 5vh;
  }

  .flag,
  .country-info {
    width: 100%;
  }

  .country-info {
    margin-top: 0;
  }

  .country-section {
    flex-direction: column;
    padding-bottom: 1.25rem;
  }

  .country-info-stats {
    grid-template-columns: 1fr;
    gap: 5vh;
  }
}
</style>
