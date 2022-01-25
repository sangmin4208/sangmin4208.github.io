<script lang="ts" setup>
import { defineProps } from 'vue'
import Markdown from 'vue3-markdown-it'
import 'highlight.js/styles/androidstudio.css'

defineProps({
  source: {
    type: String,
    reuired: true,
  },
})
</script>

<template>
  <Markdown class="markdown" :source="source" />
</template>

<style scoped lang="scss">
::v-deep {
  // @for $i from 1 through 6 {
  //   h#{$i} {
  //     font-size: 3.2rem - ($i * 0.2rem);
  //   }
  // }
  code {
    padding: 1.3em;
    border-radius: 0.2rem;
  }
}
</style>
