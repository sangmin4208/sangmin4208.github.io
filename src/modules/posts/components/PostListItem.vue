<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import { Post } from '../types'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})
const description = computed(() => {
  return props.post.body.slice(0, 20).toString() + '...'
})
</script>

<template>
  <div class="item">
    <router-link :to="{ name: 'PostDetails', params: { id: props.post.id } }">
      <div class="card">
        <div
          class="thumb"
          style="
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg);
          "
        ></div>
        <article>
          <h1>{{ props.post.title }}</h1>
          <p>
            {{ description }}
          </p>
          <span>{{ props.post.author }}</span>
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
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  // sets up hover state
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }

  article {
    padding: 20px;
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h1 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }

  p {
    flex: 1;
    line-height: 1.4;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 2em 0 0 0;
  }

  .thumb {
    padding-bottom: 60%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
