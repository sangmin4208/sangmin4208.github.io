<script lang="ts" setup>
import getPosts from '@/modules/posts/composables/getPosts'
import PostItem from './PostListItem.vue'
const { posts } = await getPosts()
</script>
<template>
  <div class="band" v-if="posts">
    <div v-for="post in posts" :key="post.id">
      <PostItem :post="post" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.band {
  margin: 0 auto;
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media (min-width: 30em) {
    grid-template-columns: 1fr;
  }
}
</style>
