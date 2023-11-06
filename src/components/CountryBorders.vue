<template>
  <div className="country-borders">
    <p className="country-borders-title">Border Countries:</p>
    <div className="country-borders-container">
      <ClipLoader
        v-if="isLoading"
        className="spinner"
        :color="'grey'"
        :loading="isLoading"
      />
      <router-link
        v-else
        v-for="(border, i) in bordersNames"
        :key="i"
        :to="`${bordersItems[i]}`"
        className="border-item"
      >
        {{ border }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

const props = defineProps<{
  borders: Array<string>
}>()
const isLoading = ref<boolean>(false)
const bordersNames = ref<Array<string>>([])

const bordersItems = computed<Array<string>>(() => props.borders)

async function getBordersInfo(): Promise<void> {
  isLoading.value = true
  bordersNames.value = []
  let array = []
  for (let key in Object.keys(bordersItems.value)) {
    let res = await fetch(
      `https://restcountries.com/v3.1/alpha/${bordersItems.value[key]}`
    )
    let data = await res.json()
    array.push(data[0].name.common)
  }
  bordersNames.value = array
  isLoading.value = false
}

onMounted(() => {
  getBordersInfo()
})

watch(
  bordersItems,
  () => {
    getBordersInfo()
  },
  { immediate: true }
)
</script>

<style>
.country-borders {
  display: flex;
  align-items: start;
  gap: 0.938rem;
}

.country-borders-title {
  font-weight: 800;
  min-width: fit-content;
}

.country-borders-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.938rem;
}

.border-item,
.router-link-active {
  width: fit-content;
  box-shadow: 0 0.125rem 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
  padding: 0.313rem 0.938rem;
  border-radius: 0.313rem;
  border: 0.063rem solid transparent;
  background: var(--elements);
  text-decoration: none !important;
  color: var(--text) !important;
}

.border-item:hover {
  cursor: pointer;
  border: 0.063rem solid rgba(0, 0, 0, 0.2);
}
</style>
