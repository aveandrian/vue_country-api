<template>
  <main>
    <div class="main-header">
      <div class="search-wrapper">
        <FontAwesomeIcon :icon="faMagnifyingGlass" class="search-icon" />
        <input
          class="search-input"
          type="text"
          placeholder="Search for a country..."
          v-model="searchValue"
          @focus="handleOnFocus"
          @blur="handleFocusOut"
        />

        <div v-if="searchResults" class="search-results-wrapper">
          <template v-for="(countryName, i) in searchResults">
            <router-link
              v-if="countryName.code"
              class="search-result-item"
              :key="countryName.code"
              :to="countryName.code"
              >{{ countryName.name }}
            </router-link>
            <p v-else :key="i" class="search-result-item">
              {{ countryName.name }}
            </p>
          </template>
        </div>
        <ClipLoader
          v-if="isLoading"
          :loading="isLoading"
          class="spinner"
          :color="'grey'"
        />
      </div>
      <div
        :class="`filter-wrapper ${isRegionFilterOpened ? 'opened' : ''}`"
        @click="toggleRegionFilter"
      >
        <p class="filter-input" v-if="regionFilter">
          {{ regionFilter }}
        </p>
        <p class="filter-input" v-else>
          {{ 'Filter by Region' }}
        </p>

        <FontAwesomeIcon :icon="faChevronDown" class="arrow-icon" />
        <div v-if="isRegionFilterOpened" class="filter-region">
          <p
            v-if="regionFilter"
            class="filter-item reset"
            @click="resetRegionFilter"
          >
            Reset <FontAwesomeIcon :icon="faClose" />
          </p>
          <p
            v-for="(item, i) of regionsData"
            :key="i"
            class="filter-item"
            @click="handleRegionSelect"
            :value="item"
          >
            {{ regionsData[i] }}
          </p>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="loader-wrapper" v-if="!countriesData || isCountriesLoading">
        <p>Countries loading....</p>
        <ClipLoader
          :loading="!countriesData || isCountriesLoading"
          :color="'grey'"
        />
      </div>
      <CountryCard
        v-else
        v-for="(countryData, i) in countriesData"
        :key="i"
        :countryData="countryData"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CountryCard from '@/components/CountryCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronDown,
  faClose,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { debounce } from 'lodash'
import { Country } from '@/types/country'

const regionsData = {
  africa: 'Africa',
  america: 'America',
  asia: 'Asia',
  europe: 'Europe',
  oceania: 'Oceania'
}

// type regionsDataKey = keyof typeof regionsData

onMounted(async () => {
  let res = await fetch('https://restcountries.com/v3.1/all')
  let data = await res.json()
  countriesData.value = data
})

const countriesData = ref<Country[]>()
const isCountriesLoading = ref<boolean>(false)
const searchValue = ref<string>('')
const searchResults = ref<Array<any> | null>(null)

const isRegionFilterOpened = ref<boolean>(false)
const regionFilter = ref<string | null>(null)
const isLoading = ref<boolean>(false)

console.log(regionFilter)

function toggleRegionFilter(): void {
  isRegionFilterOpened.value = !isRegionFilterOpened.value
}

function resetRegionFilter(): void {
  regionFilter.value = null
}

watch(searchValue, () => {
  if (searchValue.value) {
    isLoading.value = true
    getSearchResults()
  } else searchResults.value = null
})

const getSearchResults = debounce(() => {
  fetch(`https://restcountries.com/v3.1/name/${searchValue.value}`)
    .then((res) => {
      if (res.ok) return res.json()
      else {
        searchResults.value = ['Nothing found']
        return
      }
    })
    .then((data) => {
      isLoading.value = false
      searchResults.value = data.map((country: Country) => ({
        name: country.name.common,
        code: country.cca3
      }))
    })
    .catch(() => {
      return (searchResults.value = [{ name: 'Nothing found', code: '' }])
    })
}, 500)

