<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const isDark = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <router-link to="/" class="title">Where in the world?</router-link>
    <div class="attribution">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
      >. Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
    </div>
    <button class="theme-switcher" @click="toggleDark()">
      <FontAwesomeIcon :icon="isDark ? faMoonRegular : faMoonSolid" />
      <h1 class="theme-switcher-title">Dark Mode</h1>
    </button>
  </header>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,600;6..12,800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}

[data-theme='dark'] {
  --color-bg: hsl(207, 26%, 17%);
  --elements: hsl(209, 23%, 22%);
  --color-text: hsl(0, 0%, 100%);
  --color-input: hsl(209, 23%, 22%);
}

[data-theme='light'] {
  --color-bg: hsl(0, 0%, 98%);
  --elements: hsl(0, 0%, 100%);
  --text: hsl(200, 15%, 8%);
  --color-input: hsl(0, 0%, 52%);
}

body {
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  background: var(--color-bg);
}

p,
h1,
input {
  color: var(--color-text);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 5vw;
  padding-block: 2vh;
  background-color: var(--elements);
  box-shadow: 0 0.125rem 0.313rem 0 rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.8rem;
  font-weight: 800;
  box-shadow: none !important;
}

.title:hover {
  cursor: pointer;
}

.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: none;
  border: none;
}

.theme-switcher-title {
  font-size: 1.3rem;
  font-weight: 600;
}

.theme-switcher:hover {
  cursor: pointer;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 5vh;
}

main {
  height: 100%;
  padding-inline: 5vw;
  padding-bottom: 5vh;
}

@media screen and (max-width: 72rem) {
  .attribution {
    display: none;
  }
  p,
  input {
    font-size: 0.8rem;
  }

  h1,
  .title {
    font-size: 1rem;
  }

  .theme-switcher-title {
    font-size: 0.8rem;
  }
}
</style>
