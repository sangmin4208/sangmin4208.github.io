<script lang="ts" setup>
import { onErrorCaptured } from 'vue'
onErrorCaptured((err) => {
  console.log('Post:', err)
})
</script>
<template>
  <router-view />
</template>
