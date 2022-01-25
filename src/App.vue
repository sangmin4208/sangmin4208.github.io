<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue'
</script>
<template>
  <Suspense>
    <template #default>
      <AppLayout />
    </template>
    <template #fallback> ...loading </template>
  </Suspense>
</template>

<style>
#app {
  color: var(--dark-font-color);
  font-family: 'Noto Sans KR', sans-serif;
  background: var(--dark-bg-color);
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
