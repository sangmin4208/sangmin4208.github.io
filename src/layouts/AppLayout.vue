<template>
  <Nav />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Nav from '@/components/TheNav.vue'
</script>

<style scoped>
main {
  width: var(--md-container-width);
  margin: 0 auto;
  padding: 20px;
}
</style>
