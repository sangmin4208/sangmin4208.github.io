<template>
  <Suspense>
    <template #default>
      <AppLayout />
    </template>
    <template #fallback> ...loading </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
export default defineComponent({
  components: { AppLayout },
})
</script>

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
