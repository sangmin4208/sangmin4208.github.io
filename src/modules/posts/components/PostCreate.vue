<script lang="ts" setup>
import { reactive, ref } from 'vue'
import usePosts from '../composables/usePosts'
import { Post } from '../types'
import Markdown from 'vue3-markdown-it'
import getTags from '../../../composables/getTags'

const post = reactive<Post>({
  author: 'nacho',
  title: 'Awesome CSS',
  body: '# test body',
  series: 'hello',
  type: 'series',
  tags: [],
})
const showPreview = ref<boolean>(false)

const { addDoc } = usePosts()
const { tags: existTags } = await getTags()
const handleCreate = async () => {
  await addDoc(post)
}

const handleInputTag = (event) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const temp = new Set<string>([...post.tags!, event.target.value])
  event.target.value = ''
  post.tags = Array.from(temp)
}

const handleClickTag = (tag: string) => {
  const temp = new Set<string>([...post.tags, tag])
  post.tags = Array.from(temp)
}
const handleDeleteTag = (targetTag: string) => {
  post.tags = post.tags.filter((tag) => !(tag === targetTag))
}
</script>
<template>
  <button class="btn btn-preview" @click.prevent="showPreview = !showPreview">
    preview
  </button>
  <div v-if="!showPreview">
    <form @submit.prevent="handleCreate">
      <input class="input-title" type="text" v-model="post.title" />
      <textarea class="input-body" v-model="post.body"></textarea>
      <div class="tag-container exist-tag-container">
        <h1>Existing Tags :</h1>
        <span
          v-for="tag in existTags"
          :key="tag"
          class="tag"
          @click.prevent="handleClickTag(tag)"
          >{{ tag }}</span
        >
      </div>
      <input
        @keydown.prevent.enter="handleInputTag"
        class="input-tag"
        type="text"
      />
      <div class="tag-container input-tag-container">
        <h1>Tags :</h1>
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="tag"
          @click.prevent="handleDeleteTag(tag)"
          >{{ tag }}</span
        >
      </div>
      <button class="btn btn-submit">Post 생성</button>
    </form>
  </div>
  <div v-else class="preview-container">
    <Markdown :source="post.body" />
  </div>
</template>

<style scoped lang="scss">
.preview-container {
  border: 1px solid white;
  margin: auto auto;
  min-height: 10vh;
  margin-top: 20px;
  padding: 15px;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  input,
  textarea {
    background-color: inherit;
    outline: 0;
    padding: 0.5rem 0.3rem;
  }
  input {
    border: 0;
    outline: 0;
    border-bottom: 1px solid gray;
  }
  .input-title {
    border-bottom: 1px solid gray;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .input-body {
    height: 30vh;
  }
  .tag {
    text-transform: uppercase;
    padding: 2px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.5s;
    background-color: var(--primary);
  }

  .tag:hover {
    transform: scale(1.1);
  }
  .tag-container {
    align-items: center;
    display: flex;
    margin-top: 15px;
    gap: 10px;
  }
  .exist-tag-container {
    border: 1px solid gray;
    padding: 20px 15px;

    .tag {
      font-weight: bold;
      background-color: gray;
    }
    .tag:hover {
      background-color: var(--primary);
    }
  }
}

.btn-submit {
  margin-left: auto;
  background-color: var(--secondary);
}
</style>