function handleOnFocus(): void {
  if (searchValue.value != '')
    fetch(`https://restcountries.com/v3.1/name/${searchValue.value}`)
      .then((res) => {
        if (res.ok) return res.json()
        else {
          searchResults.value = ['Nothing found']
          return
        }
      })
      .then((data) => {
        searchResults.value = data.map((country: Country) => ({
          name: country.name.common,
          code: country.cca3
        }))
      })
      .catch(() => {
        return (searchResults.value = [{ name: 'Nothing found', code: null }])
      })
}

function handleFocusOut() {
  debounce(() => {
    searchResults.value = null
  }, 200)
  // return () => clearTimeout(getData)
}

watch(regionFilter, () => {
  if (regionFilter.value) {
    isCountriesLoading.value = true
    fetch(`https://restcountries.com/v3.1/region/${regionFilter.value}`)
      .then((data) => data.json())
      .then((body) => {
        isCountriesLoading.value = false
        countriesData.value = body
      })
  } else {
    isCountriesLoading.value = true
    fetch('https://restcountries.com/v3.1/all')
      .then((data) => data.json())
      .then((body) => {
        isCountriesLoading.value = false
        countriesData.value = body
      })
  }
})

function handleRegionSelect(e: Event): void {
  const target = e.target as HTMLElement
  regionFilter.value = target.getAttribute('value')
}
</script>

<style>
.main-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  column-gap: 5vw;
  row-gap: 10vh;
}

.loader-wrapper {
  grid-column: 1 / span 4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: var(--elements);
  gap: 1.25rem;
  height: 3.125rem;
  padding-inline: 1.25rem;
  min-width: 30vw;
  border-radius: 0.313rem;
  box-shadow: 0 0 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  position: relative;
}

.spinner {
  align-self: center;
  justify-self: center;
}

.search-results-wrapper {
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: fit-content;
  max-height: 20vh;
  overflow-y: scroll;
  left: 0;
  bottom: 0;
  transform: translateY(102%);
  background: var(--elements, #fff);
  box-shadow: 0 0 0.313rem 0.063rem rgba(0, 0, 0, 0.07);
  border-radius: 0.313rem;
}

.search-results-wrapper::-webkit-scrollbar {
  width: 0.625rem;
}

.search-results-wrapper::-webkit-scrollbar-track {
  background: var(--elements);
}

.search-results-wrapper::-webkit-scrollbar-thumb {
  background: var(--color-text);
}

.search-result-item {
  padding: 0.625rem;
  border-bottom: 0.063rem solid rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: var(--text);
}

.search-result-item:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
}

.search-input {
  width: 80%;
  border: none;
  background: var(--elements);
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--text);
}

.filter-wrapper {
  height: 3.125rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 15vw;
  width: fit-content;
  border-radius: 0.313rem;
  padding-inline: 1.25rem;
  box-shadow: 0 0 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  background: var(--elements);
}

.arrow-icon {
  color: var(--color-text);
  transition: 0.3s ease-in-out;
}

.filter-wrapper.opened .arrow-icon {
  transform: rotateZ(-180deg);
}

.filter-region {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(102%);
  background: var(--elements);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 0.313rem;
  box-shadow: 0 0 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: scrolldown 0.3s;
}

.filter-wrapper:hover {
  cursor: pointer;
}

.filter-item {
  padding: 0.625rem 1.25rem;
}

.filter-item.reset {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-item:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
}

@keyframes scrolldown {
  0% {
    bottom: 0;
    height: 0;
    transform: scaleY(0) translateY(165%);
  }
  100% {
    height: fit-content;
    transform: scaleY(1) translateY(102%);
  }
}

@media screen and (max-width: 72rem) {
  .main-header {
    flex-direction: column;
    gap: 3vh;
    align-items: start;
  }

  .search-wrapper {
    width: 100%;
  }

  .filter-wrapper {
    width: 60%;
    gap: 0.625rem;
  }

  .main-content {
    padding-inline: 10vw;
    grid-template-columns: 1fr;
  }
}
</style>
