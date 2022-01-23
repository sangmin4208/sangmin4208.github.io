<template>
  <AppLayout />
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
  background-color: white;
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
