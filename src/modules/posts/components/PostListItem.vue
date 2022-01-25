<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import { Post } from '../types'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})
</script>

<template>
  <div class="item">
    <router-link :to="{ name: 'PostDetails', params: { id: props.post.id } }">
      <div class="card">
        <div
          class="thumb"
          :style="{ backgroundImage: `url(${props.post.thumnailURL})` }"
        ></div>
        <article class="content">
          <h1 class="content-title">{{ props.post.title }}</h1>
          <p class="content-desc">
            {{ post.desc }}
          </p>
          <div class="content-bottom-row">
            <span class="content-author">{{ props.post.author }}</span>
            <div v-if="props.post.tags" class="content-tags">
              <span
                v-for="tag in props.post.tags"
                :key="tag"
                class="content-tag"
                >{{ tag }}</span
              >
            </div>
          </div>
        </article>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.card {
  padding: 20px;
  background: var(--dark-bg-item-color);
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  border-radius: 7px;
  // sets up hover state
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;
  opacity: 0.8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  min-height: 200px;
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }

  .content {
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content-title {
    font-size: 20px;
    margin: 0;
  }

  .content-desc {
    opacity: 0.8;
    flex: 1;
    line-height: 1.4;
  }
  .content-bottom-row {
    color: #999;
    display: flex;
    justify-content: space-between;
    margin: 2em 0 0 0;
    text-transform: uppercase;
  }
  .content-author {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.05em;
  }
  .content-tags {
    opacity: 0.6;
    color: orange;
    display: flex;
    gap: 10px;
  }
  .content-tag::before {
    content: '#';
    margin: 2px;
  }

  .thumb {
    border-radius: inherit;
    width: 200px;
    background-size: cover;
    background-position: center center;
  }
}
</style>
