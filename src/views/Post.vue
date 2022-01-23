<script lang="ts" setup>
import { onErrorCaptured } from 'vue'
onErrorCaptured((err) => {
  console.log('Post:', err)
})
</script>
<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
