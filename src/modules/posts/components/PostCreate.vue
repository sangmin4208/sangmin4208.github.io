<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import usePosts from '../composables/usePosts'
import { IMAGE_TYPE, Post, UploadFile } from '../types'
import getTags from '../../../composables/getTags'
import useStorage from '@/composables/useStorage'
import TheMarkdown from '../../../components/TheMarkdown.vue'
import TheImageContainer from './TheImageContainer.vue'
import TheUploadArea from './TheUploadArea.vue'

const post = reactive<Post>({
  author: '',
  title: '',
  desc: '',
  body: '',
  series: '',
  type: 'article',
  tags: [],
  thumnailPath: '',
  thumnailURL: '',
  files: [],
})
const initPost = () => {
  post.author = 'nacho'
  post.title = ''
  post.body = ''
  post.desc = ''
  post.series = ''
  post.type = 'article'
  post.tags = []
  post.thumnailPath = ''
  post.thumnailURL = ''
  post.files = []
}
const showPreview = ref<boolean>(false)
const thumnailInput = ref<HTMLInputElement | null>(null)
const { url, filePath, uploadImage, deleteImage } = useStorage('thumnail')
const { addDoc } = usePosts()
const { tags: existTags } = await getTags()
const handleCreate = async () => {
  await addDoc(post)
  initPost()
  if (thumnailInput.value) {
    thumnailInput.value.value = ''
  }
}

onBeforeUnmount(() => {
  if (post.thumnailPath) {
    deleteImage(post.thumnailPath)
  }
  if (post.files) {
    post.files.forEach((file) => {
      deleteImage(file.filePath)
    })
  }
})

const handleInputTag = (e: KeyboardEvent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!e.target) return
  const target = e.target as HTMLInputElement
  if (post.tags) {
    const temp = new Set<string>([...post.tags, target.value])
    post.tags = Array.from(temp)
  } else {
    post.tags = [target.value]
  }
  target.value = ''
}

const handleClickTag = (tag: string) => {
  tag = tag.toLowerCase()
  if (post.tags) {
    const temp = new Set<string>([...post.tags, tag])
    post.tags = Array.from(temp)
  } else {
    post.tags = [tag]
  }
}
const handleDeleteTag = (targetTag: string) => {
  post.tags = post.tags?.filter((tag) => !(tag === targetTag))
}

const handleThumNailUpload = async (e: Event) => {
  if (!e.target) return

  const target = e.target as HTMLInputElement
  let selected = target.files ? target.files[0] : null
  if (selected && IMAGE_TYPE.includes(selected?.type)) {
    if (post.thumnailPath) {
      await deleteImage(post.thumnailPath)
      post.thumnailPath = ''
      post.thumnailURL = ''
    }
    await uploadImage(selected)
    post.thumnailPath = filePath.value
    post.thumnailURL = url.value
  } else {
    if (post.thumnailPath) {
      await deleteImage(post.thumnailPath)
      post.thumnailPath = ''
      post.thumnailURL = ''
    }
  }
}
const handleImageUpload = (file: UploadFile) => {
  post.files?.push(file)
  post.body += `\n <div style="display:flex; justify-content: center">
<img src="${file.url}" alt="content-image" style="width:500px;"/>
</div>`
}
const handleImageDelete = async (targetFile: UploadFile) => {
  if (!post.files) return
  await deleteImage(targetFile.filePath)
  post.body = post.body.replaceAll(
    `<div style="display:flex; justify-content: center">
<img src="${targetFile.url}" alt="content-image" style="width:500px;"/>
</div>`,
    ''
  )
  post.files = post.files.filter(
    (file) => !(file.filePath === targetFile.filePath)
  )
}
</script>
<template>
  <button class="btn btn-preview" @click.prevent="showPreview = !showPreview">
    preview
  </button>
  <div>
    <img
      class="thumnail-image"
      v-if="post.thumnailURL"
      :src="post.thumnailURL"
    />
  </div>
  <div v-if="!showPreview">
    <form @submit.prevent="handleCreate">
      <input
        class="input-title"
        type="text"
        v-model="post.title"
        placeholder="Title..."
      />
      <textarea v-model="post.desc" placeholder="Description..."></textarea>
      <textarea
        class="input-body"
        v-model="post.body"
        placeholder="Body..."
      ></textarea>
      <input
        @change.prevent="handleThumNailUpload"
        type="file"
        ref="thumnailInput"
      />

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
        placeholder="Input tag"
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
      <TheImageContainer
        @delete="handleImageDelete"
        :images="post.files!"
      ></TheImageContainer>
      <TheUploadArea @upload="handleImageUpload" />
      <button class="btn btn-submit">Post 생성</button>
    </form>
  </div>
  <div v-else class="mt-1">
    <PostListItem :post="post"></PostListItem>
    <div class="preview-conatiner">
      <TheMarkdown :source="post.body"></TheMarkdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.thumnail-image {
  width: 150px;
}
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
  input::placeholder {
    font-weight: bold;
  }
  .input-title {
    border-bottom: 1px solid gray;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .input-body {
    height: 30vh;
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
