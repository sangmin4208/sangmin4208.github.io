<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import Markdown from 'vue3-markdown-it'
import 'highlight.js/styles/androidstudio.css'

const props = defineProps({
  source: {
    type: String,
    reuired: true,
  },
})
const parsingMark = computed(() => {
  if (!props.source) return
  const regex = /`(?=[^`{2}])([a-zA-Z\\[\].,\s]+)`(?=[^`{2}])/gim
  const parse = props.source.replaceAll(regex, '==$1== ')
  return parse
})
</script>

<template>
  <Markdown
    class="markdown"
    :source="parsingMark"
    :html="true"
    :breaks="true"
    :typographer="true"
    :highlight="{ inline: true }"
  />
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
  mark {
    background-color: RGBA(60, 64, 65, 0.5);
    color: #c35252;
    padding: 0px 7px 3px 7px;
    border-radius: 5px;
    font-size: 0.9em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: 1px;
    margin-right: -0.3ch;
  }
}
</style>
